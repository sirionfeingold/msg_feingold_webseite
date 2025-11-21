<template>
  <section class="bewertungen-section">
    <div class="bewertungen-inner">

      <!-- Überschrift -->
      <h2 class="bewertungen-title">
        Was unsere Schüler:innen sagen
      </h2>

      <div class="space-y-12">
        <div
          v-for="t in bewertung"
          :key="t.name"
          class="bewertung-card"
        >
          <!-- Bewertungstext -->
          <p class="bewertung-text">
            “{{ t.text }}”
          </p>

          <!-- Sterne + Name -->
          <div class="bewertung-footer">
            <div class="bewertung-stars">
              <span v-for="i in t.stars" :key="i">★</span>
              <span v-for="i in 5 - t.stars" :key="'empty' + i" class="opacity-30">★</span>
            </div>
            <div class="bewertung-name">
              – {{ t.name }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>

/**
 * Hier kann man eine neue Bewertung einfügen
 * nach der letzten } ein komma einfügen --> d.h. },
 */

const bewertung = [
  {
    name: 'Hans H.',
    text: 'Hier macht Musik- und Gesangsunterricht Freude. Unterricht erfolgt kompetent und herzlich, ob Anfänger oder fortgeschritten. MSG liegt zentral im Herzen von Bern.',
    stars: 5
  }
]
</script>
