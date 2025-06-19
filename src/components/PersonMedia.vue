<template>
  <section class="space-y-12">
    <!-- Titel -->
    <h2 class="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-red-400 to-amber-500 drop-shadow text-center">
      {{ name }} – {{ title }}
    </h2>

    <!-- Video -->
    <div class="aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
      <iframe
        :src="`https://www.youtube.com/embed/${videoId}`"
        :title="`${name} Video`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="w-full h-full"
      ></iframe>
    </div>

    <!-- Spotify -->
    <div class="max-w-xl mx-auto">
      <iframe
        :src="spotifyLink"
        width="100%" height="152" frameborder="0"
        allowfullscreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        class="rounded-xl shadow-md"
      ></iframe>
    </div>

    <!-- Social Media -->
    <div class="flex justify-center gap-8">
      <a v-if="instagram" :href="instagram" target="_blank" class="hover:scale-110 transition">
        <img src="/icons/instagram.svg" alt="Instagram" class="w-8 h-8" />
      </a>
      <a v-if="facebook" :href="facebook" target="_blank" class="hover:scale-110 transition">
        <img src="/icons/facebook.svg" alt="Facebook" class="w-8 h-8" />
      </a>
      <a v-if="youtube" :href="youtube" target="_blank" class="hover:scale-110 transition">
        <img src="/icons/youtube.svg" alt="YouTube" class="w-8 h-8" />
      </a>
      <a v-if="website" :href="website" target="_blank" class="hover:scale-110 transition">
        <img src="/icons/globe.svg" alt="Website" class="w-8 h-8" />
    </a>
    </div>
  </section>
</template>

<script setup>
defineProps({
  name: String,
  title: String,
  videoId: String,
  spotifyLink: String,
  facebook: String,
  instagram: String,
  youtube: String,
  website: String
})
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
