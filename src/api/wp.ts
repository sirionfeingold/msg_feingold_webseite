const BASE_URL = import.meta.env.VITE_WP_API_BASE;

// main function which loads website
export async function loadPage(slug: string) {
  const res = await fetch(`${BASE_URL}/pages?slug=${slug}`);

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status}`);
  }

  const data = await res.json();
  return data.length ? data[0] : null;
}

/**
 * function for teachers
 */
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

// aktuelles get function
import type { AktuellesEvent, WpAktuellesItem } from '../types/aktuelles'

export async function loadAktuelles(): Promise<AktuellesEvent[]> {
  const res = await fetch(`${BASE_URL}/aktuelles?per_page=10`)

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status}`)
  }

  const data: WpAktuellesItem[] = await res.json()

  return data.map(item => ({
    title: item.title.rendered,
    date: item.acf.date,
    description: item.acf.description,
    link: item.acf.link
  }))
}


/**
 * function for get instruments
 */
import type { Instrument, WpInstrumentItem } from '../types/instrument'

// helper function to get images for instruments
function getFeaturedImage(item: WpInstrumentItem): string {
  const media = item._embedded?.['wp:featuredmedia']?.[0]
  return (
    media?.media_details?.sizes?.large?.source_url ||
    media?.source_url ||
    ''
  )
}

export async function loadInstruments(): Promise<Instrument[]> {
  const res = await fetch(`${BASE_URL}/instrument?per_page=100&_embed`)
  if (!res.ok) throw new Error(`WP API error: ${res.status}`)

  const data: WpInstrumentItem[] = await res.json()

  return data.map(item => ({
    slug: item.slug,
    name: item.title.rendered,
    description: item.acf.description,
    image: getFeaturedImage(item)
  }))
}

export async function loadInstrument(slug: string): Promise<Instrument | null> {
  const res = await fetch(
    `${BASE_URL}/instrument?slug=${encodeURIComponent(slug)}&_embed`
  )
  if (!res.ok) throw new Error(`WP API error: ${res.status}`)

  const data: WpInstrumentItem[] = await res.json()
  if (!data.length) return null

  const item = data[0]

  return {
    slug: item.slug,
    name: item.title.rendered,
    description: item.acf.description,
    image: getFeaturedImage(item)
  }
}

// functions for Person --> Künstler (Media.vue)
import type { Person, WpPersonItem } from '../types/person'

export async function loadPersons(): Promise<Person[]> {
  const res = await fetch(`${BASE_URL}/person?per_page=50`)
  if (!res.ok) throw new Error(`WP API error: ${res.status}`)

  const data: WpPersonItem[] = await res.json()

  return data.map(item => ({
    slug: item.slug,
    name: item.title.rendered,
    title: item.acf.title,
    videoId: item.acf.video_id,
    spotifyLink: item.acf.spotify_embed,
    facebook: item.acf.facebook_link,
    instagram: item.acf.instagram_link,
    youtube: item.acf.youtube_link,
    website: item.acf.website_link
  }))
}

// function for loading shop menu
export async function loadShopMenu() {
  const slugs = ['cds', 'instrumente', 'kunst']

  const requests = slugs.map(slug =>
    fetch(`${BASE_URL}/pages?slug=${slug}`)
      .then(res => res.json())
      .then(pages => pages[0])
  )

  const pages = await Promise.all(requests)

  return pages.map(p => ({
  title: p.acf.dropdown_text ?? p.acf.title,
  path: `/shop/${p.slug}`,
  intro: p.acf.intro_text
}))

}

// function for loading products

// helper function which gets the ID of the corresponding category
async function getCategoryIdBySlug(slug: string) {
  const res = await fetch(
    `${BASE_URL}/product_category?slug=${slug}`
  )

  const data = await res.json()

  return data?.[0]?.id
}


// main function for loading the products via ID
export async function loadProductsByCategory(slug: string) {
  const categoryId = await getCategoryIdBySlug(slug)

  if (!categoryId) {
    console.warn('Kategorie nicht gefunden:', slug)
    return []
  }

  const res = await fetch(
    `${BASE_URL}/product?product_category=${categoryId}&_embed`
  )

  const data = await res.json()

  if (!Array.isArray(data)) {
    console.error('Unerwartete API-Antwort:', data)
    return []
  }

  return data.map((p: any) => ({
    title: p.title.rendered,
    price: p.acf.price,
    description: p.acf.description,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url
  }))
}


