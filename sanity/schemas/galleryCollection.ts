import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryCollection',
  title: 'Gallery Collection',
  type: 'document',
  // Artists see a clear title + photo count in the document list
  preview: {
    select: { artistName: 'artist.name', category: 'category', photos: 'photos' },
    prepare({ artistName, category, photos }) {
      const labels: Record<string, string> = {
        tattoos:    'Tattoos',
        piercings:  'Piercings',
        'tooth-gems': 'Tooth Gems',
      }
      return {
        title:    `${artistName ?? 'Unknown'} — ${labels[category] ?? category ?? 'Uncategorised'}`,
        subtitle: `${Array.isArray(photos) ? photos.length : 0} photos`,
      }
    },
  },
  fields: [
    defineField({
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: r => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Tattoos',    value: 'tattoos'    },
          { title: 'Piercings',  value: 'piercings'  },
          { title: 'Tooth Gems', value: 'tooth-gems' },
        ],
        layout: 'radio',
      },
      validation: r => r.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      description: 'Drag & drop multiple photos at once to bulk upload.',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Brief description for accessibility.' }),
          ],
        },
      ],
      options: { layout: 'grid' },
    }),
  ],
})
