<!--Kunstmalerei – Galerie- & Shop-Komponente-->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-yellow-50 to-orange-100 dark:from-violet-900 dark:via-indigo-950 dark:to-purple-900">
    <div class="max-w-6xl mx-auto space-y-12 text-center">

      <h1 class="text-4xl font-bold text-orange-600 dark:text-blue-600">
        {{ title }}
      </h1>
      <p class="text-gray-700 dark:text-blue-400">
        {{ intro }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="art in artworks" :key="art.title" class="bg-white dark:bg-indigo-900 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img :src="art.image" :alt="art.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold text-orange-700 dark:text-blue-500">{{ art.title }}</h2>
          <p class="text-sm text-gray-600 dark:text-blue-400">{{ art.description }}</p>
          <p class="text-gray-900 font-medium mt-2">{{ art.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Kunstwerk-Anfrage: ${art.title}`"
             class="inline-block mt-4 px-4 py-2 bg-orange-500 dark:bg-violet-600 text-white rounded-full hover:bg-orange-600 dark:hover:bg-blue-600 transition">
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

const artworks = ref<any[]>([])
const title = ref('')
const intro = ref('')
const buttonText = ref('Werk Anfragen')

onMounted(async () => {
  try {
    // Shop-Seite laden
    const page = await loadPage('kunst')
    title.value = page.acf.title
    intro.value = page.acf.intro_text
    buttonText.value = page.acf.button_text ?? 'Werk Anfragen'


    // CDs laden
    artworks.value = await loadProductsByCategory('kunst')
  } catch (err) {
    console.error('Shop Kunstwerke error:', err)
  }
})

</script>
