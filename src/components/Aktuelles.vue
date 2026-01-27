<!--Abschnitt: Aktuelles & Veranstaltungen-->
    
<template>
  <section class="aktuelles-section">
    <div class="aktuelles-inner">
      <!-- Überschrift -->
      <h2 class="aktuelles-title">
        {{ title }}
      </h2>

      <!-- Event-Vorschau -->
      <div class="aktuelles-grid">
        <div
          v-for="item in events"
          :key="item.title"
          class="event-card"
          @click="openModal(item)"
        >
          <p class="event-date">{{ item.date }}</p>
          <h3 class="event-title">{{ item.title }}</h3>
          <p class="event-desc">{{ item.description }}</p>
        </div>
      </div>

      <!-- Modal (Popup) -->
      <transition name="fade">
        <div
          v-if="selectedEvent"
          class="modal-overlay"
        >
          <div class="modal-box">
            <button
              @click="selectedEvent = null"
              class="modal-close"
            >
              &times;
            </button>

            <p class="modal-date">{{ selectedEvent.date }}</p>
            <h3 class="modal-title">{{ selectedEvent.title }}</h3>
            <p class="modal-desc" v-html="selectedEvent.description" />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadAktuelles } from '../api/wp'
import type { AktuellesEvent } from '../types/aktuelles'
const events = ref<AktuellesEvent[]>([])
const selectedEvent = ref<AktuellesEvent | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

  defineProps<{
    title: string
  }>()

  const openModal = (event: AktuellesEvent) => {
  selectedEvent.value = event
}

onMounted(async () => {
  try {
    events.value = await loadAktuelles()
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Events'
  } finally {
    loading.value = false
  }
})
</script>

