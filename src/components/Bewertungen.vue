<template>
  <section class="bewertungen-section">
    <div class="bewertungen-inner">

      <!-- Überschrift -->
      <h2 class="bewertungen-title">
        {{ title ?? 'Bewertungen' }}
      </h2>

      <p v-if="loading" class="bewertungen-state">Lädt…</p>
      <p v-else-if="error" class="bewertungen-state">Fehler: {{ error }}</p>
      <p v-else-if="!bewertung.length" class="bewertungen-state">Noch keine Bewertungen vorhanden.</p>

      <div v-else class="bewertungen-list">
        <div
          v-for="t in bewertung"
          :key="t.name"
          class="bewertung-card"
        >
          <!-- Bewertungstext -->
          <p class="bewertung-text">
            “{{ t.text }}”
          </p>

          <!-- Sterne + Name -->
          <div class="bewertung-footer">
            <div class="bewertung-stars">
              <span v-for="i in t.stars" :key="i">★</span>
              <span v-for="i in 5 - t.stars" :key="'empty' + i" class="opacity-30">★</span>
            </div>
            <div class="bewertung-name">
              – {{ t.name }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadReviews } from '../api/wp'
import type { ReviewItem } from '../api/wp'

// Edit: Use the shared review type and expose explicit runtime states for this public feed.
const bewertung = ref<ReviewItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

defineProps<{
  title?: string
}>()

onMounted(async () => {
  try {
    bewertung.value = await loadReviews()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Fehler beim Laden der Bewertungen'
  } finally {
    loading.value = false
  }
})
</script>
