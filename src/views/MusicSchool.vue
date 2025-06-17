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
