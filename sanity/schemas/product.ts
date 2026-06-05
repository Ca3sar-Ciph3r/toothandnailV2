import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'images.0' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle} AUD` : 'No price set',
        media,
      }
    },
  },
  fields: [
    defineField({ name: 'name',        title: 'Product Name',  type: 'string',  validation: r => r.required() }),
    defineField({ name: 'slug',        title: 'Slug',          type: 'slug',    options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'price',       title: 'Price (AUD)',   type: 'number',  validation: r => r.required().min(0) }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Jewellery',  value: 'jewellery'  },
          { title: 'Aftercare', value: 'aftercare' },
          { title: 'Gift Cards', value: 'gift-cards' },
          { title: 'Merchandise', value: 'merchandise' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      description: 'First image is used as the main product photo.',
    }),
    defineField({ name: 'description', title: 'Description',  type: 'text',    rows: 4 }),
    defineField({ name: 'inStock',     title: 'In Stock',      type: 'boolean', initialValue: true }),
    defineField({ name: 'featured',    title: 'Feature on Homepage', type: 'boolean', initialValue: false }),
  ],
})
