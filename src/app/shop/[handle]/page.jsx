import { sdk } from '@/lib/medusa'
import { notFound } from 'next/navigation'
import SiteNav from '@/components/home/SiteNav'
import SiteFooter from '@/components/home/SiteFooter'
import ProductDetailClient from './ProductDetailClient'

async function getProduct(handle) {
  try {
    const { products } = await sdk.store.product.list({
      handle,
      fields: 'id,title,subtitle,description,handle,thumbnail,images,collection,tags,variants,variants.calculated_price,variants.prices,variants.options,options',
    })
    return products?.[0] ?? null
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const product = await getProduct(params.handle)
  if (!product) return { title: 'Product Not Found | Tooth & Nail Studio' }
  return {
    title: `${product.title} | Tooth & Nail Studio`,
    description: product.subtitle || product.description || '',
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.handle)
  if (!product) notFound()

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[#020202]">
        <ProductDetailClient product={product} />
      </main>
      <SiteFooter />
    </>
  )
}
