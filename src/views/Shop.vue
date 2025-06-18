  <!--
  Shop.vue – Übersicht über ausgewählte Produkte der MSG Feingold

  Beschreibung:
  Diese Seite präsentiert ausgewählte CDs, Notenhefte und weitere Artikel,
  die von der MSG Feingold produziert oder herausgegeben wurden. 
  Die Produkte sind übersichtlich in einem ansprechenden Grid gelistet
  und können direkt via Mailanfrage bestellt werden.

  Inhalte:
  – Titel und Einleitung
  – Dynamisch generierte Produktliste aus einem JavaScript-Array
  – Jede Box enthält Bild, Beschreibung, Preis und Mail-Link zur Bestellung
  – Responsive Design mit Hovereffekten

  Ziel:
  Nutzer:innen sollen sich schnell einen Überblick über das Sortiment verschaffen
  und auf einfache Weise ihre Wunschprodukte bestellen können.
  -->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-orange-50 to-yellow-100">
    <div class="max-w-6xl mx-auto space-y-16 text-center">

      <!-- Überschrift -->
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-rose-600 text-transparent bg-clip-text drop-shadow-lg">
        Shop – Instrumente, CDs & Noten
      </h1>

      <!-- Beschreibung -->
      <p class="text-lg text-gray-700 max-w-3xl mx-auto">
        Entdecke unsere Produktionen und Publikationen – Musik mit Herz aus der MSG Feingold. Du kannst direkt per E-Mail bestellen.
      </p>

      <!-- Produktliste -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between"
        >
          <img :src="product.image" :alt="product.title" class="rounded-md mb-4 w-full object-cover h-48" />

          <div class="text-left space-y-2">
            <h2 class="text-xl font-semibold text-orange-700">{{ product.title }}</h2>
            <p class="text-gray-600 text-sm">{{ product.description }}</p>
            <p class="text-base font-medium text-gray-900">{{ product.price }}</p>
          </div>

          <!-- Bestelllink -->
          <a
            :href="`mailto:email@msgfeingold.ch?subject=Bestellung: ${encodeURIComponent(product.title)}`"
            class="mt-4 inline-block text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 ease-in-out"
          >
            Jetzt bestellen
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const products = [
  {
    title: "CD – Klassik Vol. 1",
    price: "CHF 15.–",
    image: "/images/shop/klassik1.jpg",
    description: "Symphonien aus Bern mit dem MSG Kammerorchester. Leidenschaftlich & professionell eingespielt."
  },
  {
    title: "CD – Weihnachtskonzert",
    price: "CHF 18.–",
    image: "/images/shop/weihnachten.jpg",
    description: "Stimmungsvolle Musik für die Advents- & Weihnachtszeit mit Chor und Orchester."
  },
  {
    title: "Notenheft – MSG Edition Vol. 1",
    price: "CHF 12.–",
    image: "/images/shop/noten1.jpg",
    description: "Exklusive Arrangements von MSG-Lehrkräften für Gesang, Klavier und Ensemble."
  },
  // Weitere Produkte hier einfach ergänzen
]
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
