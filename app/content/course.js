// Metadata only: the shared lesson aggregator imports this registry.

export const courseModules = [
  {
    id: 'a1-m01', cefr: 'A1', order: 1, title: 'Kontakt aufnehmen',
    status: 'pilot', prerequisites: [], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'],
    goals: [
      { id: 'a1-m01-g01', text: 'Ich kann meinen Namen, meine Herkunft und meinen Wohnort nennen.' },
      { id: 'a1-m01-g02', text: 'Ich kann einfache Angaben in einem Formular lesen und selbst eintragen.' },
      { id: 'a1-m01-g03', text: 'Ich kann höflich mit „Sie“ nach Namen, Herkunft und Wohnort fragen.' },
      { id: 'a1-m01-g04', text: 'Ich kann meinen Namen buchstabieren und einen buchstabierten Namen verstehen.' },
      { id: 'a1-m01-g05', text: 'Ich kann mich kurz schriftlich vorstellen und eine neue Person kennenlernen.' }
    ],
    // All six slots exist; stays 'pilot' until the human review in docs/curriculum/modules/a1-m01.md.
    lessonIds: ['vorstellen', 'a1-m01-l02', 'a1-m01-l03', 'a1-m01-l04', 'a1-m01-l05', 'a1-m01-l06'], checkpointId: null
  },
  {
    id: 'a1-m02', cefr: 'A1', order: 2, title: 'Person und Familie',
    status: 'pilot', prerequisites: ['a1-m01'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'],
    goals: [
      { id: 'a1-m02-g01', text: 'Ich kann meine Familie mit einfachen Sätzen beschreiben.' },
      { id: 'a1-m02-g02', text: 'Ich kann einfache Angaben über eine Person lesen und über sie mit er oder sie sprechen.' },
      { id: 'a1-m02-g03', text: 'Ich kann Zahlen bis 100, ein Alter und eine Telefonnummer verstehen und nennen.' },
      { id: 'a1-m02-g04', text: 'Ich kann Kontaktangaben weitergeben und eine Angehörige vorstellen.' }
    ],
    // Stays 'pilot' until the human review in docs/curriculum/modules/a1-m02.md.
    lessonIds: ['a1-m02-l01', 'a1-m02-l02', 'a1-m02-l03', 'a1-m02-l04', 'a1-m02-l05', 'a1-m02-l06'], checkpointId: null
  },
  {
    id: 'a1-m03', cefr: 'A1', order: 3, title: 'Dinge und Sprache',
    status: 'pilot', prerequisites: ['a1-m02'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m03-g01', text: 'Ich kann nach einem Gegenstand fragen und ihn mit ein oder eine benennen.' },
      { id: 'a1-m03-g02', text: 'Ich kann einfache Schilder und Hinweise verstehen.' },
      { id: 'a1-m03-g03', text: 'Ich kann sagen, dass ich etwas nicht verstehe, und um Wiederholung oder Hilfe bitten.' },
      { id: 'a1-m03-g04', text: 'Ich kann einen Gegenstand mit Farbe und Größe beschreiben und mit nicht oder kein verneinen.' }
    ],
    // Stays 'pilot' until the human review in docs/curriculum/modules/a1-m03.md.
    lessonIds: ['a1-m03-l01', 'a1-m03-l02', 'a1-m03-l03', 'a1-m03-l04', 'a1-m03-l05', 'a1-m03-l06'], checkpointId: null
  },
  {
    id: 'a1-m04', cefr: 'A1', order: 4, title: 'Zeit und Termine',
    status: 'pilot', prerequisites: ['a1-m03'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m04-g01', text: 'Ich kann einen einfachen Termin verstehen und vereinbaren.' },
      { id: 'a1-m04-g02', text: 'Ich kann Öffnungszeiten und Kalenderangaben lesen.' },
      { id: 'a1-m04-g03', text: 'Ich kann Uhrzeiten, Wochentage und Monate mit um, am und im nennen.' },
      { id: 'a1-m04-g04', text: 'Ich kann einen Termin bestätigen und einen freien Termin finden.' }
    ],
    lessonIds: ['termine', 'a1-m04-l02', 'a1-m04-l03', 'a1-m04-l04', 'a1-m04-l05', 'a1-m04-l06'], checkpointId: null
  },
  {
    id: 'a1-m05', cefr: 'A1', order: 5, title: 'Tagesablauf',
    status: 'pilot', prerequisites: ['a1-m04'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'],
    goals: [
      { id: 'a1-m05-g01', text: 'Ich kann meinen Tagesablauf mit einfachen Sätzen beschreiben.' },
      { id: 'a1-m05-g02', text: 'Ich kann einen Wochenplan lesen und sagen, wie oft ich etwas mache.' },
      { id: 'a1-m05-g03', text: 'Ich kann trennbare Verben im Satz richtig benutzen.' },
      { id: 'a1-m05-g04', text: 'Ich kann zwei Pläne abstimmen und freie Zeit anbieten.' }
    ],
    lessonIds: ['a1-m05-l01', 'a1-m05-l02', 'a1-m05-l03', 'a1-m05-l04', 'a1-m05-l05', 'a1-m05-l06'], checkpointId: null
  },
  {
    id: 'a1-m06', cefr: 'A1', order: 6, title: 'Essen und Einkauf',
    status: 'pilot', prerequisites: ['a1-m05'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m06-g01', text: 'Ich kann einen einfachen Einkaufswunsch ausdrücken.' },
      { id: 'a1-m06-g02', text: 'Ich kann Preise und Angebote lesen und sagen.' },
      { id: 'a1-m06-g03', text: 'Ich kann mit Mengen und mit einen, keinen höflich bestellen.' },
      { id: 'a1-m06-g04', text: 'Ich kann nach einem fehlenden Produkt und einer Alternative fragen.' }
    ],
    lessonIds: ['einkaufen', 'a1-m06-l02', 'a1-m06-l03', 'a1-m06-l04', 'a1-m06-l05', 'a1-m06-l06'], checkpointId: null
  },
  {
    id: 'a1-m07', cefr: 'A1', order: 7, title: 'Wohnen',
    status: 'pilot', prerequisites: ['a1-m06'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m07-g01', text: 'Ich kann Räume und Möbel einfach beschreiben.' },
      { id: 'a1-m07-g02', text: 'Ich kann die wichtigsten Angaben in einer Wohnungsanzeige verstehen.' },
      { id: 'a1-m07-g03', text: 'Ich kann mit „es gibt“ sagen, was in einer Wohnung ist.' },
      { id: 'a1-m07-g04', text: 'Ich kann einfache Ortsangaben verstehen und meine Wohnung vorstellen.' }
    ],
    lessonIds: ['a1-m07-l01', 'a1-m07-l02', 'a1-m07-l03', 'a1-m07-l04', 'a1-m07-l05', 'a1-m07-l06'], checkpointId: null
  },
  {
    id: 'a1-m08', cefr: 'A1', order: 8, title: 'Wege und Verkehr',
    status: 'pilot', prerequisites: ['a1-m07'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction', 'mediation'],
    goals: [
      { id: 'a1-m08-g01', text: 'Ich kann nach dem Weg fragen und eine einfache Wegbeschreibung verstehen.' },
      { id: 'a1-m08-g02', text: 'Ich kann einen einfachen Fahrplan lesen.' },
      { id: 'a1-m08-g03', text: 'Ich kann mit „können“ höflich bitten und sagen, was möglich ist.' },
      { id: 'a1-m08-g04', text: 'Ich kann eine Fahrt zu einem Termin planen und einen Weg erklären.' }
    ],
    lessonIds: ['a1-m08-l01', 'a1-m08-l02', 'a1-m08-l03', 'a1-m08-l04', 'a1-m08-l05', 'a1-m08-l06'], checkpointId: null
  },
  {
    id: 'a1-m09', cefr: 'A1', order: 9, title: 'Gesundheit',
    status: 'pilot', prerequisites: ['a1-m08'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m09-g01', text: 'Ich kann sagen, wie es mir geht und was mir wehtut.' },
      { id: 'a1-m09-g02', text: 'Ich kann wichtige Informationen einer Arztpraxis lesen.' },
      { id: 'a1-m09-g03', text: 'Ich kann Hinweise mit müssen und sollen verstehen.' },
      { id: 'a1-m09-g04', text: 'Ich kann einen Arzttermin erbitten und Unverstandenes nachfragen.' }
    ],
    lessonIds: ['a1-m09-l01', 'a1-m09-l02', 'a1-m09-l03', 'a1-m09-l04', 'a1-m09-l05', 'a1-m09-l06'], checkpointId: null
  },
  {
    id: 'a1-m10', cefr: 'A1', order: 10, title: 'Freizeit und Einladungen',
    status: 'pilot', prerequisites: ['a1-m09'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m10-g01', text: 'Ich kann über Freizeit und Vorlieben mit gern und lieber sprechen.' },
      { id: 'a1-m10-g02', text: 'Ich kann eine einfache Einladung lesen.' },
      { id: 'a1-m10-g03', text: 'Ich kann mit wollen, und, aber, oder Wünsche verbinden.' },
      { id: 'a1-m10-g04', text: 'Ich kann zu- oder absagen und ein Treffen vereinbaren.' }
    ],
    lessonIds: ['a1-m10-l01', 'a1-m10-l02', 'a1-m10-l03', 'a1-m10-l04', 'a1-m10-l05', 'a1-m10-l06'], checkpointId: null
  },
  {
    id: 'a1-m11', cefr: 'A1', order: 11, title: 'Dienstleistungen',
    status: 'pilot', prerequisites: ['a1-m10'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m11-g01', text: 'Ich kann im Café bestellen und bezahlen.' },
      { id: 'a1-m11-g02', text: 'Ich kann einfache Formulare und Preisschilder lesen.' },
      { id: 'a1-m11-g03', text: 'Ich kann feste Wendungen mit mir und Ihnen benutzen.' },
      { id: 'a1-m11-g04', text: 'Ich kann ein Anliegen an einer Servicestelle klären.' }
    ],
    lessonIds: ['a1-m11-l01', 'a1-m11-l02', 'a1-m11-l03', 'a1-m11-l04', 'a1-m11-l05', 'a1-m11-l06'], checkpointId: null
  },
  {
    id: 'a1-m12', cefr: 'A1', order: 12, title: 'Gestern und morgen',
    status: 'pilot', prerequisites: ['a1-m11'], skills: ['reading', 'listening', 'writing', 'speaking', 'interaction'],
    goals: [
      { id: 'a1-m12-g01', text: 'Ich kann kurz über gestern berichten.' },
      { id: 'a1-m12-g02', text: 'Ich kann eine kurze Nachricht über Vergangenes lesen.' },
      { id: 'a1-m12-g03', text: 'Ich kann das Perfekt häufiger Verben sowie war und hatte benutzen.' },
      { id: 'a1-m12-g04', text: 'Ich kann von einem Erlebnis erzählen und einen Plan machen.' }
    ],
    lessonIds: ['gestern', 'a1-m12-l02', 'a1-m12-l03', 'a1-m12-l04', 'a1-m12-l05', 'a1-m12-l06'], checkpointId: null
  }
];
