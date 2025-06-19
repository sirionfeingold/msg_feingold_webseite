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
          class="p-6 rounded-2xl shadow-xl bg-gradient-to-br from-orange-200 via-pink-100 to-rose-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div class="mb-4">
            <p class="text-sm font-medium text-orange-700 uppercase tracking-wide">{{ item.date }}</p>
          </div>
          <h3 class="text-xl font-bold text-pink-700 mb-2">
            {{ item.title }}
          </h3>
          <p class="text-gray-700 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const events = [
  {
    title: 'Sommerkonzert mit dem MSG Kammerorchester',
    date: '6. / 7. September 2025',
    description: 'Ein festliches Programm mit Sopran Solistin Esther Feingold und Dirigent Osvaldo Ovejero.'
  },
  {
    title: 'Offene Probestunden',
    date: 'Jederzeit',
    description: 'Lerne unsere Lehrpersonen kennen und buche eine kostenlose Probestunde.'
  },
  {
    title: 'CD-Neuerscheinung: "Serenade"',
    date: 'ab sofort erhältlich',
    description: 'Neue romantische Werke für Cello & Gesang – erhältlich im Shop.'
  }
]
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
