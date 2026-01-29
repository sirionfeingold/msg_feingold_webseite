<template>
  
   <div v-if="loading" class="about-wrapper">
    <div class="about-inner">Lädt…</div>
  </div>
  
   <div v-else-if="error" class="about-wrapper">
    <div class="about-inner">Fehler: {{ error }}</div>
  </div>

  <div v-else-if="page" class="medien-wrapper">
    <div class="medien-inner">

      <!-- Überschrift -->
      <h1 class="medien-title">
        {{ page?.acf?.medien_title }}
      </h1>

      <!-- Auswahl Dropdown -->
      <div class="mb-medien-select-block">
        <label for="person" class="medien-label">
          {{ page?.acf?.medien_subtitle }}
        </label>
        <select
          id="person"
          v-model="selected"
          class="medien-select"
        >
        <option 
        v-for="person in persons"
        :key="person.slug"
        :value="person.slug">
        {{ person.name }}
      </option>
        </select>
      </div>

      <!-- Medienblock -->
       <div class="medien-person">
        <PersonMedia v-if="currentPerson" v-bind="currentPerson" />
       </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { loadPage, loadPersons } from '../api/wp'
import type { Person } from '../types/person'
import PersonMedia from '../components/PersonMedia.vue'

const page = ref<any>(null)
const persons = ref<Person[]>([])
const selected = ref<string>('')

const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    page.value = await loadPage('medien')
    persons.value = await loadPersons()
    if (persons.value.length) {
      selected.value = persons.value[0].slug
    }
  } catch (e: any) {
    error.value = e?.message ?? 'Fehler beim Laden der Künstler:innen'
  } finally {
    loading.value = false
  }
})

const currentPerson = computed(() =>
  persons.value.find(p => p.slug === selected.value)
)
</script>
