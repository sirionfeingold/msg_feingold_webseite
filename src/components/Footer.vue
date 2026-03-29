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
          {{ settings?.fields.footerContactTitle }}
        </h4>
        <ul class="footer-list">
          <li>
            <span class="font-medium">
              {{ settings?.fields.footerKontaktEmailText }}
            </span>
            <a 
            :href="`mailto:${settings?.fields.footerEmail}`" 
            class="footer-link"
            > 
            {{ settings?.fields.footerEmail }}
          </a>
          </li>
          <li>
            <span class="font-medium">
              {{ settings?.fields.footerKontaktTelefonText }}
            </span>
            <a 
            :href="`tel:${settings?.fields.footerPhone}`" 
            class="footer-link"
            > 
            {{ settings?.fields.footerPhone }}
          </a>
          </li>
          <li><span class="font-medium">
            {{ settings?.fields.footerKontaktOrtText }}
          </span> {{ settings?.fields.footerLocation }}</li>
        </ul>
      </div>

      <!-- Navigation -->
      <div class="space-y-3">
        <h4 class="footer-title">
          {{ settings?.fields.footerNavTitle }}
        </h4>
        <ul class="footer-list">
          <li><router-link to="/" class="hover:underline">
            {{ settings?.fields.footerHomeLink }}
          </router-link></li>
          <li><router-link to="/unterricht" class="hover:underline">
            {{ settings?.fields.footerUnterrichtLink }}
          </router-link></li>
          <li><router-link to="/medien" class="hover:underline">
            {{ settings?.fields.footerMedienLink }}
          </router-link></li>
          <li><router-link to="/kontakt" class="hover:underline">
            {{ settings?.fields.footerKontaktLink }}
          </router-link></li>
        </ul>
      </div>

      <!-- Logo + Claim -->
      <div class="space-y-3">
        <h3 class="footer-logo">
          {{ settings?.fields.footerLogo }}
        </h3>
        <p class="footer-sentence">
          {{ settings?.fields.footerClaim }}
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }}
      {{ settings?.fields.footerCopyright }}
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadFooterPage } from '../api/wp'
import type { FooterPageFields, PageModel } from '../api/wp'

// Edit: Use a dedicated footer page model instead of raw ACF access.
const settings = ref<PageModel<FooterPageFields> | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    settings.value = await loadFooterPage()
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Events'
  } finally {
    loading.value = false
  }
})
</script>
