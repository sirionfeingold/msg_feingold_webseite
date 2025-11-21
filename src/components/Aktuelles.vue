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
  <section class="aktuelles-section">
    <div class="aktuelles-inner">
      <!-- Überschrift -->
      <h2 class="aktuelles-title">
        Aktuelles & Veranstaltungen
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

<script setup>
import { ref } from 'vue'

const selectedEvent = ref(null)
const openModal = (event) => {
  selectedEvent.value = event
}
/**
 * Hier kann man neue events hinzufügen
 * Anleitung:
 * nach der letzten } muss zuerst ein komma sein --> d.h. ,
 * danach kann ein neues event erstellt werden
 */
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

