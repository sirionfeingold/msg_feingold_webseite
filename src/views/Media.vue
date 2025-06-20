<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-rose-50 to-yellow-100 text-gray-800">
    <div class="max-w-6xl mx-auto space-y-16 text-center">

      <!-- Überschrift -->
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-pink-500 to-red-600 text-transparent bg-clip-text drop-shadow">
        Einblicke & Medien
      </h1>

      <!-- Auswahl Dropdown -->
      <div class="mb-8">
        <label for="person" class="block mb-2 text-lg font-semibold text-gray-700">Wähle Künstler:in</label>
        <select
          id="person"
          v-model="selected"
          class="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring focus:ring-orange-200"
        >
          <option value="esther">Esther Feingold</option>
          <option value="osvaldo">Osvaldo Ovejero</option>
        </select>
      </div>

      <!-- Medienblock -->
      <PersonMedia v-bind="currentPerson" />

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PersonMedia from '../components/PersonMedia.vue'

const selected = ref('esther')

const persons = {
  esther: {
    name: 'Esther Feingold',
    title: 'Stimme & Vision',
    videoId: 'SpV26-1Yf_Q',
    spotifyLink: 'https://open.spotify.com/embed/artist/1URqrDzZd80ggPhaU5Ir8B',
    facebook: 'https://www.facebook.com/esther.feingold.90/',
    instagram: 'https://www.instagram.com/feingoldesther/?hl=de',
    youtube: 'https://www.youtube.com/channel/UCEirmu7s33q_m2sK1IzYvPg',
    website: 'https://esther-feingold.ch/saengerin-saxophonistin/',
  },
  osvaldo: {
    name: 'Osvaldo Ovejero',
    title: 'Komponist & Dirigent',
    videoId: 'eWswONM8KO0',
    spotifyLink: 'https://open.spotify.com/embed/artist/7sUPvKMAeg2gtq7YPZsnMe',
    facebook: 'https://www.facebook.com/osvaldo.ovejero.9?mibextid=wwXIfr&rdid=Tr6aIKQoS9lLY9ck&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19777htonJ%2F%3Fmibextid%3DwwXIfr',
    youtube: 'https://www.youtube.com/@osvaldoovejero1917/featured',
    website: 'https://osvaldo-ovejero.ch/home/',
  }
}

const currentPerson = computed(() => persons[selected.value])
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
