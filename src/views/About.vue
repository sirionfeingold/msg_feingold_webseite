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
  <div class="about-wrapper">
    <div class="about-inner">

      <!-- Überschrift mit Farbverlauf -->
      <h1
        class="about-title"
      >
        Über uns
      </h1>

      <!-- Textblock -->
      <p class="about-text-main">
        MSG Feingold steht für musikalische Qualität, kreative Programme und echte Begeisterung. Seit über 40 Jahren gestalten wir musikalische Erlebnisse in Bern und darüber hinaus – mit Solisten, Ensembles und einem feinen Gespür für Stil und Atmosphäre.
      </p>

      <!-- Zusatztext -->
      <p class="about-text-sub">
        Unsere Projekte verbinden Klassik mit Moderne, Tiefe mit Leichtigkeit und Herz mit Professionalität.
        Ob Konzerte, Gospel, Kammermusik oder Musikverlag – bei uns steht die Musik im Mittelpunkt.
      </p>

      <!-- Lehrpersonen -->
      <section class="about-teachers">
        <h2 class="about-teachers-title">
          Unsere Lehrpersonen
        </h2>

        <div class="flex flex-col sm:flex-row justify-center items-center gap-10 text-left max-w-4xl mx-auto">
          <!-- Esther -->
          <div class="teacher-card">
            <img
              src="/FotosMusikschule/Gesang.png"
              alt="Esther Feingold"
              class="teacher-img"
            />
            <h3 class="teacher-name">Esther Feingold</h3>
            <p class="teacher-bio">
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
              class="teacher-link"
            >
              🔗 estherfeingold.ch
            </a>
          </div>

          <!-- Osvaldo -->
          <div class="teacher-card">
            <img
              src="/FotosMusikschule/Osvaldo.png"
              alt="Osvaldo Ovejero"
              class="teacher-img"
            />
            <h3 class="teacher-name">Osvaldo Ovejero</h3>
            <p class="teacher-bio">
              Osvaldo Antonio Ovejero ist ein Dirigent, Komponist und Cellist, der mit seiner tiefen musikalischen Intuition und seinem feinen Gespür für Menschen inspiriert.
              Mit Wärme, Humor und klarer künstlerischer Vision fördert er seine Schüler auf Augenhöhe, fordert sie heraus und öffnet Räume für Kreativität und Persönlichkeit. Seine Proben sind geprägt von Energie, Klarheit und echter Neugier – stets getragen von Respekt vor dem Menschen und der Musik.
              Ovejeros Werke – kraftvoll, farbenreich und geprägt von einem eigenständigen neunten-ton-basierten Stil – spiegeln eine tiefe Verbindung zwischen Emotion, Form und kultureller Vielfalt. 
            </p>
            <a
              href="https://osvaldo-ovejero.ch/"
              target="_blank"
              class="teacher-link"
            >
              🔗 osvaldo-ovejero.com
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

