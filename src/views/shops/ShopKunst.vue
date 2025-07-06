<!--
  Kunstmalerei – Galerie- & Shop-Komponente

  Beschreibung:
  Diese Komponente stellt eine Auswahl an Kunstwerken von Magdalena Postigo dar.
  Besucher:innen können Informationen zu Technik, Format und Preis erhalten und per Mail eine Anfrage senden.

  Inhalt:
  - Bild des Werks
  - Titel, Beschreibung, Maße, Preis
  - "Werk anfragen"-Button mit vorausgefülltem Betreff per mailto-Link

  Features:
  - Responsive Grid für verschiedene Bildschirmgrößen
  - Hover-Effekt auf den Karten (Vergrößerung, Schatten)
  - Klar strukturierter Aufbau im eleganten Farbverlauf-Hintergrund

  Erweiterungsideen:
  - Lightbox zum Vergrößern der Bilder
  - Detailansicht bei Klick auf ein Bild (eigene Route pro Werk)
  - Daten dynamisch über CMS oder Datenbank laden

  Hinweis:
  Stelle sicher, dass die Bilddateien unter /public/FotosKunst/ verfügbar und korrekt benannt sind.
  -->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-yellow-50 to-orange-100">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-orange-600">Kunstmalerei</h1>
      <p class="text-gray-700">Originale Werke von Magdalena Postigo – Öl, Acryl & Mischtechnik.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="art in artworks" :key="art.title" class="bg-white rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img :src="art.image" :alt="art.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold text-orange-700">{{ art.title }}</h2>
          <p class="text-sm text-gray-600">{{ art.description }}</p>
          <p class="text-gray-900 font-medium mt-2">{{ art.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Kunstwerk-Anfrage: ${art.title}`"
             class="inline-block mt-4 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
            Werk anfragen
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const artworks = [
  {
    title: 'Luna y Sol',
    price: 'CHF 380.–',
    image: '/FotosKunst/LunaSol.jpg',
    description: 'Öl auf Leinwand, 51 × 42.5 cm, Argentinien 1994.'
  },
  {
    title: 'Galaxias',
    price: 'CHF 560.–',
    image: '/FotosKunst/Galaxias.jpg',
    description: 'Großformat, Öl, 62 × 92 cm – Energie & Bewegung.'
  }
]
</script>
