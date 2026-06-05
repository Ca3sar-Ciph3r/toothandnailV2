import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    defineField({ name: 'name',  title: 'Name',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'role',  title: 'Role',  type: 'string', description: 'e.g. Tattoo Artist · Piercer' }),
    defineField({ name: 'bio',   title: 'Bio',   type: 'text', rows: 4 }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
