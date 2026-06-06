'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { sdk } from '@/lib/medusa'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const cartId = typeof window !== 'undefined' ? localStorage.getItem('medusa_cart_id') : null

  const fetchCart = useCallback(async (id) => {
    try {
      const { cart } = await sdk.store.cart.retrieve(id)
      setCart(cart)
    } catch {
      localStorage.removeItem('medusa_cart_id')
      setCart(null)
    }
  }, [])

  useEffect(() => {
    if (cartId) fetchCart(cartId)
  }, [cartId, fetchCart])

  const getOrCreateCart = async () => {
    const stored = localStorage.getItem('medusa_cart_id')
    if (stored) {
      await fetchCart(stored)
      return stored
    }
    const { cart: newCart } = await sdk.store.cart.create({})
    localStorage.setItem('medusa_cart_id', newCart.id)
    setCart(newCart)
    return newCart.id
  }

  const addItem = async (variantId, quantity = 1) => {
    setLoading(true)
    try {
      const id = await getOrCreateCart()
      const { cart: updated } = await sdk.store.cart.createLineItem(id, {
        variant_id: variantId,
        quantity,
      })
      setCart(updated)
      setOpen(true)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (lineItemId) => {
    if (!cart) return
    setLoading(true)
    try {
      const { cart: updated } = await sdk.store.cart.deleteLineItem(cart.id, lineItemId)
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  const updateItem = async (lineItemId, quantity) => {
    if (!cart) return
    setLoading(true)
    try {
      const { cart: updated } = await sdk.store.cart.updateLineItem(cart.id, lineItemId, { quantity })
      setCart(updated)
    } finally {
      setLoading(false)
    }
  }

  const itemCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{ cart, open, setOpen, loading, addItem, removeItem, updateItem, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
