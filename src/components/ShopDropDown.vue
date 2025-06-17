<template>
  <div class="relative group">
    <span class="cursor-pointer hover:text-blue-500 transition-colors font-medium">
      Shop
    </span>

    <!-- Dropdown -->
    <div
      class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 z-50"
    >
      <router-link
        to="/shop/instrumente"
        class="block px-4 py-2 text-gray-700 hover:bg-orange-100"
      >
        🎹 Musikinstrumente
      </router-link>
      <router-link
        to="/shop/cds"
        class="block px-4 py-2 text-gray-700 hover:bg-orange-100"
      >
        💿 CDs
      </router-link>
      <router-link
        to="/shop/kunst"
        class="block px-4 py-2 text-gray-700 hover:bg-orange-100"
      >
        🎨 Kunstmalerei
      </router-link>
    </div>
  </div>
</template>

<script setup>
// No logic needed for now
</script>
