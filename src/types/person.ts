export type Person = {
  slug: string
  name: string
  title: string
  videoId: string
  spotifyLink: string
  facebook?: string
  instagram?: string
  youtube?: string
  website?: string
}

export type WpPersonItem = {
  slug: string
  title: { rendered: string }
  acf: {
    title: string
    video_id: string
    spotify_embed: string
    facebook_link?: string
    instagram_link?: string
    youtube_link?: string
    website_link?: string
  }
}