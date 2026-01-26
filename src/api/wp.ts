const BASE_URL = import.meta.env.VITE_WP_API_BASE;

export async function loadPage(slug: string) {
  const res = await fetch(`${BASE_URL}/pages?slug=${slug}`);

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status}`);
  }

  const data = await res.json();
  return data.length ? data[0] : null;
}

// function for loading teachers
export async function loadTeachers() {
  const res = await fetch(
    `${BASE_URL}/teacher?_embed&per_page=100`
  )
  return await res.json()
}

// get teacher images
export function getTeacherImage(t: any): string {
  return (
    t._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url ||
    t._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
  )
}