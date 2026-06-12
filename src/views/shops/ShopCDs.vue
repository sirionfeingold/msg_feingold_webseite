<!--CDs & Musikaufnahmen – Produktübersicht-->
  
<template>
  <!-- Edit: Expose a defined loading and error state instead of silently rendering an empty public shop page. -->
  <div v-if="loading" class="page-state"><div>Lädt…</div></div>
  <div v-else-if="error" class="page-state"><div>Fehler: {{ error }}</div></div>
  <div v-else class="shop-wrapper shop-cds">
    <div class="shop-inner">

      <h1 class="shop-title">
        {{ page?.fields.title ?? 'CDs' }}
      </h1>
      <p class="shop-intro">
        {{ page?.fields.introText ?? '' }}
      </p>

      <p v-if="!cds.length" class="shop-empty">
        <!-- Edit: Show a defined empty state when the public CMS has no products yet. -->
        Zurzeit sind keine CDs verfügbar.
      </p>

      <div v-else class="shop-grid">
        <div v-for="cd in cds" :key="cd.title" class="shop-card">
          <img v-if="cd.image" :src="cd.image" :alt="cd.title" class="shop-image" />
          <div v-else class="shop-image shop-image-fallback">
            <!-- Edit: Provide a visible fallback when no product image is available. -->
            Kein Bild
          </div>
          <h2 class="shop-card-title">{{ cd.title }}</h2>
          <p class="shop-description">{{ cd.description }}</p>
          <p class="shop-price">{{ cd.price }}</p>
          <a :href="`mailto:email@msgfeingold.ch?subject=CD-Bestellung: ${cd.title}`"
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
const cds = ref<Product[]>([])
const page = ref<PageModel<ShopPageFields> | null>(null)
// Edit: Track runtime status for the public shop view.
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    // Shop-Seite laden
    page.value = await loadShopPage('cds', 'Jetzt bestellen')

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
