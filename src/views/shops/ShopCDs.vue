<!--CDs & Musikaufnahmen – Produktübersicht-->
  
<template>
  <!-- Edit: Expose a defined loading and error state instead of silently rendering an empty public shop page. -->
  <div v-if="loading" class="min-h-screen px-6 py-20">Lädt…</div>
  <div v-else-if="error" class="min-h-screen px-6 py-20">Fehler: {{ error }}</div>
  <div v-else class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-pink-50 to-pink-100 dark:from-violet-900 dark:via-indigo-950 dark:to-purple-900">
    <div class="max-w-6xl mx-auto space-y-12 text-center">

      <h1 class="text-4xl font-bold text-pink-600 dark:text-blue-600">
        {{ title }}
      </h1>
      <p class="text-gray-700 dark:text-blue-400">
        {{ intro }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="cd in cds" :key="cd.title" class="bg-white dark:bg-indigo-900 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img :src="cd.image" :alt="cd.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold text-pink-700 dark:text-blue-400">{{ cd.title }}</h2>
          <p class="text-sm text-gray-600 dark:text-blue-300">{{ cd.description }}</p>
          <p class="text-gray-900 dark:text-blue-200 font-medium mt-2">{{ cd.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=CD-Bestellung: ${cd.title}`"
             class="inline-block mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition">
            {{ buttonText }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { loadProductsByCategory, loadPage } from '../../api/wp'

const cds = ref<any[]>([])
const title = ref('')
const intro = ref('')
const buttonText = ref('Jetzt bestellen')
// Edit: Track runtime status for the public shop view.
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Shop-Seite laden
    const page = await loadPage('cds')
    title.value = page.acf.title
    intro.value = page.acf.intro_text
    buttonText.value = page.acf.button_text ?? 'Jetzt bestellen'

    // CDs laden
    cds.value = await loadProductsByCategory('cds')
  } catch (err) {
    console.error('Shop CDs error:', err)
    error.value = err instanceof Error ? err.message : 'Fehler beim Laden des Shops'
  } finally {
    loading.value = false
  }
})

</script>
