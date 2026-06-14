const RAW_BASE_URL = import.meta.env.VITE_WP_API_BASE

// Edit: Validate the configured WP base URL once so broken env values fail early and predictably.
const BASE_URL = (() => {
  const value = safeText(RAW_BASE_URL).trim()

  if (!value) {
    return ''
  }

  try {
    const url = new URL(value)
    const pathname = url.pathname.replace(/\/+$/, '')

    if (
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      pathname !== '/wp-json/wp/v2'
    ) {
      return ''
    }

    return `${url.origin}${pathname}`
  } catch {
    return ''
  }
})()

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

// Edit: Accept only a small allowlist of public URL protocols before exposing CMS links to the UI.
function normalizeAllowedUrl(
  value: unknown,
  options?: {
    allowedProtocols?: string[]
    allowedHosts?: string[]
  }
): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined

  try {
    const url = new URL(value)
    const allowedProtocols = options?.allowedProtocols ?? ['https:']

    if (!allowedProtocols.includes(url.protocol)) {
      return undefined
    }

    if (url.username || url.password) {
      return undefined
    }

    if (options?.allowedHosts?.length && !options.allowedHosts.includes(url.hostname)) {
      return undefined
    }

    return url.toString()
  } catch {
    return undefined
  }
}

// Edit: Restrict media embeds to the providers the page is intentionally designed to support.
function normalizeEmbedUrl(value: unknown): string | undefined {
  return normalizeAllowedUrl(value, {
    allowedProtocols: ['https:'],
    allowedHosts: [
      'www.google.com',
      'maps.google.com',
      'open.spotify.com',
      'www.spotify.com'
    ]
  })
}

// Edit: Validate public website/social links from WP before they become clickable anchors.
function normalizeExternalLink(value: unknown): string | undefined {
  return normalizeAllowedUrl(value, {
    allowedProtocols: ['https:']
  })
}

// Edit: Keep image sources on safe absolute HTTPS URLs before they are mounted into `img` tags.
function normalizeImageUrl(value: unknown): string {
  return normalizeAllowedUrl(value, {
    allowedProtocols: ['https:']
  }) ?? ''
}

// Edit: Accept either a raw 11-character YouTube ID or a standard YouTube URL from the CMS.
function normalizeYoutubeVideoId(value: unknown): string {
  const raw = safeText(value).trim()
  if (!raw) return ''

  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) {
    return raw
  }

  try {
    const url = new URL(raw)
    const hostname = url.hostname.replace(/^www\./, '')

    if (url.username || url.password) {
      return ''
    }

    if (hostname === 'youtu.be') {
      const id = url.pathname.replace(/^\/+/, '').split('/')[0] ?? ''
      return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : ''
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      const watchId = url.searchParams.get('v') ?? ''
      if (/^[A-Za-z0-9_-]{11}$/.test(watchId)) {
        return watchId
      }

      const pathSegments = url.pathname.split('/').filter(Boolean)
      const embedId = pathSegments[pathSegments.length - 1] ?? ''
      return /^[A-Za-z0-9_-]{11}$/.test(embedId) ? embedId : ''
    }
  } catch {
    return ''
  }

  return ''
}

// Edit: Keep public CMS text fields string-only so malformed payloads degrade gracefully.
function safeText(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
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
    // Edit: Normalize the shared page title too so all rendered WP text follows the same rule.
    title: safeText(page.title?.rendered),
    fields
  }
}

// Edit: Map teacher entries into an app model with safe public fallbacks.
function mapTeacher(item: TeacherItem): Teacher {
  return {
    id: item.id,
    // Edit: Guard teacher data against malformed CMS payloads before rendering it.
    name: safeText(item.title?.rendered, 'Lehrperson'),
    bio: safeText(item.acf?.bio),
    website: normalizeExternalLink(item.acf?.website),
    image: getTeacherImage(item)
  }
}

