<template>
<Transition
  enter-active-class="transition-transform duration-300 ease-out"
  enter-from-class="translate-x-full"
  enter-to-class="translate-x-0"
  leave-active-class="transition-transform duration-300 ease-in"
  leave-from-class="translate-x-0"
  leave-to-class="translate-x-full"
>

    <aside
      v-if="isOpen"
      class="fixed inset-y-0 right-0 w-64 bg-white dark:bg-blue-950 shadow-lg z-50 flex flex-col p-6"
    >
      <button class="self-end mb-4 text-gray-500 dark:text-gray-100 hover:text-blue-500" @click="toggle">
        ✕
      </button>
      <nav class="flex flex-col gap-4 text-lg font-medium dark:text-gray-100">
        <router-link to="/" @click="toggle">
          {{ nav?.headerHomeText }}
        </router-link>

        <router-link to="/unterricht" @click="toggle">
          {{ nav?.headerUnterrichtText }}
        </router-link>

        <ShopDropDown />

        <router-link to="/medien" @click="toggle">
          {{ nav?.headerMedienText }}
        </router-link>

        <router-link to="/kontakt" @click="toggle">
          {{ nav?.headerKontaktText }}
        </router-link>

        <router-link to="/konditionen" @click="toggle">
          {{ nav?.headerKonditionenText }}
        </router-link>

        <router-link to="/about" @click="toggle">
          {{ nav?.headerAboutText }}
        </router-link>
      </nav>
    </aside>
  </Transition>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import ShopDropDown from './ShopDropDown.vue'
import type { HeaderPageFields } from '../api/wp'

defineProps<{
  isOpen: boolean
  // Edit: Type sidebar navigation from the shared header page fields.
  nav?: HeaderPageFields
}>()

const emit = defineEmits(['toggle'])
const toggle = () => emit('toggle')

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    emit('toggle')
  }
)
</script>
