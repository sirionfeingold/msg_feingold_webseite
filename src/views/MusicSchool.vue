<!--Musikschule.vue – Übersicht über alle angebotenen Instrumentalfächer-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadInstruments, loadPage } from '../api/wp'
import type { Instrument } from '../types/instrument'

const instruments = ref<Instrument[]>([])
const page = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const gradientMap: Record<string, string> = {
  gesang: 'bg-gradient-to-br from-pink-500 to-rose-400',
  klavier: 'bg-gradient-to-br from-amber-400 to-orange-500',
  gitarre: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  blockfloete: 'bg-gradient-to-br from-lime-400 to-emerald-500',
  klarinette: 'bg-gradient-to-br from-cyan-400 to-sky-500',
  saxophon: 'bg-gradient-to-br from-violet-500 to-indigo-600',
  violine: 'bg-gradient-to-br from-rose-500 to-pink-600',
  violoncello: 'bg-gradient-to-br from-red-400 to-orange-600'
}

onMounted(async () => {
  try {
    page.value = await loadPage('unterricht')
    instruments.value = await loadInstruments()
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Instrumente'
  } finally {
    loading.value = false
  }
})
</script>

<template>

  <div v-if="loading">Lädt…</div>

  <div v-else-if="error">
    Fehler: {{ error }}
  </div>

  <div v-else-if="page" class="musikschule-wrapper">
    <div class="musikschule-inner">

      <!-- Überschrift -->
      <h1 class="musikschule-title">
         {{ page?.acf?.unterricht_title}}
        </h1>

      <!-- Beschreibung -->
      <p class="musikschule-desc">
        {{ page?.acf?.unterricht_subtitle }}
      </p>

      <!-- Instrumentenliste mit Links -->
      <div class="instrument-grid">
        <router-link
          v-for="(instrument, index) in instruments"
          :key="index"
          :to="`/instrument/${instrument.slug}`"
          class="instrument-card"
          :class="gradientMap[instrument.slug] ?? 'bg-gray-200'"
        >
          <h2 class="instrument-name">{{ instrument.name }}</h2>
          <p class="instrument-link">
            {{ page?.acf?.more_button }}
          </p>
        </router-link>
      </div>
    </div>

   <section class="standort-section">
    <h2 class="standort-title">
      {{ page?.acf?.standort_text }}
    </h2>
    <p class="standort-text" v-html="page?.acf?.adresse_text">
      
    </p>
    <div class="standort-map">
      <iframe
        v-if="page?.acf?.embed_url"
        :src="page.acf.embed_url"
        class="w-full h-full"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <a
      :href="page?.acf?.map_link"
      target="_blank"
      class="standort-link"
    >
    <button type="submit"
            class="standort-button"
          >
      {{ page?.acf?.route_button }}
    </button>
    </a>
  </section>
  </div>
</template>