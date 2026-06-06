'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'

function formatPrice(amount, currencyCode = 'GBP') {
  if (amount == null) return '—'
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100)
}

export default function ProductCard({ product }) {
  const { addItem, loading } = useCart()
  const [added, setAdded] = useState(false)

  const variant = product.variants?.[0]
  const price = variant?.calculated_price?.calculated_amount ?? variant?.prices?.[0]?.amount
  const currency = variant?.prices?.[0]?.currency_code || 'gbp'
  const thumbnail = product.thumbnail

  const handleAdd = async () => {
    if (!variant?.id) return
    await addItem(variant.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const hasMultipleVariants = product.variants?.length > 1

  return (
    <div className="group relative flex flex-col glass-card overflow-hidden transition-all duration-300 hover:border-white/[0.16]">
      {/* Image */}
      <Link href={`/shop/${product.handle}`} className="relative block overflow-hidden bg-zinc-900" style={{ aspectRatio: '4/3' }}>
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-white/10">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        )}

        {/* Category badge */}
        {product.collection?.title && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 backdrop-blur-sm text-[9px] font-bold tracking-[0.16em] uppercase text-white/70 border border-white/10">
            {product.collection.title}
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/shop/${product.handle}`} className="block flex-1">
          <h3
            className="text-[15px] font-bold tracking-[0.06em] uppercase text-white group-hover:text-red-400 transition-colors duration-200 leading-tight mb-1"
            style={{ fontFamily: 'var(--font-oswald)' }}
          >
            {product.title}
          </h3>
          {product.subtitle && (
            <p className="text-[12px] text-white/50 leading-relaxed mb-3 line-clamp-2">{product.subtitle}</p>
          )}
        </Link>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
          <span className="text-base font-bold text-white">
            {price != null ? formatPrice(price, currency) : 'See options'}
          </span>

          {hasMultipleVariants ? (
            <Link
              href={`/shop/${product.handle}`}
              className="text-[10px] font-bold tracking-[0.16em] uppercase px-4 py-2 border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-200"
            >
              Select
            </Link>
          ) : (
            <button
              onClick={handleAdd}
              disabled={loading || !variant?.id}
              className={`text-[10px] font-bold tracking-[0.16em] uppercase px-4 py-2 transition-all duration-200 ${
                added
                  ? 'bg-green-600 text-white border border-green-600'
                  : 'border border-red-600 text-red-500 hover:bg-red-600 hover:text-white'
              }`}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
