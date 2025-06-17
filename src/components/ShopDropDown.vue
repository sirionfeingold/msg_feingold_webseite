<template>
  <div class="relative">
    <!-- Button -->
    <button
      @click="toggleDropdown"
      class="cursor-pointer hover:text-blue-500 transition-colors font-medium flex items-center gap-1"
    >
      Shop
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="isOpen"
      class="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <router-link
        to="/shop/instrumente"
        class="block px-4 py-2 text-gray-700 hover:bg-orange-100"
        @click="isOpen = false"
      >
        🎹 Musikinstrumente
      </router-link>
      <router-link
        to="/shop/cds"
        class="block px-4 py-2 text-gray-700 hover:bg-orange-100"
        @click="isOpen = false"
      >
        💿 CDs
      </router-link>
      <router-link
        to="/shop/kunst"
        class="block px-4 py-2 text-gray-700 hover:bg-orange-100"
        @click="isOpen = false"
      >
        🎨 Kunstmalerei
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>
