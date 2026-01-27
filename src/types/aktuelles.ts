// types/aktuelles.ts
export type AktuellesEvent = {
  title: string
  date: string
  description: string
  link?: string
}

export type WpAktuellesItem = {
  title: {
    rendered: string
  }
  acf: {
    date: string
    description: string
    link?: string
  }
}