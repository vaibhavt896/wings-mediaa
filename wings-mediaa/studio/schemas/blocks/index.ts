/** Body-block sub-types referenced by `case.sections`. Re-export to schemaTypes. */
import posterBlock from './posterBlock';
import galleryBlock from './galleryBlock';
import quoteBlock from './quoteBlock';
import metricsRowBlock from './metricsRowBlock';
import scrubBlock from './scrubBlock';
import embedBlock from './embedBlock';
import textBlock from './textBlock';

export const blockTypes = [
  posterBlock,
  galleryBlock,
  quoteBlock,
  metricsRowBlock,
  scrubBlock,
  embedBlock,
  textBlock,
];
