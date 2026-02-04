<template>
  <!--Shop Dropdown Menü
  
  Does not work at the moment
  -->
    
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
      class="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-60 border border-gray-200 rounded-lg shadow-lg z-50"
    >
      <router-link
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

const isOpen = ref(false)
const menuItems = ref<any[]>([])

onMounted(async () => {
  try {
    menuItems.value = await loadShopMenu()
  } catch (err) {
    console.error('ShopDropDown error:', err)
  }
})


const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

</script>
