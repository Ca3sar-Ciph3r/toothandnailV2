import { groq } from 'next-sanity'

export const galleryQuery = groq`
  *[_type == "galleryCollection"
    && artist->slug.current == $artistSlug
    && category == $category
  ][0] {
    photos[] {
      asset->,
      alt,
    }
  }
`

export const allGalleryQuery = groq`
  *[_type == "galleryCollection" && artist->slug.current == $artistSlug] {
    category,
    photos[] { asset->, alt }
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost" && defined(publishedAt)] | order(publishedAt desc) {
    _id, title, slug, excerpt, mainImage, publishedAt,
    author->{ name, slug }
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt, mainImage, publishedAt, body,
    author->{ name, slug, photo }
  }
`

export const productsQuery = groq`
  *[_type == "product"] | order(_createdAt desc) {
    _id, name, slug, price, description, images, category, inStock, featured
  }
`

export const featuredProductsQuery = groq`
  *[_type == "product" && featured == true] | order(_createdAt desc) {
    _id, name, slug, price, images, category, inStock
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(date desc) {
    _id, clientName, quote, rating, artist->{ name }, service, date, featured
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(date desc) {
    _id, clientName, quote, rating, artist->{ name }, service
  }
`
