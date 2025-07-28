<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-violet-50 to-orange-100 text-gray-800 flex flex-col">
    <!-- SIDEBAR -->
    <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = false" />

    <!-- HEADER -->
    <header class="bg-white/30 backdrop-blur-md shadow-md border-b border-white/40 z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        <!-- Logo und Titel -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1">
          <h1 class="text-2xl font-extrabold text-blue-600">MSG Feingold</h1>
          <h2 class="text-sm sm:text-base text-blue-500 font-medium">Musik Seminar Gesellschaft Bern</h2>
        </div>

        <!-- Burger-Button für Sidebar -->
        <button class="sm:hidden text-2xl text-blue-600" @click="sidebarOpen = true">☰</button>

        <!-- Desktop-Navigation (optional anzeigen) -->
        <nav class="hidden sm:flex gap-4 text-base sm:text-lg font-medium">
          <router-link to="/" class="hover:text-blue-500">Home</router-link>
          <router-link to="/musikschule" class="hover:text-blue-500">Musikschule</router-link>
          <shop-dropdown />
          <router-link to="/media" class="hover:text-blue-500">Media</router-link>
          <router-link to="/kontakt" class="hover:text-blue-500">Kontakt</router-link>
          <router-link to="/konditionen" class="hover:text-blue-500">Konditionen</router-link>
          <router-link to="/about" class="hover:text-blue-500">About us</router-link>
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
import Sidebar from './components/Sidebar.vue'
import ShopDropdown from './components/ShopDropdown.vue'

const sidebarOpen = ref(false)
</script>
