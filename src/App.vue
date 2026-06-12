<template>
  <div class="app-shell">
    <Header />
    <main class="app-main">
      <router-view />
    </main>
    <Footer />
  </div>
</template>


<script lang="ts" setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
</script>
