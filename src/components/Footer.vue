<template>

   <div v-if="loading" class="about-wrapper">
    <div class="about-inner">Lädt…</div>
  </div>

   <div v-else-if="error" class="about-wrapper">
    <div class="about-inner">Fehler: {{ error }}</div>
  </div>

  <footer v-else-if="settings" class="footer-wrapper">
    <div class="footer-inner">

      <!-- Kontakt -->
      <div class="space-y-3">
        <h4 class="footer-title">
          {{ settings?.acf?.footer_contact_title }}
        </h4>
        <ul class="footer-list">
          <li>
            <span class="font-medium">
              {{ settings?.acf?.footer_kontakt_email_text }}
            </span>
            <a 
            :href="`mailto:${settings?.acf?.footer_email}`" 
            class="footer-link"
            > 
            {{ settings?.acf?.footer_email }}
          </a>
          </li>
          <li>
            <span class="font-medium">
              {{ settings?.acf?.footer_kontakt_telefon_text }}
            </span>
            <a 
            :href="`tel:${settings?.acf?.footer_phone}`" 
            class="footer-link"
            > 
            {{ settings?.acf?.footer_phone }}
          </a>
          </li>
          <li><span class="font-medium">
            {{ settings?.acf?.footer_kontakt_ort_text }}
          </span> {{ settings?.acf?.footer_location }}</li>
        </ul>
      </div>

      <!-- Navigation -->
      <div class="space-y-3">
        <h4 class="footer-title">
          {{ settings?.acf?.footer_nav_title }}
        </h4>
        <ul class="footer-list">
          <li><router-link to="/" class="hover:underline">
            {{ settings?.acf?.footer_home_link }}
          </router-link></li>
          <li><router-link to="/unterricht" class="hover:underline">
            {{ settings?.acf?.footer_unterricht_link }}
          </router-link></li>
          <li><router-link to="/medien" class="hover:underline">
            {{ settings?.acf?.footer_medien_link }}
          </router-link></li>
          <li><router-link to="/kontakt" class="hover:underline">
            {{ settings?.acf?.footer_kontakt_link }}
          </router-link></li>
        </ul>
      </div>

      <!-- Logo + Claim -->
      <div class="space-y-3">
        <h3 class="footer-logo">
          {{ settings?.acf?.footer_logo }}
        </h3>
        <p class="footer-sentence">
          {{ settings?.acf?.footer_claim }}
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }}
      {{ settings?.acf?.footer_copyright }}
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadPage } from '../api/wp'

const settings = ref<any>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    settings.value = await loadPage('footer')
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Events'
  } finally {
    loading.value = false
  }
})
</script>

