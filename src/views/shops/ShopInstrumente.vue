<!--Musikinstrumente – Shop-Ansicht-->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-violet-900 dark:via-indigo-950 dark:to-purple-900">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-blue-600">
        {{ title }}
      </h1>
      <p class="text-gray-700 dark:text-blue-400">
        {{ intro }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="item in instruments" :key="item.title" class="bg-white dark:bg-indigo-900 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img :src="item.image" :alt="item.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold text-blue-700 dark:text-white/70">{{ item.title }}</h2>
          <p class="text-sm text-gray-600 dark:text-blue-300">{{ item.description }}</p>
          <p class="text-gray-900 font-medium dark:text-white/80 mt-2">{{ item.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Instrumentenbestellung: ${item.title}`"
             class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
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

const instruments = ref<any[]>([])
const title = ref('')
const intro = ref('')
const buttonText = ref('Jetzt bestellen')

onMounted(async () => {
  try {
    // Shop-Seite laden
    const page = await loadPage('instrumente')
    title.value = page.acf.title
    intro.value = page.acf.intro_text
    buttonText.value = page.acf.button_text ?? 'Jetzt bestellen'


    // CDs laden
    instruments.value = await loadProductsByCategory('instrumente')
  } catch (err) {
    console.error('Shop Instrumente error:', err)
  }
})

</script>