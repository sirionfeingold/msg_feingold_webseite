<!--
  Konditionen.vue – Übersicht der Unterrichtsbedingungen

  Beschreibung:
  Diese View zeigt die Vertrags- und Teilnahmebedingungen der Musikschule MSG Feingold.
  Sie informiert transparent über Regelungen zur Anmeldung, Bezahlung, Absenz und Kündigung.

  Funktionen:
  - Überschrift und Einleitung mit stilvollem Farbverlauf und Responsive Layout
  - Klar strukturierte Aufzählung der Konditionen als Liste (ol)
  - Visuell hervorgehobener Hintergrund mit Farbverläufen und Schatten
  - Kontaktmöglichkeiten per E-Mail und Telefon im Footer

  Ziel:
  Besucher:innen sollen sich einfach und freundlich über den Ablauf des Unterrichts informieren können –
  inklusive verbindlicher Bedingungen zur Planung und Fairness auf beiden Seiten.
  -->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-orange-50 to-rose-100 text-gray-800">
    <div class="max-w-3xl mx-auto space-y-12">

      <!-- Überschrift -->
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text drop-shadow">
        Unterricht & Konditionen
      </h1>

      <!-- Einführung -->
      <p class="text-lg text-center text-gray-700">
        Unsere Bedingungen schaffen Klarheit für beide Seiten. Hier findest du alle zentralen Infos zu Vertragsdauer, Zahlung und Unterrichtsausfall.
      </p>

      <!-- Konditionen-Liste -->
      <div class="space-y-8">
        <ol class="list-decimal list-inside text-gray-800 space-y-4 text-base leading-relaxed bg-white/60 rounded-xl p-6 shadow-md backdrop-blur-md">
          <li>
            Der Unterricht beginnt mit dem Eintrittsdatum und erfolgt mindestens 10 Lektionen pro Quartal oder 20 Lektionen pro Semester.
          </li>
          <li>
            Die Kündigung des Vertrages muss 1 Monat vor Ablauf der 10 oder 20 Lektionen schriftlich erfolgen, andernfalls verlängert sich der Vertrag automatisch.
          </li>
          <li>
            Die Zahlung (für 10 oder 20 Lektionen) erfolgt vor dem ersten Unterrichtstermin im Voraus.
          </li>
          <li>
            Die Lektionen werden in der Regel wöchentlich erteilt.
          </li>
          <li>
            Sollte der Unterricht seitens der Lehrperson abgesagt werden, verpflichtet sie sich, die Lektion nachzuholen.
          </li>
          <li>
            Die Abmeldung einer Lektion muss mindestens 24 Stunden vor dem Termin erfolgen, sonst gilt sie als erteilt.
          </li>
          <li>
            Bei frühzeitigem Studienabbruch (z. B. Krankheit, Pause, Auslandaufenthalt) erfolgt keine Rückerstattung.
          </li>
          <li>
            Nicht bezogene Lektionen bleiben maximal ein Jahr ab dem aktuellen Quartal oder Semester gültig. Danach erlischt der Anspruch.
          </li>
        </ol>
      </div>

      <!-- Kontaktinfo -->
      <div class="text-sm text-gray-600 mt-8 text-center space-y-2">
        <p>
          Bei Fragen kontaktiere uns gerne:
        </p>
        <p>
          <a
            href="mailto:email@msgfeingold.ch"
            class="text-orange-600 hover:text-orange-700 underline font-medium"
          >
            email@msgfeingold.ch
          </a>
          <br />
          <a
            href="tel:+41313113251"
            class="text-orange-600 hover:text-orange-700 underline font-medium"
          >
            031 311 32 51
          </a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
// keine Logik nötig
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
