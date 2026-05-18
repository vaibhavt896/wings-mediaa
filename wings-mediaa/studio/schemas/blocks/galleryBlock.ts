/** Body block — horizontal gallery of images. */
export default {
  name: 'galleryBlock',
  title: 'Gallery',
  type: 'object',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'src', type: 'image', options: { hotspot: true } },
            { name: 'alt', type: 'string', validation: (R: { required: () => unknown }) => R.required() },
            { name: 'accent', title: 'Accent hex (fallback)', type: 'string' },
            { name: 'caption', type: 'string' },
          ],
        },
      ],
      validation: (R: { min: (n: number) => unknown }) => R.min(2),
    },
    { name: 'bg', title: 'Section background', type: 'string', options: { list: ['ink', 'bone'] } },
  ],
  preview: {
    select: { firstImage: 'images.0.src', count: 'images.length' },
    prepare: ({ firstImage, count }: { firstImage: unknown; count: number }) => ({
      title: `Gallery — ${count} images`,
      media: firstImage,
    }),
  },
};
