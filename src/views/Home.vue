<!--Home.vue – Startseite von MSG Feingold-->
  

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Aktuelles from '../components/Aktuelles.vue'
import Bewertungen from '../components/Bewertungen.vue'
import { loadHomePage } from '../api/wp'
import type { HomePageFields, PageModel } from '../api/wp'

// Edit: Use a dedicated home page model instead of the raw WP page shape.
const page = ref<PageModel<HomePageFields> | null>(null)
const aktuellesTitle = ref<string>('') // wird an Aktuelles gegeben
const loading = ref(true)
const error = ref<string | null>(null)
const reviewsTitle = ref<string>('Bewertungen')

onMounted(async () => {
  try {
    page.value = await loadHomePage()
    aktuellesTitle.value = page.value.fields.aktuellesTitle
    reviewsTitle.value = page.value.fields.reviewTitle
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Startseite'
  } finally {
    loading.value = false
  }
})
</script>


<template>

  <!-- Loading -->
   <div v-if="loading" class="about-wrapper">
    <div class="about-inner">Lädt…</div>
  </div>

  <!-- Error -->
   <div v-else-if="error" class="about-wrapper">
    <div class="about-inner">Fehler: {{ error }}</div>
  </div>

  <div v-else-if="page" class="home-hero">
    <!-- HERO -->
    <div class="home-hero-inner">
      <h1 class="home-title">
        {{ page.fields.homeTitle }}<br />
        <span class="text-white drop-shadow-lg">{{ page.fields.homeSecondTitle }}</span>
      </h1>

      <p class="home-subtitle">
        {{ page.fields.homeSubtitle }}
      </p>

      <div class="mt-8">
        <router-link to="/about">
          <button
            type="button"
            class="btn-primary"
          >
            {{ page.fields.moreButton }}
          </button>
        </router-link>
      </div>
    </div>

    <!-- Aktuelles -->
    <Aktuelles :title="aktuellesTitle"/>
    <Bewertungen :title="reviewsTitle"/>
  </div>
</template>


<style src="../style/home.css"></style>
