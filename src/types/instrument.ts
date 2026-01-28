export type Instrument = {
  slug: string
  name: string
  description: string
  image: string
}

export type WpInstrumentItem = {
  slug: string
  title: { rendered: string }
  acf: {
    description: string
  }
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string
      media_details?: {
        sizes?: {
          large?: { source_url: string }
          medium?: { source_url: string }
        }
      }
    }>
  }
}