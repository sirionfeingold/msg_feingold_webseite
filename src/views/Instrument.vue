<!--
  Instrument.vue – Detailansicht für ein einzelnes Instrument

  Beschreibung:
  Diese View-Komponente zeigt die Detailseite eines bestimmten Instruments aus dem Unterrichtsangebot
  der Musikschule MSG Feingold.

  Funktionen:
  - Dynamisches Routing via Slug (z. B. /instrumente/gesang)
  - Anzeige von:
    - Instrumentenname (mit Farbverlauf)
    - Bild des Instruments (mit Größenlimit & Hover-Animation)
    - Beschreibungstext
    - Call-to-Action Button zur Kontaktseite (für Probestunde)

  Quelle der Daten:
  - Die Instrumenteninfos stammen aus der Datei: /data/instrumentData.ts

  Ziel:
  Nutzer:innen erhalten motivierende Informationen zu jedem Instrument
  und können direkt eine Probestunde anfragen.

  Hinweis:
  Bilder werden responsiv begrenzt (max-h-[500px]) und visuell hervorgehoben.
  -->
  
<template>
  <div class="instrument-wrapper">
    <div class="instrument-container">

      <!-- Titel -->
      <h1 class="instrument-title">
        {{ instrument?.name }}
      </h1>

      <!-- Bild -->
      <img
        v-if="instrument?.image"
        :src="instrument.image"
        :alt="instrument.name"
        class="w-full max-w-xl max-h-[500px] object-contain rounded-3xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
      />

      <!-- Beschreibung -->
      <p class="instrument-description">
        {{ instrument?.description }}
      </p>

      <!-- Call to Action -->
      <router-link
        to="/kontakt"
        class="instrument-button"
      >
        Probestunde vereinbaren
      </router-link>
      
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { instruments } from '../data/instrumentData'

const route = useRoute()
const instrument = instruments.find(i => i.slug === route.params.name)
</script>


