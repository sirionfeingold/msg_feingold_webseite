<template>
  <section class="py-24 px-4 sm:px-8 bg-gradient-to-br dark:text-gray-100">
    <div class="max-w-5xl mx-auto space-y-16 text-center">

      <!-- Überschrift -->
      <h2 class="leading-tight text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-300 via-orange-500 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
        Was unsere Schüler:innen sagen
      </h2>

      <div class="space-y-12">
        <div
          v-for="t in bewertung"
          :key="t.name"
          class="bg-white/70 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 rounded-3xl p-8 sm:p-10 shadow-xl border border-white/30 dark:border-gray-700 max-w-4xl mx-auto text-left hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
        >
          <!-- Bewertungstext -->
          <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-200 italic leading-relaxed mb-6">
            “{{ t.text }}”
          </p>

          <!-- Sterne + Name -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex space-x-1 text-yellow-400 text-xl">
              <span v-for="i in t.stars" :key="i">★</span>
              <span v-for="i in 5 - t.stars" :key="'empty' + i" class="opacity-30">★</span>
            </div>
            <div class="text-right font-semibold text-blue-600 dark:text-blue-400 text-sm sm:text-base">
              – {{ t.name }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const bewertung = [
  {
    name: 'Hans H.',
    text: 'Hier macht Musik- und Gesangsunterricht Freude. Unterricht erfolgt kompetent und herzlich, ob Anfänger oder fortgeschritten. MSG liegt zentral im Herzen von Bern.',
    stars: 5
  }
]
</script>
