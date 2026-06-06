import { sdk } from '@/lib/medusa'
import SiteNav from '@/components/home/SiteNav'
import SiteFooter from '@/components/home/SiteFooter'
import ShopClient from './ShopClient'

export const metadata = {
  title: 'Shop | Tooth & Nail Studio',
  description: 'Gift cards, aftercare products, and merch from Tooth & Nail Tattoo Studio.',
}

async function getProducts() {
  try {
    const { products } = await sdk.store.product.list({
      limit: 100,
      fields: 'id,title,subtitle,handle,thumbnail,collection,variants,variants.calculated_price,variants.prices',
    })
    return products ?? []
  } catch {
    return []
  }
}

async function getCollections() {
  try {
    const { collections } = await sdk.store.collection.list({ limit: 50 })
    return collections ?? []
  } catch {
    return []
  }
}

export default async function ShopPage() {
  const [products, collections] = await Promise.all([getProducts(), getCollections()])

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#020202]">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden hero-grid border-b border-white/[0.06]">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/10 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-[1600px] mx-auto px-6 md:px-10 relative z-10 text-center">
            <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-red-500 mb-4">Tooth & Nail Studio</p>
            <h1
              className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-4"
              style={{ fontFamily: 'var(--font-oswald)' }}
            >
              Shop Online
            </h1>
            <div className="line-h-red w-24 mx-auto mb-6" />
            <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
              Gift cards, piercing jewellery, aftercare essentials and studio merch — all in one place.
            </p>
          </div>
        </section>

        <ShopClient products={products} collections={collections} />
      </main>
      <SiteFooter />
    </>
  )
}
