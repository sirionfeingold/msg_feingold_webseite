<!--About Us – Über-uns-Seite von MSG Feingold-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { loadAboutPage, loadTeachers } from '../api/wp'
  import type { AboutPageFields, PageModel, Teacher } from '../api/wp'
  // Edit: Consume typed app models instead of raw WP page and teacher structures.
  const page = ref<PageModel<AboutPageFields> | null>(null)
  const teachers = ref<Teacher[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      page.value = await loadAboutPage()
      teachers.value = await loadTeachers()
    } catch (e: any) {
      error.value = e?.message ?? 'Fehler beim Laden'
    } finally {
      loading.value = false
    }
  })
</script>
  
<template>
  <!-- Loading -->
   <div v-if="loading" class="page-state">
    <div>Lädt…</div>
  </div>
  <!-- Error -->
   <div v-else-if="error" class="page-state">
    <div>Fehler: {{ error }}</div>
  </div>

  <div v-else-if="page" class="about-wrapper">
    <div class="about-inner">

      <!-- Überschrift mit Farbverlauf -->
      <h1
        class="about-title"
      >
        {{ page.title }}
      </h1>

      <!-- Textblock -->
      <p class="about-text-main">
        {{ page.fields.introText }}
      </p>

      <!-- Zusatztext -->
      <p class="about-text-sub">
        {{ page.fields.subText }}
      </p>

      <!-- Lehrpersonen -->
      <section class="about-teachers">
        <h2 class="about-teachers-title">
          {{ page.fields.teachersTitle }}
        </h2>

        <p v-if="!teachers.length" class="about-text-sub">
          <!-- Edit: Show a defined empty state when the public CMS has no teachers yet. -->
          Lehrpersonen folgen in Kürze.
        </p>

        <div v-else class="teacher-grid">
          <!-- Esther -->
          <div 
          v-for="t in teachers"
          :key="t.id"
          class="teacher-card">

            <img
              v-if="t.image"
              :src="t.image"
              :alt="t.name"
              class="teacher-img"
            />
            <div v-else class="teacher-img teacher-img-fallback">
              <!-- Edit: Provide a visible fallback when no teacher image is available. -->
              Kein Bild
            </div>

            <h3 class="teacher-name">
              {{ t.name }}
            </h3>

            <p class="teacher-bio">
              {{ t.bio || 'Biografie folgt.' }}
            </p>
            <a
              v-if="t.website"
              :href="t.website"
              target="_blank"
              rel="noopener noreferrer"
              class="teacher-link"
            >
              🔗 {{ t.website }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
