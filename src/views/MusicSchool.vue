<!--
  Musikschule.vue – Übersicht über alle angebotenen Instrumentalfächer

  Beschreibung:
  Diese View zeigt eine ansprechend gestaltete Übersicht aller Instrumente,
  die an der MSG Feingold unterrichtet werden. Jedes Instrument wird als
  farbige, klickbare Box dargestellt und führt auf eine eigene Detailseite.

  Inhalte:
  – Überschrift & Beschreibung
  – Dynamisch generierte Liste mit Instrumenten und Slug-basierter Navigation
  – Farbverläufe für visuelle Differenzierung
  – Responsive Grid-Layout mit eleganten Hover-Effekten

  Ziel:
  Nutzer:innen erhalten einen schnellen, ästhetischen Überblick über das Angebot
  und können sich intuitiv zum gewünschten Fach weiterleiten lassen.
  -->

<template>
  <div class="musikschule-wrapper">
    <div class="musikschule-inner">

      <!-- Überschrift -->
      <h1 class="musikschule-title">
         Instrumentalunterricht bei MSG Feingold
        </h1>


      <!-- Beschreibung -->
      <p class="musikschule-desc">
        Wir bieten individuellen Musikunterricht auf höchstem Niveau – für Anfänger:innen, Fortgeschrittene und Profis.
      </p>

      <!-- Instrumentenliste mit Links -->
      <div class="instrument-grid">
        <router-link
          v-for="(instrument, index) in instruments"
          :key="index"
          :to="`/instrument/${instrument.slug}`"
          class="instrument-card"
          :class="instrument.gradient"
        >
          <h2 class="instrument-name">{{ instrument.name }}</h2>
          <p class="instrument-link">Mehr erfahren</p>
        </router-link>
      </div>
    </div>
   <section class="standort-section">
    <h2 class="standort-title">Standort & Anfahrt</h2>
    <p class="standort-text">
      MSG Feingold<br>
      Zibelgässli 18, 3011 Bern<br>
      (direkt bei der Zytglogge / dem historischen Uhrturm)
    </p>
    <div class="standort-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2761.192005075683!2d7.44765181558627!3d46.94804207914704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478e3913c30ca1b3%3A0xedaf8ab3ed5a5e81!2sZibelg%C3%A4ssli%2018%2C%203011%20Bern!5e0!3m2!1sde!2sch!4v1718828000000!5m2!1sde!2sch"
        class="w-full h-full"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <a
      href="https://www.google.com/maps/dir/?api=1&destination=Zibelg%C3%A4ssli+18,+3011+Bern"
      target="_blank"
      class="standort-link"
    >
    <button type="submit"
            class="standort-button"
          >
      Route planen
    </button>
    </a>
  </section>
  </div>
</template>

<script setup>
// Instrumente mit slug und Farbverläufen
const instruments = [
  { name: "Gesang", slug: "gesang", gradient: "bg-gradient-to-br from-pink-500 to-rose-400" },
  { name: "Klavier", slug: "klavier", gradient: "bg-gradient-to-br from-amber-400 to-orange-500" },
  { name: "Gitarre", slug: "gitarre", gradient: "bg-gradient-to-br from-yellow-400 to-yellow-600" },
  { name: "Blockflöte", slug: "blockfloete", gradient: "bg-gradient-to-br from-lime-400 to-emerald-500" },
  { name: "Klarinette", slug: "klarinette", gradient: "bg-gradient-to-br from-cyan-400 to-sky-500" },
  { name: "Saxophon", slug: "saxophon", gradient: "bg-gradient-to-br from-violet-500 to-indigo-600" },
  { name: "Violine", slug: "violine", gradient: "bg-gradient-to-br from-rose-500 to-pink-600" },
  { name: "Violoncello", slug: "violoncello", gradient: "bg-gradient-to-br from-red-400 to-orange-600" }
];
</script>
