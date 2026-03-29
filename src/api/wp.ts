const BASE_URL = import.meta.env.VITE_WP_API_BASE

export type WpPage = {
  slug: string
  title: {
    rendered: string
  }
  acf: Record<string, any>
}

export type ShopMenuItem = {
  title: string
  path: string
  intro: string | undefined
}

export type TeacherItem = {
  id: number
  title: {
    rendered: string
  }
  acf: {
    bio?: string
    website?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      media_details?: {
        sizes?: {
          medium?: { source_url: string }
        }
      }
    }>
  }
}

export type ReviewItem = {
  name: string
  text: string
  stars: number
}

// Edit: Centralize public WP requests so every call validates base URL, status code and JSON parsing.
async function fetchWpJson<T>(path: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error('WP API base URL ist nicht konfiguriert')
  }

  const res = await fetch(`${BASE_URL}${path}`)

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} (${path})`)
  }

  try {
    return (await res.json()) as T
  } catch {
    throw new Error(`Ungueltige WP-API-Antwort fuer ${path}`)
  }
}

// main function which loads website
export async function loadPage(slug: string): Promise<WpPage> {
  // Edit: Encode the slug and fail loudly when a required public page is missing.
  const data = await fetchWpJson<WpPage[]>(
    `/pages?slug=${encodeURIComponent(slug)}`
  )

  if (!Array.isArray(data) || !data.length) {
    throw new Error(`WP-Seite nicht gefunden: ${slug}`)
  }

  return data[0]
}

/**
 * function for teachers
 */
// function for loading teachers
export async function loadTeachers() {
  // Edit: Route teacher requests through the shared fetch helper for consistent public error handling.
  return await fetchWpJson<TeacherItem[]>(`/teacher?_embed&per_page=100`)
}

// get teacher images
export function getTeacherImage(t: TeacherItem): string {
  return (
    t._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url ||
    t._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
  )
}

// aktuelles get function
import type { AktuellesEvent, WpAktuellesItem } from '../types/aktuelles'

export async function loadAktuelles(): Promise<AktuellesEvent[]> {
  const data = await fetchWpJson<WpAktuellesItem[]>(`/aktuelles?per_page=10`)

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
  const data = await fetchWpJson<WpInstrumentItem[]>(
    `/instrument?per_page=100&_embed`
  )

  return data.map(item => ({
    slug: item.slug,
    name: item.title.rendered,
    description: item.acf.description,
    image: getFeaturedImage(item)
  }))
}

export async function loadInstrument(slug: string): Promise<Instrument | null> {
  const data = await fetchWpJson<WpInstrumentItem[]>(
    `/instrument?slug=${encodeURIComponent(slug)}&_embed`
  )
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
  const data = await fetchWpJson<WpPersonItem[]>(`/person?per_page=50`)

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
export async function loadShopMenu(): Promise<ShopMenuItem[]> {
  const slugs = ['cds', 'instrumente', 'kunst']

  // Edit: Keep the dropdown usable even if one WP page is missing or malformed.
  const requests = slugs.map(async slug => {
    try {
      const page = await loadPage(slug)
      return {
        title:
          (page.acf?.dropdown_text as string | undefined) ??
          (page.acf?.title as string | undefined) ??
          page.title.rendered,
        path: `/shop/${page.slug}`,
        intro: page.acf?.intro_text as string | undefined
      }
    } catch (error) {
      console.error(`Shop-Menueeintrag konnte nicht geladen werden: ${slug}`, error)
      return null
    }
  })

  const pages = await Promise.all(requests)

  return pages.filter((page): page is ShopMenuItem => page !== null)
}

// function for loading products

// helper function which gets the ID of the corresponding category
async function getCategoryIdBySlug(slug: string) {
  // Edit: Encode the category slug and validate the public taxonomy response before using it.
  const data = await fetchWpJson<Array<{ id: number }>>(
    `/product_category?slug=${encodeURIComponent(slug)}`
  )

  return data?.[0]?.id
}


// main function for loading the products via ID
export async function loadProductsByCategory(slug: string) {
  const categoryId = await getCategoryIdBySlug(slug)

  if (!categoryId) {
    console.warn('Kategorie nicht gefunden:', slug)
    return []
  }

  const data = await fetchWpJson<any[]>(
    `/product?product_category=${categoryId}&_embed`
  )

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

// function for loading reviews
export async function loadReviews() {
  // Edit: Reviews are public runtime data too, so they need the same status and JSON checks.
  const data = await fetchWpJson<any[]>(`/review?per_page=20`)

  return data
    .filter((t: any) => t.acf?.visible !== false)
    // Edit: Clamp public CMS star values into the supported UI range.
    .map((t: any): ReviewItem => ({
      name: t.title.rendered,
      text: t.acf.text,
      stars: Math.max(0, Math.min(5, Number(t.acf.stars) || 0))
    }))
}
