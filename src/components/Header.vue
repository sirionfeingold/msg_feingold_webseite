<template>
    <!-- SIDEBAR -->
    <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = false" />
    <header class="bg-white/30 dark:bg-blue-950 backdrop-blur-md shadow-md border-b border-white/40 dark:border-blue-950 z-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        <!-- Logo und Titel -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-1">
          <h1 class="text-2xl font-extrabold text-blue-600 dark:text-white/80">MSG Feingold</h1>
          <h2 class="text-sm sm:text-base text-blue-500 dark:text-white/80 font-medium">Musik Seminar Gesellschaft Bern</h2>
        </div>

        <!-- Burger-Button für Sidebar -->
        <button class="lg:hidden text-2xl text-blue-600" @click="sidebarOpen = true">☰</button>

        <!-- Desktop-Navigation (optional anzeigen) -->
        <nav class="hidden lg:flex gap-4 text-base lg:text-lg font-medium dark:text-white/80">

          <router-link to="/" class="hover:text-blue-500">Home</router-link>
          <router-link to="/musikschule" class="hover:text-blue-500">Unterricht</router-link>
          <ShopDropDown />
          <router-link to="/media" class="hover:text-blue-500">Medien</router-link>
          <router-link to="/kontakt" class="hover:text-blue-500">Kontakt</router-link>
          <router-link to="/konditionen" class="hover:text-blue-500">Konditionen</router-link>
          <router-link to="/about" class="hover:text-blue-500">Über uns</router-link>
        </nav>
      </div>
    </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ShopDropDown from './ShopDropDown.vue';
import Sidebar from './Sidebar.vue';
const sidebarOpen = ref(false)
</script>