<!--Musikinstrumente – Shop-Ansicht-->
  
<template>
  <!-- Edit: Expose a defined loading and error state instead of silently rendering an empty public shop page. -->
  <div v-if="loading" class="min-h-screen px-6 py-20">Lädt…</div>
  <div v-else-if="error" class="min-h-screen px-6 py-20">Fehler: {{ error }}</div>
  <div v-else class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-blue-50 to-blue-100 dark:from-violet-900 dark:via-indigo-950 dark:to-purple-900">
    <div class="max-w-6xl mx-auto space-y-12 text-center">
      <h1 class="text-4xl font-bold text-blue-600">
        {{ page?.fields.title ?? 'Instrumente' }}
      </h1>
      <p class="text-gray-700 dark:text-blue-400">
        {{ page?.fields.introText ?? '' }}
      </p>

      <p v-if="!instruments.length" class="text-gray-700 dark:text-blue-300">
        <!-- Edit: Show a defined empty state when the public CMS has no products yet. -->
        Zurzeit sind keine Instrumente verfügbar.
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="item in instruments" :key="item.title" class="bg-white dark:bg-indigo-900 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <div v-else class="h-48 w-full rounded-md mb-4 flex items-center justify-center bg-blue-100 text-blue-500">
            <!-- Edit: Provide a visible fallback when no product image is available. -->
            Kein Bild
          </div>
          <h2 class="text-xl font-semibold text-blue-700 dark:text-white/70">{{ item.title }}</h2>
          <p class="text-sm text-gray-600 dark:text-blue-300">{{ item.description }}</p>
          <p class="text-gray-900 font-medium dark:text-white/80 mt-2">{{ item.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Instrumentenbestellung: ${item.title}`"
             class="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition">
            {{ page?.fields.buttonText ?? 'Jetzt bestellen' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { loadProductsByCategory, loadShopPage } from '../../api/wp'
import type { PageModel, Product, ShopPageFields } from '../../api/wp'

// Edit: Use typed product and shop-page models instead of raw WP data.
const instruments = ref<Product[]>([])
const page = ref<PageModel<ShopPageFields> | null>(null)
// Edit: Track runtime status for the public shop view.
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Shop-Seite laden
    page.value = await loadShopPage('instrumente', 'Jetzt bestellen')


    // CDs laden
    instruments.value = await loadProductsByCategory('instrumente')
  } catch (err) {
    console.error('Shop Instrumente error:', err)
    error.value = err instanceof Error ? err.message : 'Fehler beim Laden des Shops'
  } finally {
    loading.value = false
  }
})

</script>
