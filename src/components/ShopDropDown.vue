<template>
  <!--Shop Dropdown Menü
  
  Does not work at the moment
  -->
    
  <div class="relative">
    <!-- Button -->
    <button
      @click="toggleDropdown"
      :disabled="!menuItems.length && !loading"
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
      class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-60 border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <div v-if="loading" class="block px-4 py-2 text-sm text-gray-500">
        Lädt…
      </div>
      <div v-else-if="error" class="block px-4 py-2 text-sm text-red-500">
        {{ error }}
      </div>
      <div v-else-if="!menuItems.length" class="block px-4 py-2 text-sm text-gray-500">
        Keine Shop-Einträge verfügbar
      </div>
      <router-link
      v-else
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="block px-4 py-2 hover:bg-orange-100"
      @click="isOpen = false"
    >
    {{ item.title }}
    </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { loadShopMenu } from '../api/wp'
import type { ShopMenuItem } from '../api/wp'

const isOpen = ref(false)
// Edit: Use the shared menu type and expose explicit runtime states for the public dropdown.
const menuItems = ref<ShopMenuItem[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    menuItems.value = await loadShopMenu()
  } catch (err) {
    console.error('ShopDropDown error:', err)
    error.value = err instanceof Error ? err.message : 'Fehler beim Laden des Shops'
  } finally {
    loading.value = false
  }
})


const toggleDropdown = () => {
  // Edit: Keep the dropdown closed when there is nothing meaningful to show.
  if (!loading.value && !error.value && !menuItems.value.length) return
  isOpen.value = !isOpen.value
}

</script>
