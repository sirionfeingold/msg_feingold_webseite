const BASE_URL = import.meta.env.VITE_WP_API_BASE

type WpPage = {
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

export type PageModel<TFields> = {
  slug: string
  title: string
  fields: TFields
}

export type HomePageFields = {
  homeTitle: string
  homeSecondTitle: string
  homeSubtitle: string
  moreButton: string
  aktuellesTitle: string
  reviewTitle: string
}

export type AboutPageFields = {
  introText: string
  subText: string
  teachersTitle: string
}

export type KontaktPageFields = {
  introText: string
  instruments: string[]
  formularName: string
  formularEmail: string
  formularInstrument: string
  formularAuswahl: string
  buttonSenden: string
  emailText: string
  email: string
  telefonText: string
  contactPhone: string
  contactEmail: string
}

export type HeaderPageFields = {
  headerLogo: string
  headerSubtitle: string
  headerHomeText: string
  headerUnterrichtText: string
  headerMedienText: string
  headerKontaktText: string
  headerKonditionenText: string
  headerAboutText: string
}

export type FooterPageFields = {
  footerContactTitle: string
  footerKontaktEmailText: string
  footerEmail: string
  footerKontaktTelefonText: string
  footerPhone: string
  footerKontaktOrtText: string
  footerLocation: string
  footerNavTitle: string
  footerHomeLink: string
  footerUnterrichtLink: string
  footerMedienLink: string
  footerKontaktLink: string
  footerLogo: string
  footerClaim: string
  footerCopyright: string
}

export type MusicSchoolPageFields = {
  unterrichtTitle: string
  unterrichtSubtitle: string
  moreButton: string
  standortText: string
  adresseText: string
  embedUrl: string
  mapLink: string
  routeButton: string
}

export type MediaPageFields = {
  medienTitle: string
  medienSubtitle: string
}

export type KonditionenPageFields = {
  introText: string
  conditionsText: string
  contactText: string
  contactEmail: string
  contactPhone: string
}

export type ShopPageFields = {
  title: string
  introText: string
  buttonText: string
}

export type Teacher = {
  id: number
  name: string
  bio: string
  website?: string
  image: string
}

export type Product = {
  title: string
  price: string
  description: string
  image: string
}

type WpProductItem = {
  title?: {
    rendered?: string
  }
  acf?: {
    price?: string
    description?: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string
    }>
  }
}

