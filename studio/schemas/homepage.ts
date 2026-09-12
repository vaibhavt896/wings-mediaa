/** Sanity schema — Homepage singleton. Mirrors `lib/content/home.ts`. */

export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'lines', title: 'Lines', type: 'array', of: [{ type: 'string' }] },
        { name: 'italicWord', title: 'Italic word', type: 'string' },
        { name: 'sub', title: 'Sub copy', type: 'text' },
      ],
    },
    {
      name: 'proof',
      title: 'Proof bar (client wordmarks)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Use plain text wordmarks; logos handled later.',
    },
    {
      name: 'selectedWork',
      title: 'Selected work',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'case' }] }],
      validation: (R: { min: (n: number) => { max: (n: number) => unknown } }) => R.min(2).max(6),
    },
    {
      name: 'numbers',
      title: 'Numbers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'number' },
            { name: 'prefix', type: 'string' },
            { name: 'suffix', type: 'string' },
            { name: 'eyebrow', type: 'string' },
            { name: 'label', type: 'string' },
          ],
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
      name: 'process',
      title: 'Process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'n', type: 'string' },
            { name: 'label', type: 'string' },
            { name: 'blurb', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'voices',
      title: 'Voices (testimonials)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', type: 'text' },
            { name: 'name', type: 'string' },
            { name: 'role', type: 'string' },
            { name: 'company', type: 'string' },
            { name: 'lime', title: 'Lime variant (reserved — one per case)', type: 'boolean' },
            { name: 'portrait', type: 'image' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      title: 'CTA close',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string' },
        {
          name: 'primary',
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' },
          ],
        },
        {
          name: 'secondary',
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' },
          ],
        },
      ],
    },
  ],
};
