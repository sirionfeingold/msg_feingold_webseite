<template>
  <div class="min-h-screen px-4 sm:px-6 py-20 bg-gradient-to-b from-white via-orange-50 to-yellow-100 text-gray-800">
    <div class="max-w-4xl mx-auto flex flex-col items-center space-y-10 text-center">

      <!-- Titel -->
      <h1 class="leading-tight text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-transparent bg-clip-text drop-shadow-lg">
        {{ instrument?.name }}
      </h1>

      <!-- Bild -->
      <img
        v-if="instrument?.image"
        :src="instrument.image"
        :alt="instrument.name"
        class="w-full max-w-2xl rounded-3xl shadow-xl transition-transform duration-300 hover:scale-[1.02]"
      />

      <!-- Beschreibung -->
      <p class="text-lg sm:text-xl leading-relaxed text-gray-700 max-w-3xl">
        {{ instrument?.description }}
      </p>

      <!-- Optional: Call to Action -->
      <router-link
      to="/kontakt"
      class="mt-6 inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium text-lg px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
      >
      Probestunde vereinbaren
    </router-link>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { instruments } from '../data/instrumentData'

const route = useRoute()
const instrument = instruments.find(i => i.slug === route.params.name)
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
