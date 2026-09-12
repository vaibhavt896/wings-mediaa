/** Body block — count-up metrics row. */
export default {
  name: 'metricsRowBlock',
  title: 'Metrics row',
  type: 'object',
  fields: [
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'number', validation: (R: { required: () => unknown }) => R.required() },
            { name: 'prefix', type: 'string' },
            { name: 'suffix', type: 'string' },
            { name: 'decimals', type: 'number' },
            { name: 'eyebrow', type: 'string', validation: (R: { required: () => unknown }) => R.required() },
            { name: 'label', type: 'string', validation: (R: { required: () => unknown }) => R.required() },
          ],
        },
      ],
      validation: (R: { min: (n: number) => { max: (n: number) => unknown } }) => R.min(2).max(4),
    },
  ],
};
