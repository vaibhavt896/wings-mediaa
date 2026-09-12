/** Body block — italic editorial pull-quote. */
export default {
  name: 'quoteBlock',
  title: 'Pull-quote',
  type: 'object',
  fields: [
    { name: 'text', title: 'Quote text', type: 'text', validation: (R: { required: () => unknown }) => R.required() },
    { name: 'name', title: 'Attribution — name', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    {
      name: 'lime',
      title: 'Lime variant (one-of-one per case)',
      type: 'boolean',
      description:
        'Reserved for the single most important testimonial. Renders in the Lime accent. Use at most once per case.',
    },
  ],
  preview: {
    select: { quote: 'text', author: 'name' },
    prepare: ({ quote, author }: { quote: string; author: string }) => ({
      title: `"${quote?.slice(0, 60) ?? ''}…"`,
      subtitle: author,
    }),
  },
};
