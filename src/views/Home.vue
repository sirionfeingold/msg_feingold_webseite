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
        class="bg-blue-400 hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 ease-in-out 
         hover:shadow-lg hover:scale-110 hover:brightness-110"
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
