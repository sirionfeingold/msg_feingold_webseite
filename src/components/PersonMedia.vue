<template>
  <section class="person-media">
    <h2 class="person-media-title">
      {{ name }} – {{ title }}
    </h2>

    <div v-if="videoId" class="person-video">
      <iframe
        :src="`https://www.youtube.com/embed/${videoId}`"
        :title="`${name} Video`"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="person-frame"
      ></iframe>
    </div>

    <div v-if="spotifyLink" class="person-spotify">
      <iframe
        :src="spotifyLink"
        width="100%" height="152" frameborder="0"
        allowfullscreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        class="person-spotify-frame"
      ></iframe>
    </div>

    <div class="person-socials">
      <a v-if="instagram" :href="instagram" target="_blank" rel="noopener noreferrer" class="person-social person-social-instagram" aria-label="Instagram">
        <svg viewBox="0 0 64 64" aria-hidden="true">
          <rect x="8" y="8" width="48" height="48" rx="12" fill="url(#person-instagram-gradient)"></rect>
          <circle cx="32" cy="32" r="10" fill="white"></circle>
          <circle cx="44" cy="20" r="3" fill="white"></circle>
          <defs>
            <linearGradient id="person-instagram-gradient" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F58529"></stop>
              <stop offset="0.5" stop-color="#DD2A7B"></stop>
              <stop offset="1" stop-color="#8134AF"></stop>
            </linearGradient>
          </defs>
        </svg>
      </a>
      <a v-if="facebook" :href="facebook" target="_blank" rel="noopener noreferrer" class="person-social person-social-facebook" aria-label="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v2H6v4h3v7h4v-7h3.2l.8-4h-4V9c0-.7.3-1 1-1Z"></path>
        </svg>
      </a>
      <a v-if="youtube" :href="youtube" target="_blank" rel="noopener noreferrer" class="person-social person-social-youtube" aria-label="YouTube">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 8.2c-.2-1.4-1.1-2.4-2.5-2.6C16.6 5.3 14.5 5.2 12 5.2s-4.6.1-6.5.4C4.1 5.8 3.2 6.8 3 8.2A22 22 0 0 0 2.8 12c0 1.4 0 2.7.2 3.8.2 1.4 1.1 2.4 2.5 2.6 1.9.3 4 .4 6.5.4s4.6-.1 6.5-.4c1.4-.2 2.3-1.2 2.5-2.6.2-1.1.2-2.4.2-3.8s0-2.7-.2-3.8ZM10 15.8V8.2l6 3.8-6 3.8Z"></path>
        </svg>
      </a>
      <a v-if="website" :href="website" target="_blank" rel="noopener noreferrer" class="person-social person-social-website" aria-label="Website">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20"></path>
          <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
          <path d="M12 2a15.3 15.3 0 0 0 0 20"></path>
          <path d="M4 6c2.5 1.5 5.5 2 8 2s5.5-.5 8-2"></path>
          <path d="M4 18c2.5-1.5 5.5-2 8-2s5.5.5 8 2"></path>
        </svg>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
// Edit: Keep the media component props typed because sanitized values can be empty strings or undefined.
defineProps({
  name: String,
  title: String,
  videoId: String,
  spotifyLink: String,
  facebook: String,
  instagram: String,
  youtube: String,
  website: String
})
</script>
