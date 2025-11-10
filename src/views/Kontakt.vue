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
  <div class="kontakt-wrapper">
    <div class="kontakt-inner">

      <!-- Überschrift -->
      <h1 class="kontakt-title">
        Probestunde reservieren
      </h1>

      <!-- Einleitung -->
      <p class="kontakt-intro">
        Nutze das Formular, um uns zu kontaktieren. Dein Mailprogramm wird geöffnet und deine Nachricht an uns vorbereitet.
      </p>

      <!-- Formular als mailto-Link -->
      <form
        :action="mailtoLink"
        method="POST"
        enctype="text/plain"
        class="kontakt-form"
      >
        <!-- Name -->
        <div>
          <label class="kontakt-label">Name</label>
          <input name="Name" type="text" placeholder="Vor- und Nachname"
            class="kontakt-input" />
        </div>

        <!-- E-Mail -->
        <div>
          <label class="kontakt-label">E-Mail</label>
          <input name="Email" type="email" placeholder="dein@email.ch"
            class="kontakt-input" />
        </div>

        <!-- Instrument -->
        <div>
          <label class="kontakt-label">Instrument</label>
          <select name="Instrument"
            class="kontakt-select">
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
          <label class="kontakt-label">Nachricht</label>
          <textarea name="Nachricht" rows="4" placeholder="Fragen, Wünsche, Terminvorschläge..."
            class="kontakt-textarea"></textarea>
        </div>

        <!-- Button -->
        <div class="text-center">
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Nachricht senden
          </button>
        </div>
      </form>

      <!-- Direktkontakt -->
      <div class="kontakt-direct">
        <p>
          Oder kontaktiere uns direkt per E-Mail:
          <a
            href="mailto:email@msgfeingold.ch"
            class="kontakt-link"
          >
            email@msgfeingold.ch
          </a>
        </p>
        <p>
          Telefonisch erreichst du uns unter:
          <a
            href="tel:+41313113251"
            class="kontakt-link"
          >
            (+41) 031 311 32 51
          </a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
const mailtoLink = "mailto:email@msgfeingold.ch"
</script>
