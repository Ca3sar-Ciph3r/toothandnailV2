'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

function formatPrice(amount, currencyCode = 'GBP') {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100)
}

export default function CartDrawer() {
  const { cart, open, setOpen, removeItem, updateItem, loading } = useCart()
  const backdropRef = useRef(null)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const currency = cart?.currency_code || 'gbp'
  const items = cart?.items ?? []
  const subtotal = cart?.subtotal ?? 0

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-[420px] bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08]">
          <h2 className="text-sm font-bold tracking-[0.18em] uppercase" style={{ fontFamily: 'var(--font-oswald)' }}>
            Your Cart {items.length > 0 && <span className="text-red-500 ml-1">({items.length})</span>}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-white/50 hover:text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-14 h-14 text-white/20">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p className="text-white/40 text-sm tracking-wide">Your cart is empty</p>
              <button
                onClick={() => setOpen(false)}
                className="text-[11px] font-bold tracking-[0.15em] uppercase text-red-500 hover:text-red-400 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const thumb = item.thumbnail || item.variant?.product?.thumbnail
              return (
                <div key={item.id} className="flex gap-4 py-4 border-b border-white/[0.06]">
                  {/* Thumbnail */}
                  <div className="w-18 h-18 flex-shrink-0 bg-zinc-900 border border-white/[0.08] overflow-hidden relative" style={{ width: 72, height: 72 }}>
                    {thumb ? (
                      <Image src={thumb} alt={item.title} fill className="object-cover" sizes="72px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white/90 leading-tight truncate">{item.title}</p>
                    {item.variant?.title && item.variant.title !== 'Default Variant' && (
                      <p className="text-[11px] text-white/40 mt-0.5">{item.variant.title}</p>
                    )}
                    <p className="text-[13px] font-bold text-white mt-1">
                      {formatPrice(item.unit_price, currency)}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-white/[0.12]">
                        <button
                          onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
                        >−</button>
                        <span className="w-7 text-center text-[13px] text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="text-[11px] text-white/30 hover:text-red-400 transition-colors tracking-wide uppercase"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/[0.08] space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-white/60">Subtotal</span>
              <span className="text-base font-bold text-white">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="text-[11px] text-white/30 tracking-wide">Shipping & taxes calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full py-3.5 bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold tracking-[0.18em] uppercase transition-colors"
            >
              Checkout
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-full py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
