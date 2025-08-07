<!--
  Home.vue – Startseite von MSG Feingold

  Beschreibung:
  Diese Datei definiert die Startseite der Website. Sie empfängt die Besucher:innen mit einem lebendigen Farbverlauf,
  einer auffälligen Überschrift und einem einladenden Call-to-Action.

  Inhalt:
  - Begrüßung mit markantem Gradient-Text im Apple-inspirierten Stil
  - Slogan, der die Werte der Organisation betont
  - "Mehr erfahren"-Button zur Weiterleitung auf die About-Seite
  - Integration der Komponente <Aktuelles /> für Neuigkeiten und Events

  Ziel:
  Nutzer:innen visuell begeistern, zentrale Identität kommunizieren und direkt zu weiteren Inhalten führen.

  Hinweis:
  Die Komponente <Aktuelles /> muss im Komponentenordner `components/` liegen und wichtige Veranstaltungen enthalten.
  -->
  
<script setup>
import { ref } from 'vue'
import Aktuelles from '../components/Aktuelles.vue'
import Bewertungen from '../components/Bewertungen.vue'

const showAktuelles = ref(false)
</script>

<template>
  <div class="w-full bg-gradient-to-br from-red-300 via-amber-200 to-blue-200 dark:from-violet-900 dark:via-indigo-950 dark:to-purple-900 text-gray-900 py-20">
    <!-- HERO -->
    <div class="text-center px-6 sm:px-10 py-16">
      <h1 class="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-snug text-center bg-gradient-to-r from-red-500 via-orange-400 to-fuchsia-600 text-transparent bg-clip-text drop-shadow-md px-4">
        Musikschule in Bern<br />
        <span class="text-white drop-shadow-lg">Willkommen bei MSG Feingold</span>
      </h1>

      <p class="mt-4 text-lg sm:text-xl text-orange-800 dark:text-orange-500">
        Musik. Begeisterung. Erlebnis.
      </p>

      <div class="mt-8">
        <router-link to="/about">
          <button
            type="button"
            class="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Mehr erfahren
          </button>
        </router-link>
      </div>
    </div>

    <!-- Aktuelles -->
    <Aktuelles />
    <Bewertungen />
  </div>
</template>


<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
