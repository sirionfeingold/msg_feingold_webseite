// src/data/instrumentData.ts
/**
 * instrumentData.ts – Daten für die Instrumentenseiten der Musikschule
 *
 * Beschreibung:
 * Dieses Array enthält strukturierte Informationen zu allen angebotenen Instrumenten.
 * Jede Eintragung repräsentiert ein Instrument mit:
 * – `slug`: URL-tauglicher Name für Routing (z. B. /instrument/klavier)
 * – `name`: Anzeigename des Instruments
 * – `description`: Mehrzeilige Beschreibung für die Detailseite
 * – `image`: Pfad zum Bild in /public oder Assets-Ordner
 *
 * Verwendung:
 * Diese Datenquelle wird in den Instrumentenseiten dynamisch genutzt, um Inhalte
 * anhand der Route (`route.params.name`) zu laden.
 *
 * Vorteil:
 * Einfache zentrale Pflege der Inhalte – neue Instrumente lassen sich leicht hinzufügen.
 */


export const instruments = [
  {
    slug: "klavier",
    name: "Klavier",
    description: `
      Das Klavier ist ein kraftvolles Ausdrucksmittel für Emotion, Virtuosität und Harmonie. 
      Unser Unterricht vermittelt Technik, musikalisches Verständnis und kreatives Spiel in Klassik, Jazz oder Pop.
      Ob du Chopin spielen oder moderne Songs begleiten willst – wir begleiten dich auf deinem Weg mit Geduld und Inspiration.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Klavier.png"
  },
  {
    slug: "gesang",
    name: "Gesang",
    description: `
      Die eigene Stimme ist das persönlichste Instrument überhaupt.
      Unser Gesangsunterricht stärkt Klangbewusstsein, Atemtechnik, Ausdruckskraft und Selbstvertrauen.
      Ob Klassik, Musical oder Pop – wir begleiten dich dabei, 
      deine Stimme zu entdecken, sie gesund zu entfalten und deinen 
      ganz persönlichen Klang zu finden.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Gesang.png"
  },
  {
    slug: "gitarre",
    name: "Gitarre",
    description: `
      Die Gitarre begeistert als vielseitiges Instrument – mal sanft, mal rockig, mal rhythmisch.
      In unserem Unterricht lernst du Zupf- und Schlagtechniken, Akkorde, Notenlesen und Improvisation – individuell auf dich abgestimmt.
      Ideal für Songwriting, Bandspiel oder klassisches Repertoire.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Gitarre.png"
  },
  {
    slug: "blockfloete",
    name: "Blockflöte",
    description: `
      Die Blockflöte ist nicht nur ein Einstiegsinstrument – sie ist ein klangvolles Holzblasinstrument mit großer Ausdruckstiefe.
      In unserem Unterricht erlebst du die ganze Bandbreite: von barocker Literatur bis hin zu zeitgenössischen Klängen.
      Ideal für Kinder und Erwachsene, die musikalisch wachsen möchten.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Blockfloete.png"
  },
  {
    slug: "klarinette",
    name: "Klarinette",
    description: `
      Die Klarinette verbindet warme Tiefe mit spritziger Virtuosität – sie ist zu Hause in Klassik, Klezmer, Jazz und Filmmusik.
      Unser Unterricht bietet Technikaufbau, Tonbildung und Ensemblepraxis – individuell auf dein Niveau und Ziel abgestimmt.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Klarinette.png"
  },
  {
    slug: "saxophon",
    name: "Saxophon",
    description: `
      Das Saxophon ist ein Ausdruck purer Emotion – weich, kraftvoll, flexibel.
      Ob du Jazz, Funk oder Pop liebst: Unser Unterricht bringt dir Atemtechnik, Improvisation und Groove näher.
      Ein Instrument für alle, die sich musikalisch entfalten wollen.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Saxophon.png"
  },
  {
    slug: "violine",
    name: "Violine",
    description: `
      Die Violine ist das Herz vieler Musikstile: von Solo-Literatur über Kammermusik bis hin zum modernen Crossover.
      Mit Gefühl und Technik führen wir dich zum vollen Klang – ob du gerade beginnst oder bereits fortgeschritten bist.
      Präzision, Ausdruck, Spielfreude – dafür steht unser Unterricht.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Violine.png"
  },
  {
    slug: "violoncello",
    name: "Violoncello",
    description: `
      Das Cello – vielseitig, ausdrucksstark, klangvoll.
      Unser Unterricht legt den Fokus auf eine gesunde Spielhaltung, präzises Hören und musikalischen Ausdruck.
      Ob Anfänger:in oder Fortgeschrittene:r – wir vermitteln Technik mit System und musikalischem Verständnis.
    `,
    image: "/msg_feingold_webseite/FotosMusikschule/Violoncello.JPG"
  }
];
