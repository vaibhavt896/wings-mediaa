/** Sanity schema — Service. */

export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R: { required: () => unknown }) => R.required(),
    },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'word', title: 'Headline word (e.g. "convert.")', type: 'string' },
    { name: 'blurb', title: 'Short blurb', type: 'text' },
    { name: 'order', title: 'Display order', type: 'number' },
    {
      name: 'accentA',
      title: 'Accent A (hex)',
      type: 'string',
    },
    {
      name: 'accentB',
      title: 'Accent B (hex)',
      type: 'string',
    },
    { name: 'demo', title: 'Pinned demo (Rive / video / image)', type: 'file' },
    { name: 'demoPoster', title: 'Demo poster', type: 'image' },
    { name: 'deliverables', title: 'Deliverables list', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'cases',
      title: 'Featured cases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'case' }] }],
    },
  ],
};
