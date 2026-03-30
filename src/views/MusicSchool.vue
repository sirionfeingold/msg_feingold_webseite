<!--Musikschule.vue – Übersicht über alle angebotenen Instrumentalfächer-->

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadInstruments, loadMusicSchoolPage } from '../api/wp'
import type { MusicSchoolPageFields, PageModel } from '../api/wp'
import type { Instrument } from '../types/instrument'

const instruments = ref<Instrument[]>([])
// Edit: Use a dedicated music-school page model instead of raw ACF access.
const page = ref<PageModel<MusicSchoolPageFields> | null>(null)
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
    page.value = await loadMusicSchoolPage()
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
         {{ page?.fields.unterrichtTitle }}
        </h1>

      <!-- Beschreibung -->
      <p class="musikschule-desc">
        {{ page?.fields.unterrichtSubtitle }}
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
            {{ page?.fields.moreButton }}
          </p>
        </router-link>
      </div>
    </div>

   <section class="standort-section">
    <h2 class="standort-title">
      {{ page?.fields.standortText }}
    </h2>
    <!-- Edit: Render address copy as text until WP HTML is explicitly sanitized. -->
    <p class="standort-text">{{ page?.fields.adresseText }}</p>
    <div class="standort-map">
      <!-- Edit: Mount the map iframe only after the CMS URL passed API-side validation. -->
      <iframe
        v-if="page?.fields.embedUrl"
        :src="page.fields.embedUrl"
        class="w-full h-full"
        style="border:0;"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <a
      v-if="page?.fields.mapLink"
      :href="page.fields.mapLink"
      target="_blank"
      rel="noopener noreferrer"
      class="standort-link"
    >
      <!-- Edit: Use a styled span instead of nesting a button inside a link. -->
      <span class="standort-button">
        {{ page?.fields.routeButton }}
      </span>
    </a>
  </section>
  </div>
</template>