// Edit: Map product entries into a stable app model so views stop depending on WP field names.
function mapProduct(p: WpProductItem): Product {
  return {
    // Edit: Default missing product text so one broken CMS entry does not break the whole shop grid.
    title: safeText(p.title?.rendered, 'Produkt'),
    price: safeText(p.acf?.price, 'Preis auf Anfrage'),
    description: safeText(p.acf?.description, 'Beschreibung folgt.'),
    image: normalizeImageUrl(p._embedded?.['wp:featuredmedia']?.[0]?.source_url)
  }
}

// main function which loads website
export async function loadPage(slug: string): Promise<WpPage> {
  // Edit: Encode the slug and fail loudly when a required public page is missing.
  const data = await fetchWpJson<WpPage[]>(
    `/pages?slug=${encodeURIComponent(slug)}&_fields=slug,title,acf`
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
    // Edit: Coerce WP text fields to strings so typed views do not receive unexpected values.
    homeTitle: safeText(page.acf?.home_title),
    homeSecondTitle: safeText(page.acf?.home_second_title),
    homeSubtitle: safeText(page.acf?.home_subtitle),
    moreButton: safeText(page.acf?.more_button, 'Mehr erfahren'),
    aktuellesTitle: safeText(page.acf?.aktuelles_titel, 'Aktuelles'),
    reviewTitle: safeText(page.acf?.review_title, 'Bewertungen')
  })
}

export async function loadAboutPage(): Promise<PageModel<AboutPageFields>> {
  const page = await loadPage('about')
  return mapPage(page, {
    // Edit: Keep public about-page content resilient against missing ACF fields.
    introText: safeText(page.acf?.intro_text),
    subText: safeText(page.acf?.sub_text),
    teachersTitle: safeText(page.acf?.teachers_title, 'Lehrpersonen')
  })
}

export async function loadKontaktPage(): Promise<PageModel<KontaktPageFields>> {
  const page = await loadPage('kontakt')
  return mapPage(page, {
    // Edit: Normalize the contact page fields centrally so the view can stay simple and safe.
    introText: safeText(page.acf?.intro_text),
    instruments: typeof page.acf?.instruments === 'string'
      ? page.acf.instruments.split('\n').map((item: string) => item.trim()).filter(Boolean)
      : [],
    formularName: safeText(page.acf?.formular_name, 'Name'),
    formularEmail: safeText(page.acf?.formular_email, 'E-Mail'),
    formularInstrument: safeText(page.acf?.formular_instrument, 'Instrument'),
    formularAuswahl: safeText(page.acf?.formular_auswahl, 'Bitte wählen'),
    buttonSenden: safeText(page.acf?.button_senden, 'Senden'),
    emailText: safeText(page.acf?.email_text),
    email: safeText(page.acf?.email),
    telefonText: safeText(page.acf?.telefon_text),
    contactPhone: safeText(page.acf?.contact_phone),
    contactEmail: safeText(page.acf?.contact_email)
  })
}

export async function loadHeaderPage(): Promise<PageModel<HeaderPageFields>> {
  const page = await loadPage('header')
  return mapPage(page, {
    // Edit: Keep header labels string-safe because they are rendered on every route.
    headerLogo: safeText(page.acf?.header_logo),
    headerSubtitle: safeText(page.acf?.header_subtitle),
    headerHomeText: safeText(page.acf?.header_home_text, 'Home'),
    headerUnterrichtText: safeText(page.acf?.header_unterricht_text, 'Unterricht'),
    headerMedienText: safeText(page.acf?.header_medien_text, 'Medien'),
    headerKontaktText: safeText(page.acf?.header_kontakt_text, 'Kontakt'),
    headerKonditionenText: safeText(page.acf?.header_konditionen_text, 'Konditionen'),
    headerAboutText: safeText(page.acf?.header_about_text, 'About')
  })
}

