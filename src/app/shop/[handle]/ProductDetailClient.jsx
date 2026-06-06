'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

function formatPrice(amount, currencyCode = 'GBP') {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100)
}

export default function ProductDetailClient({ product }) {
  const { addItem, loading } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants?.[0]?.id ?? null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const opts = {}
    product.options?.forEach(opt => {
      opts[opt.id] = opt.values?.[0]?.value
    })
    return opts
  })

  const images = product.images?.length ? product.images : product.thumbnail ? [{ url: product.thumbnail }] : []

  const selectedVariant = product.variants?.find(v => v.id === selectedVariantId) ?? product.variants?.[0]
  const price = selectedVariant?.calculated_price?.calculated_amount ?? selectedVariant?.prices?.[0]?.amount
  const currency = selectedVariant?.prices?.[0]?.currency_code || 'gbp'

  const handleOptionChange = (optionId, value) => {
    const newOpts = { ...selectedOptions, [optionId]: value }
    setSelectedOptions(newOpts)
    const match = product.variants?.find(v =>
      v.options?.every(o => newOpts[o.option_id] === o.value)
    )
    if (match) setSelectedVariantId(match.id)
  }

  const handleAdd = async () => {
    if (!selectedVariantId) return
    await addItem(selectedVariantId, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 md:py-20">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-white/30 mb-10">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-white/60">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Images */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="relative bg-zinc-900 border border-white/[0.08] overflow-hidden" style={{ aspectRatio: '1/1' }}>
            {images[activeImage]?.url ? (
              <Image
                src={images[activeImage].url}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 text-white/10">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                <p className="text-white/20 text-xs tracking-wide">No image available</p>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-16 h-16 relative border-2 transition-colors overflow-hidden ${
                    activeImage === i ? 'border-red-500' : 'border-white/[0.08] hover:border-white/30'
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          {product.collection?.title && (
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-red-500 mb-3">
              {product.collection.title}
            </p>
          )}

          <h1
            className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-3 leading-none"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {product.title}
          </h1>

          {product.subtitle && (
            <p className="text-white/50 text-sm mb-4">{product.subtitle}</p>
          )}

          <div className="line-h my-5" />

          {/* Price */}
          <p className="text-3xl font-bold text-white mb-6">
            {price != null ? formatPrice(price, currency) : 'See options'}
          </p>

          {/* Variants / Options */}
          {product.options?.map(option => (
            <div key={option.id} className="mb-5">
              <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/60 mb-3">
                {option.title}
              </p>
              <div className="flex flex-wrap gap-2">
                {option.values?.map(val => (
                  <button
                    key={val.id}
                    onClick={() => handleOptionChange(option.id, val.value)}
                    className={`px-4 py-2 text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                      selectedOptions[option.id] === val.value
                        ? 'bg-red-600 text-white border border-red-600'
                        : 'border border-white/20 text-white/60 hover:text-white hover:border-white/50'
                    }`}
                  >
                    {val.value}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/60 mb-3">Quantity</p>
            <div className="flex items-center border border-white/[0.15] w-fit">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors text-lg"
              >−</button>
              <span className="w-12 text-center text-sm font-medium text-white">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors text-lg"
              >+</button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleAdd}
            disabled={loading || !selectedVariantId}
            className={`w-full py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-200 mb-3 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
          >
            {added ? '✓ Added to Cart' : loading ? 'Adding…' : 'Add to Cart'}
          </button>

          <Link
            href="/shop"
            className="flex items-center justify-center w-full py-3.5 border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors"
          >
            ← Back to Shop
          </Link>

          <div className="line-h my-6" />

          {/* Description */}
          {product.description && (
            <div>
              <h3
                className="text-sm font-bold tracking-[0.14em] uppercase text-white/60 mb-3"
                style={{ fontFamily: 'var(--font-oswald)' }}
              >
                Description
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {product.tags.map(tag => (
                <span key={tag.id} className="px-3 py-1 text-[10px] tracking-widest uppercase bg-white/[0.04] border border-white/[0.08] text-white/40">
                  {tag.value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
