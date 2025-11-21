<template>
    <!-- SIDEBAR -->
    <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = false" />
    <header class="header-wrapper">
      <div class="header-inner">

        <!-- Logo und Titel -->
        <div class="header-brand">
          <h1 class="header-logo">MSG Feingold</h1>
          <h2 class="header-subtitle">Musik Seminar Gesellschaft Bern</h2>
        </div>

        <!-- Burger-Button für Sidebar -->
        <button class="header-burger" @click="sidebarOpen = true">☰</button>

        <!-- Desktop-Navigation (optional anzeigen) -->
        <nav class="header-nav">

          <router-link to="/" class="header-nav-link">Home</router-link>
          <router-link to="/unterricht" class="header-nav-link">Unterricht</router-link>
          <ShopDropDown />
          <router-link to="/medien" class="header-nav-link">Medien</router-link>
          <router-link to="/kontakt" class="header-nav-link">Kontakt</router-link>
          <router-link to="/konditionen" class="header-nav-link">Konditionen</router-link>
          <router-link to="/about" class="header-nav-link">Über uns</router-link>
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