export async function loadFooterPage(): Promise<PageModel<FooterPageFields>> {
  const page = await loadPage('footer')
  return mapPage(page, {
    // Edit: Normalize footer copy so broken CMS data does not take down the global footer.
    footerContactTitle: safeText(page.acf?.footer_contact_title, 'Kontakt'),
    footerKontaktEmailText: safeText(page.acf?.footer_kontakt_email_text, 'E-Mail:'),
    footerEmail: safeText(page.acf?.footer_email),
    footerKontaktTelefonText: safeText(page.acf?.footer_kontakt_telefon_text, 'Telefon:'),
    footerPhone: safeText(page.acf?.footer_phone),
    footerKontaktOrtText: safeText(page.acf?.footer_kontakt_ort_text, 'Ort:'),
    footerLocation: safeText(page.acf?.footer_location),
    footerNavTitle: safeText(page.acf?.footer_nav_title, 'Navigation'),
    footerHomeLink: safeText(page.acf?.footer_home_link, 'Home'),
    footerUnterrichtLink: safeText(page.acf?.footer_unterricht_link, 'Unterricht'),
    footerMedienLink: safeText(page.acf?.footer_medien_link, 'Medien'),
    footerKontaktLink: safeText(page.acf?.footer_kontakt_link, 'Kontakt'),
    footerLogo: safeText(page.acf?.footer_logo),
    footerClaim: safeText(page.acf?.footer_claim),
    footerCopyright: safeText(page.acf?.footer_copyright)
  })
}

export async function loadMusicSchoolPage(): Promise<PageModel<MusicSchoolPageFields>> {
  const page = await loadPage('unterricht')
  return mapPage(page, {
    // Edit: Sanitize map/embed URLs here so the view only receives approved destinations.
    unterrichtTitle: safeText(page.acf?.unterricht_title),
    unterrichtSubtitle: safeText(page.acf?.unterricht_subtitle),
    moreButton: safeText(page.acf?.more_button, 'Mehr erfahren'),
    standortText: safeText(page.acf?.standort_text),
    adresseText: safeText(page.acf?.adresse_text),
    embedUrl: normalizeEmbedUrl(page.acf?.embed_url) ?? '',
    mapLink: normalizeExternalLink(page.acf?.map_link) ?? '',
    routeButton: safeText(page.acf?.route_button, 'Route anzeigen')
  })
}

export async function loadMediaPage(): Promise<PageModel<MediaPageFields>> {
  const page = await loadPage('medien')
  return mapPage(page, {
    // Edit: Keep the media-page chrome resilient to malformed CMS values.
    medienTitle: safeText(page.acf?.medien_title),
    medienSubtitle: safeText(page.acf?.medien_subtitle)
  })
}

export async function loadKonditionenPage(): Promise<PageModel<KonditionenPageFields>> {
  const page = await loadPage('konditionen')
  return mapPage(page, {
    // Edit: Normalize conditions-page text before the template splits or links it.
    introText: safeText(page.acf?.intro_text),
    conditionsText: safeText(page.acf?.conditions_text),
    contactText: safeText(page.acf?.contact_text),
    contactEmail: safeText(page.acf?.contact_email),
    contactPhone: safeText(page.acf?.contact_phone)
  })
}

export async function loadShopPage(slug: string, defaultButtonText: string): Promise<PageModel<ShopPageFields>> {
  const page = await loadPage(slug)
  return mapPage(page, {
    // Edit: Shop pages also get normalized strings so bad CMS content stays local to one field.
    title: safeText(page.acf?.title, safeText(page.title?.rendered, 'Shop')),
    introText: safeText(page.acf?.intro_text),
    buttonText: safeText(page.acf?.button_text, defaultButtonText)
  })
}

/**
 * function for teachers
 */
// function for loading teachers
export async function loadTeachers(): Promise<Teacher[]> {
  // Edit: Route teacher requests through the shared fetch helper for consistent public error handling.
  const data = await fetchWpJson<TeacherItem[]>(
    `/teacher?_embed=wp:featuredmedia&per_page=100&_fields=id,title,acf,_links,_embedded`
  )
  return data.map(mapTeacher)
}

// get teacher images
export function getTeacherImage(t: TeacherItem): string {
  return (
    // Edit: Normalize teacher image URLs before they reach the `img` tag.
    normalizeImageUrl(t._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url) ||
    normalizeImageUrl(t._embedded?.['wp:featuredmedia']?.[0]?.source_url)
  )
}

