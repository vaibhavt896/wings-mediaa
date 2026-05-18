/** Sanity schema — Insight / Blog post. Stub for Phase F. */

export default {
  name: 'insight',
  title: 'Insight',
  type: 'document',
  fields: [
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (R: { required: () => unknown }) => R.required(),
    },
    { name: 'title', type: 'string' },
    { name: 'author', type: 'string' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'readTime', title: 'Read time (minutes)', type: 'number' },
    { name: 'cover', type: 'image' },
    { name: 'summary', type: 'text' },
    { name: 'body', type: 'array', of: [{ type: 'block' }] }, // Portable Text
  ],
};
