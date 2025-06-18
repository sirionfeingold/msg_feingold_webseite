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
import Aktuelles from '../components/Aktuelles.vue';
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-400 via-amber-200 to-blue-600 text-gray-900">
    <div class="text-center px-6 sm:px-10">
      <!-- Bunte Überschrift -->
      <h1
      class="leading-tight text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-orange-400 to-fuchsia-600 text-transparent bg-clip-text
         drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
         >
         Willkommen bei MSG Feingold
        </h1>


      <!-- Untertitel -->
      <p class="mt-4 text-lg sm:text-xl text-orange-800">
        Musik. Begeisterung. Erlebnis.
      </p>

      <!-- Call to Action -->
      <div class="mt-8">
        <router-link
        to="/about"
        
         >
         <div class="text-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Mehr erfahren
          </button> </div>
        </router-link>
      </div>
    </div>
  </div>

  <!-- Aktuelles Abschnitt -->
  <Aktuelles />
</template>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
