<template>
  <footer class="bg-gradient-to-br from-orange-100 via-pink-100 to-violet-100 dark:from-blue-950 dark:via-indigo-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 border-t border-white/40 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-10 sm:grid sm:grid-cols-2 lg:grid-cols-3">

      <!-- Kontakt -->
      <div class="space-y-3">
        <h4 class="text-xl font-bold text-blue-600 dark:text-gray-300">📞 Kontakt</h4>
        <ul class="space-y-1 text-sm">
          <li>
            <span class="font-medium">Email:</span>
            <a href="mailto:email@msgfeingold.ch" class="text-blue-600 dark:text-blue-300 hover:underline"> email@msgfeingold.ch</a>
          </li>
          <li>
            <span class="font-medium">Telefon:</span>
            <a href="tel:+41313113251" class="text-blue-600 dark:text-blue-300 hover:underline"> (+41) 031 311 32 51</a>
          </li>
          <li><span class="font-medium">Ort:</span> Bern, Schweiz</li>
        </ul>
      </div>

      <!-- Navigation -->
      <div class="space-y-3">
        <h4 class="text-xl font-bold text-blue-600 dark:text-gray-300">🎵 Navigation</h4>
        <ul class="space-y-1 text-sm">
          <li><router-link to="/" class="hover:underline">Home</router-link></li>
          <li><router-link to="/unterricht" class="hover:underline">Unterricht</router-link></li>
          <li><router-link to="/medien" class="hover:underline">Medien</router-link></li>
          <li><router-link to="/kontakt" class="hover:underline">Kontakt</router-link></li>
        </ul>
      </div>

      <!-- Logo + Claim -->
      <div class="space-y-3">
        <h3 class="text-2xl font-extrabold text-blue-600 dark:text-gray-300">MSG Feingold</h3>
        <p class="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          Musik erleben, fördern und weitergeben – mit Herz, Qualität und Begeisterung.
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="border-t border-white/40 dark:border-gray-600 mt-6 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
      © {{ new Date().getFullYear() }} MSG Feingold & Co.
    </div>
  </footer>
</template>

<script setup>
// Keine Logik notwendig
</script>

<style scoped>
footer {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
