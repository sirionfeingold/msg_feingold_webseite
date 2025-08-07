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
  <section class="py-20 px-4 w-full bg-gradient-to-bl text-gray-900">
    <div class="max-w-6xl mx-auto text-center space-y-12">
      <!-- Überschrift -->
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-500 to-green-400 text-transparent bg-clip-text drop-shadow-md">
        Aktuelles & Veranstaltungen
      </h2>

      <!-- Event-Vorschau -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in events"
          :key="item.title"
          class="bg-white/80 dark:bg-white/70 backdrop-blur rounded-3xl p-5 transition-all hover:scale-[1.02] cursor-pointer shadow-md hover:shadow-xl hover:scale-105 duration-300 ease-in-out"
          @click="openModal(item)"
        >
          <p class="text-sm font-medium text-orange-600 dark:text-blue-900 uppercase mb-1">{{ item.date }}</p>
          <h3 class="text-lg font-bold text-pink-700">{{ item.title }}</h3>
          <p class="text-gray-700 mt-2 line-clamp-3">{{ item.description }}</p>
        </div>
      </div>

      <!-- Modal (Popup) -->
      <transition name="fade">
        <div
          v-if="selectedEvent"
          class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
        >
          <div class="bg-white dark:bg-gray-300 rounded-2xl shadow-2xl p-8 max-w-xl w-full relative">
            <button
              @click="selectedEvent = null"
              class="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            <p class="text-sm text-orange-600 dark:text-blue-900 mb-2">{{ selectedEvent.date }}</p>
            <h3 class="text-2xl font-bold text-pink-700 mb-4">{{ selectedEvent.title }}</h3>
            <p class="text-gray-800 text-left whitespace-pre-line" v-html="selectedEvent.description" />
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const selectedEvent = ref(null)
const openModal = (event) => {
  selectedEvent.value = event
}

const events = [
  {
    title: 'Serenadenkonzert mit dem MSG Kammerorchester',
    date: '6. / 7. September 2025',
    description: `Ein festliches Programm mit Sopran Solistin Esther Feingold und Dirigent Osvaldo Ovejero.
Datum / Ort: am 6. September um 19:30 Heiliggeistkirche Bern, am 7. September um 17:00 Kirche Oberwangen bei Bern.
Eintritt frei, Kollekte.
<a href="https://osvaldo-ovejero.ch/musik-symphonie-global-msg-kammerorchester-bern/" target="_blank" class="text-blue-600 underline hover:text-blue-800">Mehr Infos</a>`
  },
  {
    title: 'Schnupperstunden',
    date: 'Jederzeit möglich',
    description: `Lerne unsere Lehrpersonen kennen und buche eine Probestunde.
Einfach Kontaktformular ausfüllen oder direkt anrufen.`
  },
  {
    title: 'CD-Neuerscheinung: "Serenade"',
    date: 'Ab sofort erhältlich',
    description: `Neue romantische Werke für Cello & Gesang – komponiert und interpretiert von Esther Feingold & Osvaldo Ovejero.
Erhältlich im Shop oder bei unseren Konzerten.`
  }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
