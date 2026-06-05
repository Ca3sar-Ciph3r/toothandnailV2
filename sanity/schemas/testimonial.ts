import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  preview: {
    select: { title: 'clientName', subtitle: 'service', featured: 'featured' },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? '⭐ ' : ''}${title ?? 'Unnamed client'}`,
        subtitle: subtitle ?? '',
      }
    },
  },
  fields: [
    defineField({ name: 'clientName', title: 'Client Name',      type: 'string',  validation: r => r.required() }),
    defineField({ name: 'quote',      title: 'Quote',            type: 'text',    rows: 4, validation: r => r.required() }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: r => r.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: '⭐ 1', value: 1 },
          { title: '⭐⭐ 2', value: 2 },
          { title: '⭐⭐⭐ 3', value: 3 },
          { title: '⭐⭐⭐⭐ 4', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5', value: 5 },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          { title: 'Tattoo',    value: 'tattoo'    },
          { title: 'Piercing',  value: 'piercing'  },
          { title: 'Tooth Gem', value: 'tooth-gem' },
        ],
        layout: 'radio',
      },
    }),
    defineField({ name: 'date',     title: 'Date',              type: 'date' }),
    defineField({ name: 'featured', title: 'Show on Homepage',  type: 'boolean', initialValue: false }),
  ],
})
