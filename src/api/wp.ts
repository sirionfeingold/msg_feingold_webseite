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