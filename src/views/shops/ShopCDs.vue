<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-pink-50 to-pink-100">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-pink-600">CDs & Musikaufnahmen</h1>
      <p class="text-gray-700">Unsere Musikproduktionen – aufgenommen mit Leidenschaft.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="cd in cds" :key="cd.title" class="bg-white rounded-xl shadow-lg p-6">
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
    title: 'Klassik Vol. 1',
    price: 'CHF 15.–',
    image: '/images/shop/klassik1.jpg',
    description: 'Symphonien aus Bern – mit dem MSG Kammerorchester.'
  },
  {
    title: 'Weihnachtskonzert 2022',
    price: 'CHF 18.–',
    image: '/images/shop/weihnachten.jpg',
    description: 'Festlich & berührend. Chor, Solisten & Orchester.'
  }
]
</script>
