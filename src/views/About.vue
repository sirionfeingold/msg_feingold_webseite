<!--
  About Us – Über-uns-Seite von MSG Feingold

  Beschreibung:
  Diese Seite stellt die Werte, Geschichte und Vision der Musik Seminar Gesellschaft Feingold (MSG) vor.
  Sie soll Besucher:innen ein Gefühl für die Leidenschaft und Qualität der musikalischen Arbeit vermitteln.

  Inhalt:
  - Überschrift mit Farbverlauf und moderner Typografie
  - Zwei informativ und emotional formulierte Textabschnitte
  - Sanfter Hintergrundverlauf in warmen Farben für eine einladende Atmosphäre

  Ziel:
  Vertrauen aufbauen, Persönlichkeit zeigen, künstlerisches Profil stärken.

  Erweiterungsideen:
  - Teamfoto oder Künstler:innen vorstellen
  - Zeitstrahl mit Highlights aus der MSG-Geschichte
  - Video- oder Audio-Einbindung für Einblicke in Konzerte oder Proben
  -->
  
<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-200 via-amber-100 to-blue-300 text-gray-900">
    <div class="max-w-5xl text-center space-y-10 px-4 sm:px-6">

      <!-- Überschrift mit Farbverlauf -->
      <h1
        class="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 via-orange-300 to-fuchsia-600 text-transparent bg-clip-text drop-shadow-md space-y-12 px-6 sm:px-10 pt-32"
      >
        About Us
      </h1>

      <!-- Textblock -->
      <p class="text-lg sm:text-xl text-gray-700 leading-relaxed">
        MSG Feingold steht für musikalische Qualität, kreative Programme und echte Begeisterung. Seit über 40 Jahren gestalten wir musikalische Erlebnisse in Bern und darüber hinaus – mit Solisten, Ensembles und einem feinen Gespür für Stil und Atmosphäre.
      </p>

      <!-- Zusatztext -->
      <p class="text-base sm:text-lg text-gray-600">
        Unsere Projekte verbinden Klassik mit Moderne, Tiefe mit Leichtigkeit und Herz mit Professionalität.
        Ob Konzerte, Gospel, Kammermusik oder Musikverlag – bei uns steht die Musik im Mittelpunkt.
      </p>

      <!-- Gründer:innen -->
      <section class="mt-20 sm:mt-28 bg-gradient-to-br from-orange-50 via-pink-50 to-rose-100 rounded-3xl shadow-xl px-8 py-12 mb-20">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 drop-shadow text-center mb-8">
          Unsere Lehrpersonen
        </h2>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-10 text-left max-w-4xl mx-auto">
          <!-- Esther -->
          <div class="flex-1 space-y-3 text-center">
            <img
              src="/FotosMusikschule/Gesang.png"
              alt="Esther Feingold"
              class="w-32 h-32 mx-auto rounded-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
            />
            <h3 class="text-xl font-semibold text-pink-700">Esther Feingold</h3>
            <p class="text-gray-600 text-sm">
              Sängerin, Gesangspädagogin, Komponistin und kreative Unternehmerin – 
              Esther Feingold vereint künstlerische Tiefe mit stilistischer Vielfalt. 
              Als gefragte Solistin bewegt sie sich mühelos zwischen Klassik, Jazz und zeitgenössischem Repertoire.
              Mit ihrer ausdrucksstarken Stimme, ihrem Gespür für musikalische Nuancen 
              und ihrer visionären Kraft prägt sie Konzerte, Bildungsprojekte und Produktionen gleichermaßen. 
              Mit feinsinnigem Gespür für Interpretation 
              fördert sie ihre Schüler:innen ganzheitlich – technisch, musikalisch und persönlich – 
              und gestaltet Visionen mit Herz und künstlerischem Tiefgang.
            </p>
            <a
              href="https://esther-feingold.ch/"
              target="_blank"
              class="inline-block mt-2 text-sm font-medium text-orange-600 hover:text-orange-800 underline transition"
            >
              🔗 estherfeingold.ch
            </a>
          </div>

          <!-- Osvaldo -->
          <div class="flex-1 space-y-3 text-center">
            <img
              src="/FotosMusikschule/Osvaldo.png"
              alt="Osvaldo Ovejero"
              class="w-32 h-32 mx-auto rounded-full object-cover shadow-md hover:scale-105 transition-transform duration-300"
            />
            <h3 class="text-xl font-semibold text-pink-700">Osvaldo Ovejero</h3>
            <p class="text-gray-600 text-sm">
              Osvaldo Antonio Ovejero ist ein Dirigent, Komponist und Cellist, der mit seiner tiefen musikalischen Intuition und seinem feinen Gespür für Menschen inspiriert.
              Mit Wärme, Humor und klarer künstlerischer Vision fördert er seine Schüler auf Augenhöhe, fordert sie heraus und öffnet Räume für Kreativität und Persönlichkeit. Seine Proben sind geprägt von Energie, Klarheit und echter Neugier – stets getragen von Respekt vor dem Menschen und der Musik.
              Ovejeros Werke – kraftvoll, farbenreich und geprägt von einem eigenständigen neunten-ton-basierten Stil – spiegeln eine tiefe Verbindung zwischen Emotion, Form und kultureller Vielfalt. 
            </p>
            <a
              href="https://osvaldo-ovejero.ch/"
              target="_blank"
              class="inline-block mt-2 text-sm font-medium text-orange-600 hover:text-orange-800 underline transition"
            >
              🔗 osvaldo-ovejero.com
            </a>
          </div>
        </div>
      </section>



    </div>
  </div>
</template>

<script setup>
// Clean, modern About page with soft red gradient and gradient headline
</script>

<style scoped>
body {
  font-family: 'Inter', 'Poppins', sans-serif;
}
</style>
