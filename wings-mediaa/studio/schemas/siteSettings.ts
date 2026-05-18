/** Sanity schema — Site settings singleton (nav links, footer, social, contact). */

export default {
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    { name: 'siteName', type: 'string' },
    { name: 'tagline', type: 'string' },
    { name: 'contactEmail', type: 'string' },
    { name: 'whatsapp', type: 'string' },
    { name: 'addressLine', type: 'string' },
    { name: 'bookingUrl', title: 'Calendly / Cal.com URL', type: 'url' },
    {
      name: 'social',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'navLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'footerListenLine',
      title: 'Footer "now listening to" line',
      type: 'string',
    },
  ],
};
