<template>
  <!--Shop Dropdown Menü
  
  Does not work at the moment
  -->
    
  <div class="shop-menu">
    <button
      @click="toggleDropdown"
      :disabled="!menuItems.length && !loading"
      class="shop-menu-button"
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

    <div
      v-if="isOpen"
      class="shop-menu-dropdown"
    >
      <div v-if="loading" class="shop-menu-state">
        Lädt…
      </div>
      <div v-else-if="error" class="shop-menu-state">
        {{ error }}
      </div>
      <div v-else-if="!menuItems.length" class="shop-menu-state">
        Keine Shop-Einträge verfügbar
      </div>
      <router-link
      v-else
      v-for="item in menuItems"
      :key="item.path"
      :to="item.path"
      class="shop-menu-link"
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
