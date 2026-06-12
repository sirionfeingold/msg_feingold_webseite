<template>
  <Transition name="sidebar-fade">
    <div v-if="isOpen" class="sidebar-overlay" @click.self="toggle">
      <aside class="sidebar-panel">
        <button class="sidebar-close" type="button" aria-label="Schließen" @click="toggle">
          &times;
        </button>
        <nav class="sidebar-nav">
          <router-link to="/" class="sidebar-link" @click="toggle">
            {{ nav?.headerHomeText }}
          </router-link>

          <router-link to="/unterricht" class="sidebar-link" @click="toggle">
            {{ nav?.headerUnterrichtText }}
          </router-link>

          <ShopDropDown />

          <router-link to="/medien" class="sidebar-link" @click="toggle">
            {{ nav?.headerMedienText }}
          </router-link>

          <router-link to="/kontakt" class="sidebar-link" @click="toggle">
            {{ nav?.headerKontaktText }}
          </router-link>

          <router-link to="/konditionen" class="sidebar-link" @click="toggle">
            {{ nav?.headerKonditionenText }}
          </router-link>

          <router-link to="/about" class="sidebar-link" @click="toggle">
            {{ nav?.headerAboutText }}
          </router-link>
        </nav>
      </aside>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import ShopDropDown from './ShopDropDown.vue'
import type { HeaderPageFields } from '../api/wp'

const props = defineProps<{
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

watch(
  () => props.isOpen,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
  }
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>
