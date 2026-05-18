/** Body block — full-bleed poster (image or short loop). */
export default {
  name: 'posterBlock',
  title: 'Poster',
  type: 'object',
  fields: [
    { name: 'image', title: 'Still image', type: 'image', options: { hotspot: true } },
    { name: 'videoSrc', title: 'Video URL (overrides image if set)', type: 'url' },
    { name: 'caption', title: 'Caption (mono overlay)', type: 'string' },
    {
      name: 'aspect',
      title: 'Aspect ratio',
      type: 'string',
      options: { list: ['16:9', '21:9', '4:3', '9:16', '1:1'] },
    },
    { name: 'accent', title: 'Accent hex (gradient fallback)', type: 'string' },
    {
      name: 'bg',
      title: 'Section background',
      type: 'string',
      options: { list: ['ink', 'bone'] },
    },
  ],
  preview: { select: { title: 'caption', media: 'image' } },
};
