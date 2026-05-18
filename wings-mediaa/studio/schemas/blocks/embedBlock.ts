/** Body block — video embed (file or YouTube/Vimeo iframe). */
export default {
  name: 'embedBlock',
  title: 'Embed',
  type: 'object',
  fields: [
    { name: 'src', title: 'Source URL (video file or YouTube/Vimeo)', type: 'url' },
    { name: 'poster', title: 'Poster image (for video file)', type: 'image' },
    {
      name: 'aspect',
      title: 'Aspect',
      type: 'string',
      options: { list: ['16:9', '21:9', '4:3', '9:16'] },
    },
  ],
};
