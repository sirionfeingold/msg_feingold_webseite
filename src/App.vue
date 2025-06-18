<!--
  App.vue – Hauptlayout der MSG Feingold Webanwendung

  Beschreibung:
  Diese Datei definiert die grundlegende Struktur und das Layout der gesamten Webseite.
  Sie enthält:
  – Header mit Navigation
  – Dynamischen Hauptbereich via <router-view>
  – Footer mit Jahreszahl

  Details:
  – Der Header ist transparent mit leichtem Blur und einem flexiblen Navigationsbereich.
  – Die Navigation enthält Router-Links zu allen Hauptseiten und ein Dropdown-Menü für den Shop.
  – Der Hauptinhalt wird über das Vue Router-System geladen.
  – Der Footer zeigt dynamisch das aktuelle Jahr an.

  Komponenten:
  – ShopDropdown.vue (eingebunden als <shop-dropdown />)

  Ziel:
  Einheitliches und responsives Layout für alle Seiten der MSG Feingold Plattform.
-->
<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-violet-50 to-orange-100 text-gray-800 flex flex-col">
    <!-- HEADER -->
    <header class="bg-white/30 backdrop-blur-md shadow-md border-b border-white/40 z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-wrap items-center justify-between gap-2">
        <!-- Logo und Titel -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1">
          <h1 class="text-2xl font-extrabold text-blue-600">MSG Feingold</h1>
          <h2 class="text-sm sm:text-base text-blue-500 font-medium">Musik Seminar Gesellschaft Bern</h2>
        </div>

        <!-- Navigation -->
        <nav class="flex flex-wrap justify-center sm:justify-end gap-4 text-base sm:text-lg font-medium">
          <router-link to="/" class="hover:text-blue-500 transition-colors">Home</router-link>
          <router-link to="/musikschule" class="hover:text-blue-500 transition-colors">Musikschule</router-link>
          <shop-dropdown />
          <router-link to="/kontakt" class="hover:text-blue-500">Kontakt</router-link>
          <router-link to="/konditionen" class="hover:text-blue-500">Konditionen</router-link>
          <router-link to="/about" class="hover:text-blue-500 transition-colors">About us</router-link>
        </nav>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-grow w-full">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="text-center text-sm text-gray-500 py-4">
      © {{ new Date().getFullYear() }} MSG Feingold & Co
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ShopDropdown from './components/ShopDropdown.vue'
</script>
