<!-- Kontakt.vue – Probestunde & Kontaktformular -->

<script setup lang="ts">
  import { ref, onMounted, computed, reactive } from 'vue'
  import { loadKontaktPage } from '../api/wp'
  import type { KontaktPageFields, PageModel } from '../api/wp'

  // Edit: Use a dedicated contact page model instead of raw ACF access.
  const page = ref<PageModel<KontaktPageFields> | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)
  // Edit: Keep the contact form data in Vue state so `mailto:` can be built predictably.
  const form = reactive({
    name: '',
    email: '',
    instrument: '',
    message: ''
  })
  // Edit: Surface validation feedback in the UI instead of relying on browser-specific mailto form behavior.
  const formError = ref<string | null>(null)
  // Edit: Show a brief post-submit hint so users know the local mail client should open now.
  const formNotice = ref<string | null>(null)
  // Edit: Keep the mailto body at a practical size so encoded URLs stay within common client limits.
  const MAX_MESSAGE_LENGTH = 1500

  // Edit: Reuse one simple email check for both sender input and recipient configuration.
  function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  }

  onMounted(async () => {
    try {
      page.value = await loadKontaktPage()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Fehler'
    } finally {
      loading.value = false
    }
  })

  const instruments = computed(() =>
    page.value?.fields.instruments ?? []
  )

  // Edit: Keep the outgoing recipient configurable from the CMS while defaulting to the direct contact address.
  const recipientEmail = computed(() =>
    page.value?.fields.contactEmail || page.value?.fields.email || ''
  )

  // Edit: Build a human-readable subject from the current form state before URL-encoding it.
  const mailSubject = computed(() => {
    const instrument = form.instrument || 'Allgemeine Anfrage'
    return `Kontaktanfrage: ${instrument}`
  })

  // Edit: Build the mail body explicitly so line breaks and optional fields stay consistent across clients.
  const mailBody = computed(() => {
    const trimmedMessage = form.message.trim()
    // Edit: Truncate long messages before encoding them into the `mailto:` body.
    const safeMessage = trimmedMessage.slice(0, MAX_MESSAGE_LENGTH)
    const lines = [
      `Name: ${form.name.trim()}`,
      `E-Mail: ${form.email.trim()}`,
      `Instrument: ${form.instrument || '-'}`,
      '',
      'Nachricht:',
      safeMessage
    ]

    return lines.join('\n')
  })

  // Edit: Generate the final `mailto:` target from encoded subject/body parts instead of using form POST.
  const mailtoLink = computed(() => {
    if (!recipientEmail.value) return ''

    const params = new URLSearchParams({
      subject: mailSubject.value,
      body: mailBody.value
    })

    return `mailto:${recipientEmail.value}?${params.toString()}`
  })

  // Edit: Validate the minimum required fields before trying to open the local mail client.
  function submitMailtoForm() {
    formError.value = null
    formNotice.value = null

    if (!recipientEmail.value) {
      formError.value = 'Es ist momentan keine Kontaktadresse hinterlegt.'
      return
    }

    if (!isValidEmail(recipientEmail.value)) {
      formError.value = 'Die hinterlegte Kontaktadresse ist ungültig.'
      return
    }

    if (!form.name.trim()) {
      formError.value = 'Bitte gib deinen Namen ein.'
      return
    }

    if (!form.email.trim()) {
      formError.value = 'Bitte gib deine E-Mail-Adresse ein.'
      return
    }

    if (!isValidEmail(form.email)) {
      formError.value = 'Bitte gib eine gültige E-Mail-Adresse ein.'
      return
    }

    if (!form.instrument) {
      formError.value = 'Bitte wähle ein Instrument aus.'
      return
    }

    if (!form.message.trim()) {
      formError.value = 'Bitte schreibe eine Nachricht.'
      return
    }

    // Edit: Confirm the next expected step in the UI before handing off to the local mail client.
    formNotice.value = 'Der Mail-Client sollte sich jetzt öffnen.'
    window.location.href = mailtoLink.value
  }

</script>
  
