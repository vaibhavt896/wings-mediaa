/** Body block — scroll-scrubbed display-l lines that rise as you scroll past. */
export default {
  name: 'scrubBlock',
  title: 'Scroll-scrubbed lines',
  type: 'object',
  fields: [
    {
      name: 'lines',
      title: 'Lines (each rises on scrub)',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (R: { min: (n: number) => unknown }) => R.min(2),
    },
    { name: 'accent', title: 'Accent hex (radial tint behind)', type: 'string' },
  ],
};
