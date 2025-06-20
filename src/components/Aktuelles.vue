<!--
    Abschnitt: Aktuelles & Veranstaltungen

    Beschreibung:
    Dieser Bereich zeigt aktuelle Ereignisse, Konzerte, Neuerscheinungen oder Ankündigungen.
    Die Events werden im Template aus einem Array (unten im Script) generiert und in stilvollen Boxen angezeigt.

    Anpassung:
    - Neue Events können einfach im `events`-Array hinzugefügt werden.
    - Jedes Event benötigt: title, date, description.
    - Optional könnte man später Bilder oder Buttons ergänzen.
  -->
    
<template>
  <section class="py-24 px-6 min-h-screen w-full flex items-center justify-center bg-gradient-to-bl from-blue-400 via-orange-200 to-white text-gray-900">
    <div class="max-w-6xl mx-auto text-center space-y-14">
      <!-- Überschrift -->
      <h2 class="leading-tight text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-red-500 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
        Aktuelles & Veranstaltungen
      </h2>

      <!-- Event-Boxen -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div
          v-for="item in events"
          :key="item.title"
          class="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-orange-200 via-pink-100 to-rose-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          @click="openModal(item)"
        >
          <p class="text-sm font-medium text-orange-700 uppercase tracking-wide">{{ item.date }}</p>
          <h3 class="text-xl font-bold text-pink-700 mb-2">{{ item.title }}</h3>
          <p class="text-gray-700 leading-relaxed line-clamp-3">{{ item.description }}</p>
        </div>
      </div>

      <!-- Modal -->
      <transition name="fade">
        <div v-if="selectedEvent" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 relative">
            <button @click="selectedEvent = null" class="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">&times;</button>
            <p class="text-sm text-orange-600 mb-2">{{ selectedEvent.date }}</p>
            <h3 class="text-2xl font-bold text-pink-700 mb-4">{{ selectedEvent.title }}</h3>
            <p class="text-gray-800 text-left whitespace-pre-line">{{ selectedEvent.description }}</p>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const events = [
  {
    title: 'Sommerkonzert mit dem MSG Kammerorchester',
    date: '6. / 7. September 2025',
    description: `Ein festliches Programm mit Sopran Solistin Esther Feingold und Dirigent Osvaldo Ovejero.
    Ort: Bern
    Beginn: jeweils 19:30 Uhr
    Eintritt frei, Kollekte`
  },
  {
    title: 'Offene Probestunden',
    date: 'Jederzeit',
    description: `Lerne unsere Lehrpersonen kennen und buche eine kostenlose Probestunde.
    Einfach Kontaktformular ausfüllen oder direkt anrufen.`
  },
  {
    title: 'CD-Neuerscheinung: "Serenade"',
    date: 'ab sofort erhältlich',
    description: `Neue romantische Werke für Cello & Gesang – komponiert und interpretiert von Esther Feingold & Osvaldo Ovejero.
    Erhältlich im Shop oder bei unseren Konzerten.`
  }
]

const selectedEvent = ref(null)
const openModal = (event) => {
  selectedEvent.value = event
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>