type WpReviewItem = {
  title: {
    rendered: string
  }
  acf?: {
    visible?: boolean
    text?: string
    stars?: number | string
  }
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

// Edit: Normalize shared page data into a small app-facing model instead of leaking raw WP structures.
function mapPage<TFields>(page: WpPage, fields: TFields): PageModel<TFields> {
  return {
    slug: page.slug,
    title: page.title.rendered,
    fields
  }
}

// Edit: Map teacher entries into an app model with safe public fallbacks.
function mapTeacher(item: TeacherItem): Teacher {
  return {
    id: item.id,
    name: item.title.rendered,
    bio: item.acf?.bio ?? '',
    website: item.acf?.website,
    image: getTeacherImage(item)
  }
}

// Edit: Map product entries into a stable app model so views stop depending on WP field names.
function mapProduct(p: WpProductItem): Product {
  return {
    title: p.title?.rendered ?? 'Produkt',
    price: p.acf?.price ?? 'Preis auf Anfrage',
    description: p.acf?.description ?? 'Beschreibung folgt.',
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? ''
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

// Edit: Provide specialized loaders so pages can consume typed fields instead of raw ACF objects.
export async function loadHomePage(): Promise<PageModel<HomePageFields>> {
  const page = await loadPage('home')
  return mapPage(page, {
    homeTitle: page.acf?.home_title ?? '',
    homeSecondTitle: page.acf?.home_second_title ?? '',
    homeSubtitle: page.acf?.home_subtitle ?? '',
    moreButton: page.acf?.more_button ?? 'Mehr erfahren',
    aktuellesTitle: page.acf?.aktuelles_titel ?? 'Aktuelles',
    reviewTitle: page.acf?.review_title ?? 'Bewertungen'
  })
}

export async function loadAboutPage(): Promise<PageModel<AboutPageFields>> {
  const page = await loadPage('about')
  return mapPage(page, {
    introText: page.acf?.intro_text ?? '',
    subText: page.acf?.sub_text ?? '',
    teachersTitle: page.acf?.teachers_title ?? 'Lehrpersonen'
  })
}

export async function loadKontaktPage(): Promise<PageModel<KontaktPageFields>> {
  const page = await loadPage('kontakt')
  return mapPage(page, {
    introText: page.acf?.intro_text ?? '',
    instruments: typeof page.acf?.instruments === 'string'
      ? page.acf.instruments.split('\n').map((item: string) => item.trim()).filter(Boolean)
      : [],
    formularName: page.acf?.formular_name ?? 'Name',
    formularEmail: page.acf?.formular_email ?? 'E-Mail',
    formularInstrument: page.acf?.formular_instrument ?? 'Instrument',
    formularAuswahl: page.acf?.formular_auswahl ?? 'Bitte wählen',
    buttonSenden: page.acf?.button_senden ?? 'Senden',
    emailText: page.acf?.email_text ?? '',
    email: page.acf?.email ?? '',
    telefonText: page.acf?.telefon_text ?? '',
    contactPhone: page.acf?.contact_phone ?? '',
    contactEmail: page.acf?.contact_email ?? ''
  })
}

export async function loadHeaderPage(): Promise<PageModel<HeaderPageFields>> {
  const page = await loadPage('header')
  return mapPage(page, {
    headerLogo: page.acf?.header_logo ?? '',
    headerSubtitle: page.acf?.header_subtitle ?? '',
    headerHomeText: page.acf?.header_home_text ?? 'Home',
    headerUnterrichtText: page.acf?.header_unterricht_text ?? 'Unterricht',
    headerMedienText: page.acf?.header_medien_text ?? 'Medien',
    headerKontaktText: page.acf?.header_kontakt_text ?? 'Kontakt',
    headerKonditionenText: page.acf?.header_konditionen_text ?? 'Konditionen',
    headerAboutText: page.acf?.header_about_text ?? 'About'
  })
}

export async function loadFooterPage(): Promise<PageModel<FooterPageFields>> {
  const page = await loadPage('footer')
  return mapPage(page, {
    footerContactTitle: page.acf?.footer_contact_title ?? 'Kontakt',
    footerKontaktEmailText: page.acf?.footer_kontakt_email_text ?? 'E-Mail:',
    footerEmail: page.acf?.footer_email ?? '',
    footerKontaktTelefonText: page.acf?.footer_kontakt_telefon_text ?? 'Telefon:',
    footerPhone: page.acf?.footer_phone ?? '',
    footerKontaktOrtText: page.acf?.footer_kontakt_ort_text ?? 'Ort:',
    footerLocation: page.acf?.footer_location ?? '',
    footerNavTitle: page.acf?.footer_nav_title ?? 'Navigation',
    footerHomeLink: page.acf?.footer_home_link ?? 'Home',
    footerUnterrichtLink: page.acf?.footer_unterricht_link ?? 'Unterricht',
    footerMedienLink: page.acf?.footer_medien_link ?? 'Medien',
    footerKontaktLink: page.acf?.footer_kontakt_link ?? 'Kontakt',
    footerLogo: page.acf?.footer_logo ?? '',
    footerClaim: page.acf?.footer_claim ?? '',
    footerCopyright: page.acf?.footer_copyright ?? ''
  })
}

export async function loadMusicSchoolPage(): Promise<PageModel<MusicSchoolPageFields>> {
  const page = await loadPage('unterricht')
  return mapPage(page, {
    unterrichtTitle: page.acf?.unterricht_title ?? '',
    unterrichtSubtitle: page.acf?.unterricht_subtitle ?? '',
    moreButton: page.acf?.more_button ?? 'Mehr erfahren',
    standortText: page.acf?.standort_text ?? '',
    adresseText: page.acf?.adresse_text ?? '',
    embedUrl: page.acf?.embed_url ?? '',
    mapLink: page.acf?.map_link ?? '',
    routeButton: page.acf?.route_button ?? 'Route anzeigen'
  })
}

export async function loadMediaPage(): Promise<PageModel<MediaPageFields>> {
  const page = await loadPage('medien')
  return mapPage(page, {
    medienTitle: page.acf?.medien_title ?? '',
    medienSubtitle: page.acf?.medien_subtitle ?? ''
  })
}

export async function loadKonditionenPage(): Promise<PageModel<KonditionenPageFields>> {
  const page = await loadPage('konditionen')
  return mapPage(page, {
    introText: page.acf?.intro_text ?? '',
    conditionsText: page.acf?.conditions_text ?? '',
    contactText: page.acf?.contact_text ?? '',
    contactEmail: page.acf?.contact_email ?? '',
    contactPhone: page.acf?.contact_phone ?? ''
  })
}

export async function loadShopPage(slug: string, defaultButtonText: string): Promise<PageModel<ShopPageFields>> {
  const page = await loadPage(slug)
  return mapPage(page, {
    title: page.acf?.title ?? page.title.rendered,
    introText: page.acf?.intro_text ?? '',
    buttonText: page.acf?.button_text ?? defaultButtonText
  })
}

/**
 * function for teachers
 */
// function for loading teachers
export async function loadTeachers(): Promise<Teacher[]> {
  // Edit: Route teacher requests through the shared fetch helper for consistent public error handling.
  const data = await fetchWpJson<TeacherItem[]>(`/teacher?_embed&per_page=100`)
  return data.map(mapTeacher)
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
export async function loadProductsByCategory(slug: string): Promise<Product[]> {
  const categoryId = await getCategoryIdBySlug(slug)

  if (!categoryId) {
    console.warn('Kategorie nicht gefunden:', slug)
    return []
  }

  const data = await fetchWpJson<WpProductItem[]>(
    `/product?product_category=${categoryId}&_embed`
  )

  if (!Array.isArray(data)) {
    console.error('Unerwartete API-Antwort:', data)
    return []
  }

  return data.map(mapProduct)
}

// function for loading reviews
export async function loadReviews(): Promise<ReviewItem[]> {
  // Edit: Reviews are public runtime data too, so they need the same status and JSON checks.
  const data = await fetchWpJson<WpReviewItem[]>(`/review?per_page=20`)

  return data
    .filter((t) => t.acf?.visible !== false)
    // Edit: Clamp public CMS star values into the supported UI range.
    .map((t): ReviewItem => ({
      name: t.title.rendered,
      text: t.acf?.text ?? '',
      stars: Math.max(0, Math.min(5, Number(t.acf?.stars) || 0))
    }))
}
