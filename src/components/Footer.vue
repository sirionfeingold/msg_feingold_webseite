<template>
  <footer class="footer-wrapper">
    <div class="footer-inner">

      <!-- Kontakt -->
      <div class="space-y-3">
        <h4 class="footer-title">📞 Kontakt</h4>
        <ul class="footer-list">
          <li>
            <span class="font-medium">Email:</span>
            <a href="mailto:email@msgfeingold.ch" class="footer-link"> email@msgfeingold.ch</a>
          </li>
          <li>
            <span class="font-medium">Telefon:</span>
            <a href="tel:+41313113251" class="footer-link"> (+41) 031 311 32 51</a>
          </li>
          <li><span class="font-medium">Ort:</span> Bern, Schweiz</li>
        </ul>
      </div>

      <!-- Navigation -->
      <div class="space-y-3">
        <h4 class="footer-title">🎵 Navigation</h4>
        <ul class="footer-list">
          <li><router-link to="/" class="hover:underline">Home</router-link></li>
          <li><router-link to="/unterricht" class="hover:underline">Unterricht</router-link></li>
          <li><router-link to="/medien" class="hover:underline">Medien</router-link></li>
          <li><router-link to="/kontakt" class="hover:underline">Kontakt</router-link></li>
        </ul>
      </div>

      <!-- Logo + Claim -->
      <div class="space-y-3">
        <h3 class="footer-logo">MSG Feingold</h3>
        <p class="footer-sentence">
          Musik erleben, fördern und weitergeben – mit Herz, Qualität und Begeisterung.
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} MSG Feingold & Co.
    </div>
  </footer>
</template>
