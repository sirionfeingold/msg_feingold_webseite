<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-blue-600">Musikinstrumente</h1>
      <p class="text-gray-700">Unsere hochwertigen Instrumente für Schüler:innen und Profis – direkt bei uns erhältlich.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="item in instruments" :key="item.title" class="bg-white rounded-xl shadow-lg p-6">
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
    title: 'Blockflöte barock',
    price: 'CHF 95.–',
    image: '/images/shop/blockfloete.jpg',
    description: 'Ideal für den Einstieg – handgearbeitet, warmer Klang.'
  },
  {
    title: 'Schüler-Violine 3/4',
    price: 'CHF 249.–',
    image: '/images/shop/violine.jpg',
    description: 'Mit Bogen, Etui & Kolophonium – ideal für Musikschüler:innen.'
  },
  {
    title: 'Digitalpiano Roland',
    price: 'CHF 690.–',
    image: '/images/shop/piano.jpg',
    description: '88 Tasten, Hammermechanik, ideal für Zuhause & Musikschule.'
  }
]
</script>
