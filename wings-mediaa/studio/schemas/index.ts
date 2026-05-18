/**
 * Sanity schemas — index export.
 * Plug this into `sanity.config.ts` -> schema.types when the Studio is wired up.
 */

import caseSchema from './case';
import service from './service';
import homepage from './homepage';
import siteSettings from './siteSettings';
import insight from './insight';
import { blockTypes } from './blocks';

export const schemaTypes = [
  // Documents
  caseSchema,
  service,
  homepage,
  siteSettings,
  insight,
  // Reusable body-block objects referenced by case.sections
  ...blockTypes,
];
