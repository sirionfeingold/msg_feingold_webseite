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
  <div v-if="loading">Lädt…</div>

  <div v-else-if="error">
    Fehler: {{ error }}
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

      <!-- Formular als sauberes mailto-Formular -->
      <form
        @submit.prevent="submitMailtoForm"
        class="kontakt-form"
      >
        <!-- Name -->
        <div>
          <!-- Edit: Bind labels to explicit field IDs so the form stays keyboard- and screenreader-friendly. -->
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
            class="kontakt-input" />
        </div>

        <!-- E-Mail -->
        <div>
          <!-- Edit: Bind the email input to Vue state so the mail body can be generated explicitly. -->
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
            class="kontakt-input" />
        </div>

        <!-- Instrument -->
        <div>
          <!-- Edit: Drive the instrument select fully from Vue state instead of mixing in a static `selected` attribute. -->
          <label for="kontakt-instrument" class="kontakt-label">
            {{ page?.fields.formularInstrument }}
          </label>
          <select
            id="kontakt-instrument"
            v-model="form.instrument"
            name="Instrument"
            class="kontakt-select">
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

        <!-- Nachricht -->
        <div>
          <!-- Edit: Use a dedicated message label so the textarea is clearly announced and mapped. -->
          <label for="kontakt-message" class="kontakt-label">
            Nachricht
          </label>
          <textarea
            id="kontakt-message"
            v-model="form.message"
            name="Nachricht"
            rows="4"
            placeholder="Fragen, Wünsche, Terminvorschläge..."
            class="kontakt-textarea"></textarea>
        </div>

        <!-- Edit: Show validation problems inline before opening the local mail client. -->
        <p v-if="formError" class="text-center text-red-600">
          {{ formError }}
        </p>
        <!-- Edit: Surface a short handoff notice after submit so the mailto transition feels intentional. -->
        <p v-if="formNotice" class="text-center text-green-700">
          {{ formNotice }}
        </p>

        <!-- Button -->
        <div class="text-center">
          <button
            type="submit"
            class="kontakt-button"
          >
            {{ page?.fields.buttonSenden }}
          </button>
        </div>
      </form>

      <!-- Direktkontakt -->
      <div class="kontakt-direct">
        <p>
          {{ page?.fields.emailText }}
          <!-- Edit: Keep the direct contact link independent from the form-generated mailto URL. -->
          <a
            :href="`mailto:${page?.fields.email}`"
            class="kontakt-link"
          >
            {{ page?.fields.email }}
          </a>
        </p>
        <p>
          {{ page?.fields.telefonText }}
          <a
            :href="`tel:${page?.fields.contactPhone ?? ''}`"
            class="kontakt-link"
          >
            {{ page?.fields.contactPhone }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
