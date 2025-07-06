<!--
  CDs & Musikaufnahmen – Produktübersicht

  Beschreibung:
  Dieser Abschnitt zeigt eine Sammlung von Musik-CDs, die im Shop angeboten werden.
  Jede Karte enthält:
    - Ein Bild des CD-Covers
    - Titel, Beschreibung und Preis
    - Einen "Jetzt bestellen"-Button, der per Mail-Link eine Anfrage an die Musikschule sendet

  Funktionen:
  - Beim Hover wird die jeweilige Karte leicht vergrößert (hover:scale-105)
  - Die CD-Daten sind in einem Array definiert und können einfach erweitert oder angepasst werden
  - Ideal für kleinere Shops ohne komplexes Backend

  Erweiterungsideen:
  - Sortierung oder Filter nach Genre
  - Integration mit echtem Shopsystem (z. B. Stripe, Snipcart)
  - Download-Option für digitale Musikdateien
  -->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-pink-50 to-pink-100">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-pink-600">CDs & Musikaufnahmen</h1>
      <p class="text-gray-700">Unsere Musikproduktionen – aufgenommen mit Leidenschaft.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="cd in cds" :key="cd.title" class="bg-white rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img :src="cd.image" :alt="cd.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold text-pink-700">{{ cd.title }}</h2>
          <p class="text-sm text-gray-600">{{ cd.description }}</p>
          <p class="text-gray-900 font-medium mt-2">{{ cd.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=CD-Bestellung: ${cd.title}`"
             class="inline-block mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
            Jetzt bestellen
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const cds = [
  {
    title: 'International Jazz Trio',
    price: 'CHF 30.–',
    image: '/msg_feingold_webseite/FotosCDs/International_Jazz_Trio.png',
    description: 'Saxophon – Gesang E.Feingold, Gitarre F.Coletta, Bass R.Johnson Inhalt: Blauer Mönch, Körper und Seele, Wind des Mekong, Samba mit einer Note, Welle, Was können Sie für diese Welt tun, Spanischer Sommer, Mein lustiger Valentinstag, Diese dummen Dinge, Gegen Mitternacht und Sommerzeit'
  },
  {
    title: 'Lieder und Arien',
    price: 'CHF 25.–',
    image: '/msg_feingold_webseite/FotosCDs/LiederUndArien.png',
    description: 'Kassette Seite A: Liederzyklus Frauenliebe und Leben von Robert Schumann Seite B: Opernarien Aida Rittorna vincitor(G.Verdi), Madame Butterfly Un bel di vedremo, Tosca Vissi d’arte(G.Puccini), Carmen Habanera und Seguidilla (G.Bizet) Esther Feingold, Gesang Ruth Feingold Heim, Klavier.'
  },
  {
    title: 'Melodienreigen',
    price: 'CHF 30.–',
    image: '/msg_feingold_webseite/FotosCDs/Melodienreigen.png',
    description: 'Stereo CD 2781 Melodienreigen Frühlinsstimmen Walzer für Sopran und Orchester von J. Strauuss, Summertime für Sopran und Orchester von G, Gershwin Il Bacio Walzer für Sopran und Orchester von L. Arditi . – Cascada Verlag '
  },
  {
    title: 'Mozart Verdi Ovejero',
    price: 'CHF 30.–',
    image: '/msg_feingold_webseite/FotosCDs/Mozart_Verdi_Ovejero.png',
    description: 'Stereo CD 9292 Mozart Verdi Ovejero W.A.Mozart Konzert Arien G.Verdi Gilda Arie O.A.Ovejero Lied op. 24 “ Frühlings-explosion“  O.A.Ovejero Symphonie Nr. 2 Thaidonesia'
  },
  {
    title: 'Serenade',
    price: 'CHF 30.–',
    image: '/msg_feingold_webseite/FotosCDs/Serenade.png',
    description: 'Stereo CD 1820 Serenade Romantische Stücke für: Cello und Klavier Gesang und Klavier von: Hector Villa Lobos, Gabriel Faure, Jeules Massenet, Osvaldo Ovejero,'
  }
]
</script>
