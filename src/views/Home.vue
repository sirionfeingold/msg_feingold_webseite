<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-400 via-amber-200 to-blue-600 text-gray-900">
    <div class="text-center px-6 sm:px-10">
      <!-- Bunte Überschrift -->
      <h1
  class="leading-tight text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 via-orange-400 to-fuchsia-600 text-transparent bg-clip-text
         drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
         >
         Willkommen bei MSG Feingold
        </h1>


      <!-- Untertitel -->
      <p class="mt-4 text-lg sm:text-xl text-orange-800">
        Musik. Leidenschaft. Erlebnis.
      </p>

      <!-- Call to Action -->
      <div class="mt-8">
        <router-link
          to="/about"
          class="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
        >
          Mehr erfahren
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Elegant landing page with vivid colors and gradient headline
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
