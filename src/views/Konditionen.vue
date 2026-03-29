<!--Konditionen.vue – Übersicht der Unterrichtsbedingungen-->

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { loadPage } from '../api/wp'

  const page = ref<any>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      page.value = await loadPage('konditionen')
    } catch (e: any) {
      error.value = e?.message ?? 'Fehler'
    } finally {
      loading.value = false
    }
  })

  const conditions = computed(() => {
    const text = page.value?.acf?.conditions_text
    return text
      // Edit: Type the split lines explicitly so the public page build passes under TypeScript.
      ? text.split('\n').filter((l: string) => l.trim() !== '')
      : []
  })
  
</script>

<template>

  <div v-if="loading">Lädt…</div>

  <div v-else-if="error">
    Fehler: {{ error }}
  </div>

  <div v-else-if="page" class="konditionen-wrapper">
    <div class="konditionen-inner">

      <!-- Überschrift -->
      <h1 class="konditionen-title">
        {{ page.title.rendered }}
      </h1>

      <!-- Einführung -->
      <p class="konditionen-intro">
        {{ page.acf?.intro_text }}      
      </p>

      <!-- Konditionen-Liste -->
      <div class="konditionen-list-wrapper">
        <ol class="konditionen-list">
          <li
          v-for="(item, index) in conditions"
          :key="index"
          >
          {{ item }}
        </li>
        </ol>
      </div>

      <!-- Kontaktinfo -->
      <div class="konditionen-contact">
        <p>
          {{ page.acf?.contact_text }}
        </p>
        <p>
          <a
            href="`mailto:${page.acf?.contact_email}`"
            class="konditionen-link"
          >
            {{ page.acf?.contact_email }}
          </a>
          <br />
          <a
            href="`tel:${page.acf?.contact_phone}`"
            class="konditionen-link"
          >
            {{ page.acf?.contact_phone }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
