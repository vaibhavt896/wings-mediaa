/** Body block — text paragraph with optional eyebrow. */
export default {
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  fields: [
    { name: 'eyebrow', title: 'Eyebrow (mono label above the paragraph)', type: 'string' },
    { name: 'body', title: 'Body', type: 'text', validation: (R: { required: () => unknown }) => R.required() },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      options: { list: ['sm', 'lg'] },
      initialValue: 'sm',
    },
    {
      name: 'bg',
      title: 'Section background',
      type: 'string',
      options: { list: ['ink', 'bone'] },
      initialValue: 'ink',
    },
  ],
  preview: {
    select: { eyebrow: 'eyebrow', body: 'body' },
    prepare: ({ eyebrow, body }: { eyebrow?: string; body?: string }) => ({
      title: eyebrow ?? 'Text block',
      subtitle: body?.slice(0, 80) ?? '',
    }),
  },
};
