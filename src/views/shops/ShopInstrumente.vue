<!--Musikinstrumente – Shop-Ansicht-->
  
<template>
  <!-- Edit: Expose a defined loading and error state instead of silently rendering an empty public shop page. -->
  <div v-if="loading" class="page-state"><div>Lädt…</div></div>
  <div v-else-if="error" class="page-state"><div>Fehler: {{ error }}</div></div>
  <div v-else class="shop-wrapper shop-instruments">
    <div class="shop-inner">
      <h1 class="shop-title">
        {{ page?.fields.title ?? 'Instrumente' }}
      </h1>
      <p class="shop-intro">
        {{ page?.fields.introText ?? '' }}
      </p>

      <p v-if="!instruments.length" class="shop-empty">
        <!-- Edit: Show a defined empty state when the public CMS has no products yet. -->
        Zurzeit sind keine Instrumente verfügbar.
      </p>

      <div v-else class="shop-grid">
        <div v-for="item in instruments" :key="item.title" class="shop-card">
          <img v-if="item.image" :src="item.image" :alt="item.title" class="shop-image" />
          <div v-else class="shop-image shop-image-fallback">
            <!-- Edit: Provide a visible fallback when no product image is available. -->
            Kein Bild
          </div>
          <h2 class="shop-card-title">{{ item.title }}</h2>
          <p class="shop-description">{{ item.description }}</p>
          <p class="shop-price">{{ item.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=Instrumentenbestellung: ${item.title}`"
             class="shop-button">
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
