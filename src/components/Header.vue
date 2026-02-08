<template>
    <!-- SIDEBAR -->
    <Sidebar 
    :isOpen="sidebarOpen" 
    :nav="page?.acf"
    @toggle="sidebarOpen = false" 
    />

    <header class="header-wrapper">
      <div class="header-inner">

        <!-- Logo und Titel -->
        <div class="header-brand">
          <h1 class="header-logo">
            {{ page?.acf?.header_logo }}
          </h1>
          <h2 class="header-subtitle">
            {{ page?.acf?.header_subtitle }}
          </h2>
        </div>

        <!-- Burger-Button für Sidebar -->
        <button class="header-burger" @click="sidebarOpen = true">☰</button>

        <!-- Desktop-Navigation (optional anzeigen) -->
        <nav class="header-nav">

          <router-link to="/" class="header-nav-link">
            {{ page?.acf?.header_home_text }}
          </router-link>
          <router-link to="/unterricht" class="header-nav-link">
            {{ page?.acf?.header_unterricht_text }}
          </router-link>
          <ShopDropDown />
          <router-link to="/medien" class="header-nav-link">
            {{ page?.acf?.header_medien_text }}
          </router-link>
          <router-link to="/kontakt" class="header-nav-link">
            {{ page?.acf?.header_kontakt_text }}
          </router-link>
          <router-link to="/konditionen" class="header-nav-link">
            {{ page?.acf?.header_konditionen_text }}
          </router-link>
          <router-link to="/about" class="header-nav-link">
            {{ page?.acf?.header_about_text }}
          </router-link>
        </nav>
      </div>
    </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { loadPage } from '../api/wp';
import ShopDropDown from './ShopDropDown.vue';
import Sidebar from './Sidebar.vue';

const sidebarOpen = ref(false)
const page = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
      page.value = await loadPage('header') // slug aus WP
    } catch (e: any) {
      error.value = e?.message ?? 'Fehler beim Laden'
    } finally {
      loading.value = false
    }
  })

</script>