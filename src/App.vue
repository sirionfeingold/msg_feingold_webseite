<template>
  <div class="flex flex-col min-h-screen">
    <!-- HEADER -->
    <Header />

    <!-- MAIN CONTENT -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- FOOTER -->
    <Footer />
  </div>
</template>


<script lang="ts" setup>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'


</script>
