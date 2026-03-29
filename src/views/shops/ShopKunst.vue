<!--Kunstmalerei – Galerie- & Shop-Komponente-->
  
<template>
  <!-- Edit: Expose a defined loading and error state instead of silently rendering an empty public shop page. -->
  <div v-if="loading" class="min-h-screen px-6 py-20">Lädt…</div>
  <div v-else-if="error" class="min-h-screen px-6 py-20">Fehler: {{ error }}</div>
  <div v-else class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-yellow-50 to-orange-100 dark:from-violet-900 dark:via-indigo-950 dark:to-purple-900">
    <div class="max-w-6xl mx-auto space-y-12 text-center">

      <h1 class="text-4xl font-bold text-orange-600 dark:text-blue-600">
        {{ page?.fields.title ?? 'Kunst' }}
      </h1>
      <p class="text-gray-700 dark:text-blue-400">
        {{ page?.fields.introText ?? '' }}
      </p>

      <p v-if="!artworks.length" class="text-gray-700 dark:text-blue-300">
        <!-- Edit: Show a defined empty state when the public CMS has no products yet. -->
        Zurzeit sind keine Kunstwerke verfügbar.
      </p>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div v-for="art in artworks" :key="art.title" class="bg-white dark:bg-indigo-900 rounded-xl shadow-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <img v-if="art.image" :src="art.image" :alt="art.title" class="h-48 w-full object-cover rounded-md mb-4" />
          <div v-else class="h-48 w-full rounded-md mb-4 flex items-center justify-center bg-orange-100 text-orange-500">
            <!-- Edit: Provide a visible fallback when no product image is available. -->
            Kein Bild
          </div>
          <h2 class="text-xl font-semibold text-orange-700 dark:text-blue-500">{{ art.title }}</h2>
          <p class="text-sm text-gray-600 dark:text-blue-400">{{ art.description }}</p>
          <p class="text-gray-900 font-medium mt-2">{{ art.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Kunstwerk-Anfrage: ${art.title}`"
             class="inline-block mt-4 px-4 py-2 bg-orange-500 dark:bg-violet-600 text-white rounded-full hover:bg-orange-600 dark:hover:bg-blue-600 transition">
            {{ page?.fields.buttonText ?? 'Werk Anfragen' }}
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
const artworks = ref<Product[]>([])
const page = ref<PageModel<ShopPageFields> | null>(null)
// Edit: Track runtime status for the public shop view.
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Shop-Seite laden
    page.value = await loadShopPage('kunst', 'Werk Anfragen')


    // CDs laden
    artworks.value = await loadProductsByCategory('kunst')
  } catch (err) {
    console.error('Shop Kunstwerke error:', err)
    error.value = err instanceof Error ? err.message : 'Fehler beim Laden des Shops'
  } finally {
    loading.value = false
  }
})

</script>
