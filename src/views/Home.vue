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
  <div class="home-hero">
    <!-- HERO -->
    <div class="home-hero-inner">
      <h1 class="home-title">
        Musikschule in Bern<br />
        <span class="text-white drop-shadow-lg">Willkommen bei MSG Feingold</span>
      </h1>

      <p class="home-subtitle">
        Musik. Begeisterung. Erlebnis.
      </p>

      <div class="mt-8">
        <router-link to="/about">
          <button
            type="button"
            class="btn-primary"
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


<style src="../style/home.css"></style>
