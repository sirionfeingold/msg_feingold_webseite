<!--
  Musikinstrumente – Shop-Ansicht

  Beschreibung:
  Diese Komponente zeigt eine Übersicht über verfügbare Musikinstrumente im Verkauf.
  Jede Karte enthält:
    - Ein Bild des Instruments
    - Titel, Beschreibung und Preis
    - Einen Button, der eine E-Mail-Anfrage für eine Bestellung auslöst

  Features:
  - Responsive Grid-Layout mit schöner Animation bei Hover (hover:scale-105)
  - Bilder und Daten werden aus einem einfachen Array geladen
  - Mailto-Link leitet direkt zur Anfrage per E-Mail weiter

  Erweiterungsideen:
  - Integration eines echten Warenkorbsystems oder Zahlungsanbieters (Stripe, PayPal)
  - Verfügbarkeit oder Lagerstatus anzeigen
  - Dynamische Daten aus einer Datenbank (z. B. Firebase, Supabase)

  Hinweis:
  Bilder müssen im korrekten Pfad /FotosInstrumente/ liegen. Achte auf Dateinamen und Dateiformate.
  -->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-blue-600">Musikinstrumente</h1>
      <p class="text-gray-700">Unsere hochwertigen Instrumente für Schüler:innen und Profis – direkt bei uns erhältlich.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="item in instruments" :key="item.title" class="bg-white rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img :src="item.image" :alt="item.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold text-blue-700">{{ item.title }}</h2>
          <p class="text-sm text-gray-600">{{ item.description }}</p>
          <p class="text-gray-900 font-medium mt-2">{{ item.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Instrumentenbestellung: ${item.title}`"
             class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            Jetzt bestellen
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const instruments = [
  {
    title: 'Gitarre',
    price: 'CHF 450.–',
    image: '/FotosInstrumente/guitarre1.png',
    description: 'Franzoesische Konzert Gitarre mit Savarez Seiten - Ideal für den Einstieg'
  },
  {
    title: 'E-Piano Kurzweil RG 200',
    price: 'CHF 450.–',
    image: '/FotosInstrumente/E_piano_Kurzweil.png',
    description: 'Qualitativ sehr hochwertiges E-Piano - Ideal für Zuhause & Musikschule'
  },
  {
    title: 'Occasion E-piano 5100',
    price: 'CHF 500.–',
    image: '/FotosInstrumente/E_piano5100.png',
    description: '88 Tasten, Hammermechanik, ideal für Zuhause & Musikschule.'
  }
]
</script>
