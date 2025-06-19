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
  <div class="min-h-screen w-full bg-gradient-to-br from-white via-rose-50 to-orange-100 px-6 py-20">
    <div class="max-w-6xl mx-auto text-center space-y-16">

      <!-- Überschrift -->
      <h1 class="leading-tight text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 via-orange-400 to-purple-600 text-transparent bg-clip-text drop-shadow-lg">
        Instrumentalunterricht bei MSG Feingold
      </h1>

      <!-- Beschreibung -->
      <p class="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
        Wir bieten individuellen Musikunterricht auf höchstem Niveau – für Anfänger:innen, Fortgeschrittene und Profis.
      </p>

      <!-- Instrumentenliste mit Links -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <router-link
          v-for="(instrument, index) in instruments"
          :key="index"
          :to="`/instrument/${instrument.slug}`"
          class="block p-6 rounded-2xl shadow-xl transition-transform duration-300 hover:-translate-y-1 text-left text-white no-underline"
          :class="instrument.gradient"
        >
          <h2 class="text-2xl font-semibold mb-2">{{ instrument.name }}</h2>
          <p class="text-white/90 text-sm">Mehr erfahren</p>
        </router-link>
      </div>
    </div>
   <section class="mt-20 text-center">
    <h2 class="text-2xl font-bold text-orange-600 mb-4">Standort & Anfahrt</h2>
    <p class="text-gray-700 mb-4">
      MSG Feingold<br>
      Zibelgässli 18, 3011 Bern<br>
      (direkt bei der Zytglogge / dem historischen Uhrturm)
    </p>
    <div class="max-w-3xl mx-auto aspect-video rounded-xl overflow-hidden shadow">
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
      class="inline-block mt-4 text-orange-600 hover:text-orange-800 underline font-medium"
    >
      Route planen
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

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
