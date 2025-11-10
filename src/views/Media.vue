<template>
  <div class="medien-wrapper">
    <div class="medien-inner">

      <!-- Überschrift -->
      <h1 class="medien-title">
        Einblicke & Medien
      </h1>

      <!-- Auswahl Dropdown -->
      <div class="mb-medien-select-block">
        <label for="person" class="medien-label">Wähle Künstler:in</label>
        <select
          id="person"
          v-model="selected"
          class="medien-select"
        >
          <option value="esther">Esther Feingold</option>
          <option value="osvaldo">Osvaldo Ovejero</option>
        </select>
      </div>

      <!-- Medienblock -->
       <div class="medien-person">
        <PersonMedia v-bind="currentPerson" />
       </div>

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
