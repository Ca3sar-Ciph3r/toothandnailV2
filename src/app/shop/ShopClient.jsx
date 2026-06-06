'use client'
import { useState, useMemo } from 'react'
import ProductCard from '@/components/shop/ProductCard'

export default function ShopClient({ products, collections }) {
  const [activeCollection, setActiveCollection] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  const filtered = useMemo(() => {
    let list = activeCollection === 'all'
      ? products
      : products.filter(p => p.collection?.id === activeCollection)

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => {
        const aPrice = a.variants?.[0]?.prices?.[0]?.amount ?? 0
        const bPrice = b.variants?.[0]?.prices?.[0]?.amount ?? 0
        return aPrice - bPrice
      })
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => {
        const aPrice = a.variants?.[0]?.prices?.[0]?.amount ?? 0
        const bPrice = b.variants?.[0]?.prices?.[0]?.amount ?? 0
        return bPrice - aPrice
      })
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    }

    return list
  }, [products, activeCollection, sortBy])

  return (
    <section className="max-w-[1600px] mx-auto px-6 md:px-10 py-12 md:py-16">
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-6 border-b border-white/[0.06]">
        {/* Collection filters */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          <button
            onClick={() => setActiveCollection('all')}
            className={`text-[10px] font-bold tracking-[0.16em] uppercase px-4 py-2 transition-all duration-200 ${
              activeCollection === 'all'
                ? 'bg-red-600 text-white'
                : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
            }`}
          >
            All
          </button>
          {collections.map(col => (
            <button
              key={col.id}
              onClick={() => setActiveCollection(col.id)}
              className={`text-[10px] font-bold tracking-[0.16em] uppercase px-4 py-2 transition-all duration-200 ${
                activeCollection === col.id
                  ? 'bg-red-600 text-white'
                  : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-transparent border border-white/20 text-white/60 text-[11px] tracking-wide uppercase px-4 py-2 focus:outline-none focus:border-white/40 cursor-pointer"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>

      {/* Count */}
      <p className="text-[11px] text-white/30 tracking-[0.12em] uppercase mb-8">
        {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-white/30 text-sm tracking-wide mb-6">No products found.</p>
          <p className="text-white/20 text-xs tracking-wide max-w-sm mx-auto">
            Products are managed via the Medusa admin panel. Add products there to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  )
}
