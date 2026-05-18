/**
 * Sanity schema — Case study.
 * Shape mirrors `lib/content/cases.ts` 1:1.
 *
 * NOT WIRED YET. This file is written ahead of Studio setup so the future migration is:
 *   1. `npx sanity init` in /studio
 *   2. Drop these schemas in
 *   3. Replace `import { cases } from '@/lib/content/cases'` with `import { cases } from '@/lib/sanity'`
 */

export default {
  name: 'case',
  title: 'Case study',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    { name: 'title', title: 'Title', type: 'string', validation: (R: { required: () => unknown }) => R.required() },
    { name: 'client', title: 'Client', type: 'string' },
    { name: 'year', title: 'Year', type: 'number' },
    {
      name: 'verticals',
      title: 'Verticals',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Brand', value: 'brand' },
              { title: 'D2C', value: 'd2c' },
              { title: 'Performance', value: 'performance' },
              { title: 'Content', value: 'content' },
              { title: 'Tech', value: 'tech' },
            ],
          },
        },
      ],
    },
    {
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    },
    {
      name: 'cover',
      title: 'Cover',
      type: 'object',
      fields: [
        {
          name: 'kind',
          title: 'Kind',
          type: 'string',
          options: { list: ['still', 'video', '3d'] },
        },
        { name: 'image', title: 'Image (kind=still)', type: 'image', options: { hotspot: true } },
        { name: 'videoSrc', title: 'Video URL (kind=video)', type: 'url' },
        { name: 'poster', title: 'Poster image', type: 'image' },
        {
          name: 'accent',
          title: 'Accent hex',
          type: 'string',
          description: 'Used as the transition flood + gradient fallback. e.g. #FF3D2E',
        },
      ],
    },
    { name: 'summary', title: 'Tile summary (mono caption)', type: 'string' },
    { name: 'brief', title: 'Brief (italic editorial paragraph)', type: 'text' },
    {
      name: 'aspect',
      title: 'Tile aspect ratio',
      type: 'string',
      options: { list: ['16:10', '9:16', '4:3', '1:1', '21:9'] },
    },
    { name: 'indexLabel', title: 'Index label (e.g. "CASE · 003")', type: 'string' },
    {
      name: 'metrics',
      title: 'Top metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'number' },
            { name: 'prefix', type: 'string' },
            { name: 'suffix', type: 'string' },
            { name: 'decimals', type: 'number' },
            { name: 'eyebrow', type: 'string' },
            { name: 'label', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'sections',
      title: 'Body sections',
      type: 'array',
      description: 'Variable art direction per case. Mix poster / gallery / quote / metrics / scrub / embed / text blocks.',
      of: [
        { type: 'posterBlock' },
        { type: 'galleryBlock' },
        { type: 'quoteBlock' },
        { type: 'metricsRowBlock' },
        { type: 'scrubBlock' },
        { type: 'embedBlock' },
        { type: 'textBlock' },
      ],
    },
    {
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'role', type: 'string' },
            { name: 'name', type: 'string' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'cover.poster' },
  },
};
