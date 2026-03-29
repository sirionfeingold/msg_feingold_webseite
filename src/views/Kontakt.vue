<!-- Kontakt.vue – Probestunde & Kontaktformular -->

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { loadKontaktPage } from '../api/wp'
  import type { KontaktPageFields, PageModel } from '../api/wp'

  // Edit: Use a dedicated contact page model instead of raw ACF access.
  const page = ref<PageModel<KontaktPageFields> | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      page.value = await loadKontaktPage()
    } catch (e: any) {
      error.value = e?.message ?? 'Fehler'
    } finally {
      loading.value = false
    }
  })

  const instruments = computed(() =>
    page.value?.fields.instruments ?? []
  )

  // mailto function
  const mailtoLink = computed(() =>
  page.value?.fields.contactEmail
    ? `mailto:${page.value.fields.contactEmail}`
    : ''
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
        {{ page.title }}
      </h1>

      <!-- Einleitung -->
      <p class="kontakt-intro">
        {{ page.fields.introText }}
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
          <label class="kontakt-label">
            {{ page?.fields.formularName }}
          </label>
          <input name="Name" type="text" placeholder="Vor- und Nachname"
            class="kontakt-input" />
        </div>

        <!-- E-Mail -->
        <div>
          <label class="kontakt-label">
            {{ page?.fields.formularEmail }}
          </label>
          <input name="Email" type="email" placeholder="dein@email.ch"
            class="kontakt-input" />
        </div>

        <!-- Instrument -->
        <div>
          <label class="kontakt-label">
            {{ page?.fields.formularInstrument }}
          </label>
          <select name="Instrument"
            class="kontakt-select">
            <option disabled selected>
              {{ page?.fields.formularAuswahl }}
            </option>
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
          <label class="kontakt-label">
            {{ page?.fields.formularAuswahl }}
          </label>
          <textarea name="Nachricht" rows="4" placeholder="Fragen, Wünsche, Terminvorschläge..."
            class="kontakt-textarea"></textarea>
        </div>

        <!-- Button -->
        <div class="text-center">
          <button
            type="submit"
            class="kontakt-button"
          >
            {{ page?.fields.buttonSenden }}
          </button>
        </div>
      </form>

      <!-- Direktkontakt -->
      <div class="kontakt-direct">
        <p>
          {{ page?.fields.emailText }}
          <a
            :href="`mailto:${page?.fields.email}`"
            class="kontakt-link"
          >
            {{ page?.fields.email }}
          </a>
        </p>
        <p>
          {{ page?.fields.telefonText }}
          <a
            :href="`tel:${page?.fields.contactPhone ?? ''}`"
            class="kontakt-link"
          >
            {{ page?.fields.contactPhone }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
