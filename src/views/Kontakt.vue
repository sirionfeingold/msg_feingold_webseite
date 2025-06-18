<!--
  Kontakt.vue – Probestunde & Kontaktformular

  Beschreibung:
  Diese View ermöglicht es Nutzer:innen, eine Probestunde bei MSG Feingold anzufragen.
  Das Formular generiert eine E-Mail über den lokalen Mail-Client (mailto).

  Inhalte:
  - Name, E-Mail, Wunschinstrument und Nachricht als Formularfelder
  - Stilvolles, responsives Design mit Farbverläufen
  - Optionale Direktkontakte per E-Mail und Telefon

  Ziel:
  Eine einfache und motivierende Möglichkeit zur Kontaktaufnahme –
  ohne technisches Vorwissen oder Login – ideal für Erstkontakte und Anfragen.
  -->
  
<template>
  <div class="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-orange-50 to-yellow-100">
    <div class="max-w-2xl mx-auto space-y-12 text-center">

      <!-- Überschrift -->
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 via-pink-400 to-blue-600 text-transparent bg-clip-text drop-shadow-lg">
        Probestunde reservieren
      </h1>

      <!-- Einleitung -->
      <p class="text-gray-700 text-lg">
        Nutze das Formular, um uns zu kontaktieren. Dein Mailprogramm wird geöffnet und deine Nachricht an uns vorbereitet.
      </p>

      <!-- Formular als mailto-Link -->
      <form
        :action="mailtoLink"
        method="POST"
        enctype="text/plain"
        class="space-y-6 text-left"
      >
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="Name" type="text" placeholder="Vor- und Nachname"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        <!-- E-Mail -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
          <input name="Email" type="email" placeholder="dein@email.ch"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400" />
        </div>

        <!-- Instrument -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Instrument</label>
          <select name="Instrument"
            class="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400">
            <option>– bitte wählen –</option>
            <option>Gesang</option>
            <option>Klavier</option>
            <option>Gitarre</option>
            <option>Violine</option>
            <option>Cello</option>
            <option>Klarinette</option>
            <option>Saxophon</option>
            <option>Blockflöte</option>
          </select>
        </div>

        <!-- Nachricht -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nachricht</label>
          <textarea name="Nachricht" rows="4" placeholder="Fragen, Wünsche, Terminvorschläge..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"></textarea>
        </div>

        <!-- Button -->
        <div class="text-center">
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Nachricht senden
          </button>
        </div>
      </form>

      <!-- Direktkontakt -->
      <div class="text-sm text-gray-600 mt-8 space-y-2">
        <p>
          Oder kontaktiere uns direkt per E-Mail:
          <a
            href="mailto:email@msgfeingold.ch"
            class="text-orange-600 hover:text-orange-700 underline font-medium ml-1"
          >
            email@msgfeingold.ch
          </a>
        </p>
        <p>
          Telefonisch erreichst du uns unter:
          <a
            href="tel:+41313113251"
            class="text-orange-600 hover:text-orange-700 underline font-medium ml-1"
          >
            0041/ 31 311 32 51
          </a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
const mailtoLink = "mailto:email@msgfeingold.ch"
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
