import { redirect } from 'next/navigation';

/**
 * /work — tab currently disabled per request. Redirect to /services.
 */
export default function WorkIndexPage() {
  redirect('/services');
}
