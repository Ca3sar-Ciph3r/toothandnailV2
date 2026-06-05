import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: 'nj2vr6ry',
  dataset: 'production',
  title: 'Tooth & Nail CMS',

  schema: { types: schemaTypes },

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Tooth & Nail')
          .items([
            S.listItem()
              .title('🖼  Gallery')
              .child(
                S.list().title('Gallery').items([
                  S.documentTypeListItem('galleryCollection').title('Collections'),
                  S.divider(),
                  S.documentTypeListItem('artist').title('Artists'),
                ])
              ),
            S.listItem()
              .title('✍️  Blog Posts')
              .child(S.documentTypeList('blogPost').title('Blog Posts')),
            S.listItem()
              .title('🛍  Shop Products')
              .child(S.documentTypeList('product').title('Products')),
            S.listItem()
              .title('⭐  Testimonials')
              .child(S.documentTypeList('testimonial').title('Testimonials')),
          ]),
    }),
    visionTool(),
    media(),
  ],
})