// aktuelles get function
import type { AktuellesEvent, WpAktuellesItem } from '../types/aktuelles'

export async function loadAktuelles(): Promise<AktuellesEvent[]> {
  const data = await fetchWpJson<WpAktuellesItem[]>(
    `/aktuelles?per_page=10&_fields=title,acf`
  )

  return data.map(item => ({
    // Edit: Treat event fields as untrusted CMS input and sanitize link targets.
    title: safeText(item.title?.rendered, 'Aktuelles'),
    date: safeText(item.acf?.date),
    description: safeText(item.acf?.description),
    link: normalizeExternalLink(item.acf?.link)
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
    // Edit: Normalize instrument image URLs before they are rendered in cards or detail views.
    normalizeImageUrl(media?.media_details?.sizes?.large?.source_url) ||
    normalizeImageUrl(media?.source_url)
  )
}

export async function loadInstruments(): Promise<Instrument[]> {
  const data = await fetchWpJson<WpInstrumentItem[]>(
    `/instrument?per_page=100&_embed=wp:featuredmedia&_fields=slug,title,acf,_links,_embedded`
  )

  return data.map(item => ({
    // Edit: Keep instrument cards renderable even when one CMS entry is incomplete.
    slug: safeText(item.slug),
    name: safeText(item.title?.rendered, 'Instrument'),
    description: safeText(item.acf?.description),
    image: getFeaturedImage(item)
  })).filter(item => item.slug)
}

export async function loadInstrument(slug: string): Promise<Instrument | null> {
  const data = await fetchWpJson<WpInstrumentItem[]>(
    `/instrument?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia&_fields=slug,title,acf,_links,_embedded`
  )
  if (!data.length) return null

  const item = data[0]

  return {
    // Edit: Normalize the single instrument payload before it reaches the detail page.
    slug: safeText(item.slug),
    name: safeText(item.title?.rendered, 'Instrument'),
    description: safeText(item.acf?.description),
    image: getFeaturedImage(item)
  }
}

// functions for Person --> Künstler (Media.vue)
import type { Person, WpPersonItem } from '../types/person'

export async function loadPersons(): Promise<Person[]> {
  const data = await fetchWpJson<WpPersonItem[]>(
    `/person?per_page=50&_fields=slug,title,acf`
  )

  return data.map(item => ({
    // Edit: Validate person media links centrally so the media component can render only approved URLs.
    slug: safeText(item.slug),
    name: safeText(item.title?.rendered, 'Person'),
    title: safeText(item.acf?.title),
    videoId: normalizeYoutubeVideoId(item.acf?.video_id),
    spotifyLink: normalizeEmbedUrl(item.acf?.spotify_embed) ?? '',
    facebook: normalizeExternalLink(item.acf?.facebook_link),
    instagram: normalizeExternalLink(item.acf?.instagram_link),
    youtube: normalizeExternalLink(item.acf?.youtube_link),
    website: normalizeExternalLink(item.acf?.website_link)
  })).filter(item => item.slug)
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
          // Edit: Keep dropdown labels string-safe even when one CMS page is malformed.
          safeText(page.acf?.dropdown_text) ||
          safeText(page.acf?.title) ||
          safeText(page.title?.rendered, 'Shop'),
        path: `/shop/${page.slug}`,
        intro: safeText(page.acf?.intro_text) || undefined
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
    `/product_category?slug=${encodeURIComponent(slug)}&_fields=id`
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
    `/product?product_category=${categoryId}&_embed=wp:featuredmedia&_fields=title,acf,_links,_embedded`
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
  const data = await fetchWpJson<WpReviewItem[]>(
    `/review?per_page=20&_fields=title,acf`
  )

  return data
    .filter((t) => t.acf?.visible !== false)
    // Edit: Clamp public CMS star values into the supported UI range.
    .map((t): ReviewItem => ({
      name: safeText(t.title?.rendered, 'Bewertung'),
      text: safeText(t.acf?.text),
      stars: Math.max(0, Math.min(5, Number(t.acf?.stars) || 0))
    }))
}
