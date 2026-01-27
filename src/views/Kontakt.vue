<!-- Kontakt.vue – Probestunde & Kontaktformular -->

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { loadPage } from '../api/wp'

  const page = ref<any>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      page.value = await loadPage('kontakt')
    } catch (e: any) {
      error.value = e?.message ?? 'Fehler'
    } finally {
      loading.value = false
    }
  })

  const instruments = computed(() =>
    page.value?.acf?.instruments
      ? page.value.acf.instruments.split('\n').filter(Boolean)
      : []
  )
</script>
  
<template>
  <div v-if="loading">Lädt…</div>

  <div v-else-if="error">
    Fehler: {{ error }}
  </div>

  <div v-else-if="page" class="kontakt-wrapper">
    <div class="kontakt-inner">

      <!-- Überschrift -->
      <h1 class="kontakt-title">
        {{ page.title.rendered }}
      </h1>

      <!-- Einleitung -->
      <p class="kontakt-intro">
        {{ page.acf.intro_text }}
      </p>

      <!-- Formular als mailto-Link -->
      <form
        :action="mailtoLink"
        method="POST"
        enctype="text/plain"
        class="kontakt-form"
      >
        <!-- Name -->
        <div>
          <label class="kontakt-label">Name</label>
          <input name="Name" type="text" placeholder="Vor- und Nachname"
            class="kontakt-input" />
        </div>

        <!-- E-Mail -->
        <div>
          <label class="kontakt-label">E-Mail</label>
          <input name="Email" type="email" placeholder="dein@email.ch"
            class="kontakt-input" />
        </div>

        <!-- Instrument -->
        <div>
          <label class="kontakt-label">Instrument</label>
          <select name="Instrument"
            class="kontakt-select">
            <option disabled selected>– bitte wählen –</option>
            <option
            v-for="(instrument, i) in instruments"
            :key="i"
            >
            {{ instrument }}
          </option>
          </select>
        </div>

        <!-- Nachricht -->
        <div>
          <label class="kontakt-label">Nachricht</label>
          <textarea name="Nachricht" rows="4" placeholder="Fragen, Wünsche, Terminvorschläge..."
            class="kontakt-textarea"></textarea>
        </div>

        <!-- Button -->
        <div class="text-center">
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Nachricht senden
          </button>
        </div>
      </form>

      <!-- Direktkontakt -->
      <div class="kontakt-direct">
        <p>
          {{ page.acf.email_text }}
          <a
            href="`mailto:${page.acf.contact_email}`"
            class="kontakt-link"
          >
            {{ page.acf.contact_email }}
          </a>
        </p>
        <p>
          {{ page.acf.telefon_text }}
          <a
            href="`tel:${page.acf.contact_phone}`"
            class="kontakt-link"
          >
            {{ page.acf.contact_phone }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>


