<!--Abschnitt: Aktuelles & Veranstaltungen-->
    
<template>
  <section class="aktuelles-section">
    <div class="aktuelles-inner">
      <!-- Überschrift -->
      <h2 class="aktuelles-title">
        {{ title }}
      </h2>

      <!-- Edit: Surface feed loading so an empty state is not mistaken for missing content. -->
      <p v-if="loading" class="event-desc">Lädt…</p>
      <!-- Edit: Surface feed failures explicitly because this block depends on runtime CMS data. -->
      <p v-else-if="error" class="event-desc">Fehler: {{ error }}</p>
      <!-- Edit: Keep the empty state distinct from loading and error conditions. -->
      <p v-else-if="!events.length" class="event-desc">Zurzeit gibt es keine Einträge.</p>

      <div v-else class="aktuelles-content">
        <div
          class="event-card event-card-featured"
          role="button"
          tabindex="0"
          @keydown.enter="openModal(events[0])"
          @keydown.space.prevent="openModal(events[0])"
          @click="openModal(events[0])"
        >
          <p class="event-date">{{ events[0].date }}</p>
          <h3 class="event-title">{{ events[0].title }}</h3>
          <p class="event-desc">{{ events[0].description }}</p>
          <a
            v-if="events[0].link"
            :href="events[0].link"
            target="_blank"
            rel="noopener noreferrer"
            class="event-link"
            @click.stop
          >
            Mehr Infos
          </a>
        </div>

        <div v-if="remainingEvents.length" class="aktuelles-grid">
          <div
            v-for="item in remainingEvents"
            :key="item.title"
            class="event-card"
            role="button"
            tabindex="0"
            @keydown.enter="openModal(item)"
            @keydown.space.prevent="openModal(item)"
            @click="openModal(item)"
          >
            <p class="event-date">{{ item.date }}</p>
            <h3 class="event-title">{{ item.title }}</h3>
            <p class="event-desc">{{ item.description }}</p>
            <a
              v-if="item.link"
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="event-link"
              @click.stop
            >
              Mehr Infos
            </a>
          </div>
        </div>
      </div>

      <!-- Modal (Popup) -->
      <transition name="fade">
        <div
          v-if="selectedEvent"
          class="modal-overlay"
          role="presentation"
          @click.self="closeModal"
        >
          <div
            class="modal-box"
            role="dialog"
            aria-modal="true"
            :aria-label="selectedEvent.title"
          >
            <button
              ref="modalCloseButton"
              type="button"
              aria-label="Schließen"
              @click="closeModal"
              class="modal-close"
            >
              &times;
            </button>

            <p class="modal-date">{{ selectedEvent.date }}</p>
            <h3 class="modal-title">{{ selectedEvent.title }}</h3>
            <!-- Edit: Render public WP content as text here to avoid injecting unsanitized HTML. -->
            <p class="modal-desc">{{ selectedEvent.description }}</p>
            <a
              v-if="selectedEvent?.link"
              :href="selectedEvent.link"
              target="_blank"
              rel="noopener noreferrer"
              class="event-link"
              >
              Mehr Infos
            </a>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { loadAktuelles } from '../api/wp'
import type { AktuellesEvent } from '../types/aktuelles'
// Edit: Track public feed state explicitly so the template can distinguish loading, errors and empty data.
const events = ref<AktuellesEvent[]>([])
const selectedEvent = ref<AktuellesEvent | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const remainingEvents = computed(() => events.value.slice(1))
const modalCloseButton = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null

defineProps<{
  title: string
}>()

const openModal = (event: AktuellesEvent) => {
  previousFocus = document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null
  selectedEvent.value = event
}

const closeModal = () => {
  selectedEvent.value = null
  nextTick(() => previousFocus?.focus())
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal()
}

watch(selectedEvent, async (event) => {
  document.body.style.overflow = event ? 'hidden' : ''
  if (event) {
    await nextTick()
    modalCloseButton.value?.focus()
  }
})

onMounted(async () => {
  window.addEventListener('keydown', handleEscape)
  try {
    events.value = await loadAktuelles()
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Events'
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>
