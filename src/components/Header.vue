<template>
    <div v-if="error" class="px-4 py-2 text-sm text-red-600 text-center">
      <!-- Edit: Surface header loading failures so a broken public CMS page does not fail silently. -->
      {{ error }}
    </div>
    <!-- SIDEBAR -->
    <Sidebar 
    :isOpen="sidebarOpen" 
    :nav="page?.fields"
    @toggle="sidebarOpen = false" 
    />

    <header class="header-wrapper">
      <div class="header-inner">

        <!-- Logo und Titel -->
        <div class="header-brand">
          <h1 class="header-logo">
            {{ page?.fields.headerLogo }}
          </h1>
          <h2 class="header-subtitle">
            {{ page?.fields.headerSubtitle }}
          </h2>
        </div>

        <!-- Burger-Button für Sidebar -->
        <button class="header-burger" @click="sidebarOpen = true">☰</button>

        <!-- Desktop-Navigation (optional anzeigen) -->
        <nav class="header-nav">

          <router-link to="/" class="header-nav-link">
            {{ page?.fields.headerHomeText }}
          </router-link>
          <router-link to="/unterricht" class="header-nav-link">
            {{ page?.fields.headerUnterrichtText }}
          </router-link>
          <ShopDropDown />
          <router-link to="/medien" class="header-nav-link">
            {{ page?.fields.headerMedienText }}
          </router-link>
          <router-link to="/kontakt" class="header-nav-link">
            {{ page?.fields.headerKontaktText }}
          </router-link>
          <router-link to="/konditionen" class="header-nav-link">
            {{ page?.fields.headerKonditionenText }}
          </router-link>
          <router-link to="/about" class="header-nav-link">
            {{ page?.fields.headerAboutText }}
          </router-link>
        </nav>
      </div>
    </header>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { loadHeaderPage } from '../api/wp'
import type { HeaderPageFields, PageModel } from '../api/wp'
import ShopDropDown from './ShopDropDown.vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)
// Edit: Use a dedicated header page model instead of raw ACF access.
const page = ref<PageModel<HeaderPageFields> | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
    try {
      page.value = await loadHeaderPage()
    } catch (e: unknown) {
      // Edit: Narrow unknown errors instead of relying on `any` in the header fetch path.
      error.value = e instanceof Error ? e.message : 'Fehler beim Laden'
    } finally {
      loading.value = false
    }
  })

</script>
