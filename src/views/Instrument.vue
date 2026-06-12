<!--Instrument.vue – Detailansicht für ein einzelnes Instrument-->
  

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadInstrument } from '../api/wp'
import type { Instrument } from '../types/instrument'

const route = useRoute()
const instrument = ref<Instrument | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchInstrument() {
  loading.value = true
  error.value = null

  try {
    const slug = String(route.params.name)
    instrument.value = await loadInstrument(slug)
    if (!instrument.value) error.value = 'Instrument nicht gefunden'
  } catch (e: unknown) {
    // Edit: Narrow unknown errors instead of relying on `any` in the instrument detail view.
    error.value = e instanceof Error ? e.message : 'Fehler beim Laden'
  } finally {
    loading.value = false
  }
}

onMounted(fetchInstrument)

// if one navigates between instruments without loading the view again
watch(() => route.params.name, fetchInstrument)
</script>


<template>
  <div class="instrument-wrapper">
    <div class="instrument-container">
      <div v-if="loading" class="instrument-state">Lädt…</div>
      <div v-else-if="error" class="instrument-state">Fehler: {{ error }}</div>

      <template v-else>
        <!-- Titel -->
      <h1 class="instrument-title">
        {{ instrument?.name }}
      </h1>

      <!-- Bild -->
      <img
        v-if="instrument?.image"
        :src="instrument.image"
        :alt="instrument.name"
        class="instrument-image"
      />
      <div v-else class="instrument-image instrument-image-fallback">
        <!-- Edit: Show a defined fallback when an instrument has no image in the public CMS. -->
        Kein Bild verfügbar
      </div>

      <!-- Beschreibung -->
      <p class="instrument-description">
        {{ instrument?.description || 'Beschreibung folgt.' }}
      </p>

      <!-- Call to Action -->
      <router-link
        to="/kontakt"
        class="instrument-button"
      >
        Probestunde vereinbaren
      </router-link>

      </template>
    </div>
  </div>
</template>
