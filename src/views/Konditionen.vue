<!--Konditionen.vue – Übersicht der Unterrichtsbedingungen-->

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { loadKonditionenPage } from '../api/wp'
  import type { KonditionenPageFields, PageModel } from '../api/wp'

  // Edit: Use a dedicated conditions page model instead of raw ACF access.
  const page = ref<PageModel<KonditionenPageFields> | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      page.value = await loadKonditionenPage()
    } catch (e: any) {
      error.value = e?.message ?? 'Fehler'
    } finally {
      loading.value = false
    }
  })

  const conditions = computed(() => {
    const text = page.value?.fields.conditionsText
    return text
      // Edit: Type the split lines explicitly so the public page build passes under TypeScript.
      ? text.split('\n').filter((l: string) => l.trim() !== '')
      : []
  })
  
</script>

<template>

  <div v-if="loading" class="page-state"><div>Lädt…</div></div>

  <div v-else-if="error" class="page-state">
    <div>Fehler: {{ error }}</div>
  </div>

  <div v-else-if="page" class="konditionen-wrapper">
    <div class="konditionen-inner">

      <!-- Überschrift -->
      <h1 class="konditionen-title">
        {{ page.title }}
      </h1>

      <!-- Einführung -->
      <p class="konditionen-intro">
        {{ page.fields.introText }}      
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
          {{ page.fields.contactText }}
        </p>
        <p>
          <!-- Edit: Bind the contact links correctly so they work in the browser. -->
          <a
            :href="`mailto:${page?.fields.contactEmail ?? ''}`"
            class="konditionen-link"
          >
            {{ page.fields.contactEmail }}
          </a>
          <br />
          <a
            :href="`tel:${page?.fields.contactPhone ?? ''}`"
            class="konditionen-link"
          >
            {{ page.fields.contactPhone }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
