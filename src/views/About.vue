<!--About Us – Über-uns-Seite von MSG Feingold-->

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { loadPage, loadTeachers, getTeacherImage } from '../api/wp'
  const page = ref<any>(null)
  const teachers = ref<any[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      page.value = await loadPage('about') // slug aus WP
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
   <div v-if="loading" class="about-wrapper">
    <div class="about-inner">Lädt…</div>
  </div>
  <!-- Error -->
   <div v-else-if="error" class="about-wrapper">
    <div class="about-inner">Fehler: {{ error }}</div>
  </div>

  <div v-else-if="page" class="about-wrapper">
    <div class="about-inner">

      <!-- Überschrift mit Farbverlauf -->
      <h1
        class="about-title"
      >
        {{ page.title.rendered }}
      </h1>

      <!-- Textblock -->
      <p class="about-text-main">
        {{ page.acf.intro_text }}
      </p>

      <!-- Zusatztext -->
      <p class="about-text-sub">
        {{ page.acf.sub_text }}
      </p>

      <!-- Lehrpersonen -->
      <section class="about-teachers" v-if="teachers.length">
        <h2 class="about-teachers-title">
          {{ page.acf.teachers_title }}
        </h2>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-10 text-left max-w-4xl mx-auto">
          <!-- Esther -->
          <div 
          v-for="t in teachers"
          :key="t.id"
          class="teacher-card">

            <img
              :src="getTeacherImage(t)"
              :alt="t.title.rendered"
              class="teacher-img"
            />

            <h3 class="teacher-name">
              {{ t.title.rendered }}
            </h3>

            <p class="teacher-bio">
              {{ t.acf.bio }}
            </p>
            <a
              v-if="t.acf.website"
              :href="t.acf.website"
              target="_blank"
              class="teacher-link"
            >
              🔗 {{ t.acf.website }}
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>