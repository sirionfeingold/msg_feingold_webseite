<!--
  Konditionen.vue – Übersicht der Unterrichtsbedingungen

  Beschreibung:
  Diese View zeigt die Vertrags- und Teilnahmebedingungen der Musikschule MSG Feingold.
  Sie informiert transparent über Regelungen zur Anmeldung, Bezahlung, Absenz und Kündigung.

  Funktionen:
  - Überschrift und Einleitung mit stilvollem Farbverlauf und Responsive Layout
  - Klar strukturierte Aufzählung der Konditionen als Liste (ol)
  - Visuell hervorgehobener Hintergrund mit Farbverläufen und Schatten
  - Kontaktmöglichkeiten per E-Mail und Telefon im Footer

  Ziel:
  Besucher:innen sollen sich einfach und freundlich über den Ablauf des Unterrichts informieren können –
  inklusive verbindlicher Bedingungen zur Planung und Fairness auf beiden Seiten.
  -->
  
<template>
  <div class="konditionen-wrapper">
    <div class="konditionen-inner">

      <!-- Überschrift -->
      <h1 class="konditionen-title">
        Unterricht & Konditionen
      </h1>

      <!-- Einführung -->
      <p class="konditionen-intro">
        Unsere Bedingungen schaffen Klarheit für beide Seiten. Hier findest du alle zentralen Infos zu Vertragsdauer, Zahlung und Unterrichtsausfall.
      </p>

      <!-- Konditionen-Liste -->
      <div class="konditionen-list-wrapper">
        <ol class="konditionen-list">
          <li>
            Der Unterricht beginnt mit dem Eintrittsdatum und erfolgt mindestens 10 Lektionen pro Quartal oder 20 Lektionen pro Semester.
          </li>
          <li>
            Die Kündigung des Vertrages muss 1 Monat vor Ablauf der 10 oder 20 Lektionen schriftlich erfolgen, andernfalls verlängert sich der Vertrag automatisch.
          </li>
          <li>
            Die Zahlung (für 10 oder 20 Lektionen) erfolgt vor dem ersten Unterrichtstermin im Voraus.
          </li>
          <li>
            Die Lektionen werden in der Regel wöchentlich erteilt.
          </li>
          <li>
            Sollte der Unterricht seitens der Lehrperson abgesagt werden, verpflichtet sie sich, die Lektion nachzuholen.
          </li>
          <li>
            Die Abmeldung einer Lektion muss mindestens 24 Stunden vor dem Termin erfolgen, sonst gilt sie als erteilt.
          </li>
          <li>
            Bei frühzeitigem Studienabbruch (z.B. Krankheit, Pause, Auslandaufenthalt) erfolgt keine Rückerstattung.
          </li>
          <li>
            Nicht bezogene Lektionen bleiben maximal ein halbes Jahr ab dem aktuellen Quartal oder Semester gültig. Danach erlischt der Anspruch.
          </li>
        </ol>
      </div>

      <!-- Kontaktinfo -->
      <div class="konditionen-contact">
        <p>
          Bei Fragen kontaktiere uns gerne:
        </p>
        <p>
          <a
            href="mailto:email@msgfeingold.ch"
            class="konditionen-link"
          >
            email@msgfeingold.ch
          </a>
          <br />
          <a
            href="tel:+41313113251"
            class="konditionen-link"
          >
            (+41) 031 311 32 51
          </a>
        </p>
      </div>

    </div>
  </div>
</template>