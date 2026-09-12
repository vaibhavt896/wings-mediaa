/**
 * Sanity client stub.
 *
 * Phase F intent: write the API surface that downstream consumers (case pages,
 * service pages, homepage, insights) will eventually call. Until Studio is
 * actually deployed, each function re-exports the corresponding hardcoded
 * content from `lib/content/*`. Swapping in real Sanity later is one diff:
 *
 *   1. Run:    npx sanity init  (creates a project + dataset)
 *   2. Install:  npm i @sanity/client groq
 *   3. Set env:  NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN
 *   4. Uncomment the `realClient` section below
 *   5. Replace each "return X" with the GROQ fetch shown in the comment
 *
 * Consumers should import from here once they're ready (`import { allCases } from '@/lib/sanity'`),
 * not from `lib/content/*` directly. That keeps the migration boundary explicit.
 */

import { cases as _cases, getCase as _getCase, nextCase as _nextCase } from './content/cases';
import { services as _services, getService as _getService, nextService as _nextService } from './content/services';
import { home as _home } from './content/home';
import { about as _about } from './content/about';
import { insights as _insights, getInsight as _getInsight, nextInsight as _nextInsight } from './content/insights';

/* ------------------------------------------------------------------------- *
 * Real client wiring — leave commented until Studio is set up.
 * ------------------------------------------------------------------------- */

// import { createClient } from '@sanity/client';
// import groq from 'groq';
//
// const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
// const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
//
// export const sanity = createClient({
//   projectId,
//   dataset,
//   apiVersion: '2026-01-01',
//   useCdn: true,
// });
//
// const ALL_CASES_QUERY = groq`*[_type=="case"] | order(year desc, _createdAt desc){
//   ...,
//   services[]->{slug, title},
//   cover{kind, accent, "image": image.asset->url, "videoSrc": videoSrc, "poster": poster.asset->url},
// }`;
//
// export async function allCases() { return sanity.fetch(ALL_CASES_QUERY); }
// export async function caseBySlug(slug: string) { return sanity.fetch(groq`*[_type=="case" && slug.current==$slug][0]`, { slug }); }
// etc.

/* ------------------------------------------------------------------------- *
 * Stub implementations — return hardcoded content for v1.
 * Same function signatures as the real GROQ-backed versions above.
 * ------------------------------------------------------------------------- */

export async function allCases() {
  return _cases;
}

export async function caseBySlug(slug: string) {
  return _getCase(slug);
}

export async function nextCaseFor(slug: string) {
  return _nextCase(slug);
}

export async function allServices() {
  return _services;
}

export async function serviceBySlug(slug: string) {
  return _getService(slug);
}

export async function nextServiceFor(slug: string) {
  return _nextService(slug);
}

export async function homepageContent() {
  return _home;
}

export async function aboutContent() {
  return _about;
}

export async function allInsights() {
  return _insights;
}

export async function insightBySlug(slug: string) {
  return _getInsight(slug);
}

export async function nextInsightFor(slug: string) {
  return _nextInsight(slug);
}