<template>
  <div v-if="loading" class="page-state"><div>Lädt…</div></div>

  <div v-else-if="error" class="page-state">
    <div>Fehler: {{ error }}</div>
  </div>

  <div v-else-if="page" class="kontakt-wrapper">
    <div class="kontakt-inner">

      <!-- Überschrift -->
      <h1 class="kontakt-title">
        {{ page.title }}
      </h1>

      <!-- Einleitung -->
      <p class="kontakt-intro">
        {{ page.fields.introText }}
      </p>

      <div class="kontakt-content">
        <!-- Formular als sauberes mailto-Formular -->
        <form
          @submit.prevent="submitMailtoForm"
          class="kontakt-form"
        >
          <div class="kontakt-form-row">
            <div class="kontakt-field">
              <label for="kontakt-name" class="kontakt-label">
                {{ page?.fields.formularName }}
              </label>
              <input
                id="kontakt-name"
                v-model="form.name"
                name="Name"
                type="text"
                autocomplete="name"
                placeholder="Vor- und Nachname"
                class="kontakt-input"
                required
              />
            </div>

            <div class="kontakt-field">
              <label for="kontakt-email" class="kontakt-label">
                {{ page?.fields.formularEmail }}
              </label>
              <input
                id="kontakt-email"
                v-model="form.email"
                name="Email"
                type="email"
                autocomplete="email"
                placeholder="dein@email.ch"
                class="kontakt-input"
                required
              />
            </div>
          </div>

          <div class="kontakt-field">
            <label for="kontakt-instrument" class="kontakt-label">
              {{ page?.fields.formularInstrument }}
            </label>
            <select
              id="kontakt-instrument"
              v-model="form.instrument"
              name="Instrument"
              class="kontakt-select"
              required
            >
              <option disabled value="">
                {{ page?.fields.formularAuswahl }}
              </option>
              <option
                v-for="(instrument, i) in instruments"
                :key="i"
                :value="instrument"
              >
                {{ instrument }}
              </option>
            </select>
          </div>

          <div class="kontakt-field">
            <label for="kontakt-message" class="kontakt-label">
              Nachricht
            </label>
            <textarea
              id="kontakt-message"
              v-model="form.message"
              name="Nachricht"
              rows="5"
              maxlength="1500"
              placeholder="Fragen, Wünsche, Terminvorschläge..."
              class="kontakt-textarea"
              required
            ></textarea>
          </div>

          <p v-if="formError" class="kontakt-form-error" role="alert">
            {{ formError }}
          </p>
          <p v-if="formNotice" class="kontakt-form-notice" role="status">
            {{ formNotice }}
          </p>

          <button
            type="submit"
            class="kontakt-button"
          >
            {{ page?.fields.buttonSenden }}
          </button>
        </form>

        <!-- Direktkontakt -->
        <div class="kontakt-direct">
          <a
            :href="`mailto:${page?.fields.email}`"
            class="kontakt-direct-card"
          >
            <span class="kontakt-direct-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 6.5h18v11H3z"></path>
                <path d="m4 7.5 8 6 8-6"></path>
              </svg>
            </span>
            <span class="kontakt-direct-copy">
              <span class="kontakt-direct-label">{{ page?.fields.emailText }}</span>
              <span class="kontakt-link">{{ page?.fields.email }}</span>
            </span>
          </a>

          <a
            :href="`tel:${page?.fields.contactPhone ?? ''}`"
            class="kontakt-direct-card"
          >
            <span class="kontakt-direct-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M7.2 3.5 10 7.8 8.3 10c1.2 2.5 3.2 4.5 5.7 5.7l2.2-1.7 4.3 2.8c.2.2.3.5.2.8-.5 1.8-2.1 3.1-4 3.2C9.5 20.1 3.9 14.5 3.2 7.3c.1-1.9 1.4-3.5 3.2-4 .3-.1.6 0 .8.2Z"></path>
              </svg>
            </span>
            <span class="kontakt-direct-copy">
              <span class="kontakt-direct-label">{{ page?.fields.telefonText }}</span>
              <span class="kontakt-link">{{ page?.fields.contactPhone }}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
