import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Draft',
        media,
      }
    },
  },
  fields: [
    defineField({ name: 'title',       title: 'Title',        type: 'string',   validation: r => r.required() }),
    defineField({ name: 'slug',        title: 'Slug',         type: 'slug',     options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'mainImage',   title: 'Cover Image',  type: 'image',    options: { hotspot: true } }),
    defineField({ name: 'excerpt',     title: 'Excerpt',      type: 'text',     rows: 3, description: 'Short summary shown in blog listings.' }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime', description: 'Leave blank to save as draft.' }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'artist' }],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true }, fields: [
          defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
          defineField({ name: 'caption', type: 'string', title: 'Caption' }),
        ]},
      ],
    }),
  ],
})
