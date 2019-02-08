const questionnaire = {
  showTitle: false,
  title: "Umfrage zur Wohnungssituation",
  questionTitleTemplate: "{title}",
  showProgressBar: "top",
  clearInvisibleValues: "onHidden",
  elements: [
    {
      type: "radiogroup",
      name: "hgb",
      title: "Studierst oder arbeitest du an der HGB?",
      choices: [
        {
          value: "ja",
          text: "Ja",
          replacementMap: {
            "temp_hgb": "bist"
          }
        },
        {
          value: "ehemalige",
          text: "Ehemalige_r",
          replacementMap: {
            "temp_hgb": "warst",
            "temp_job": " jetzt"
          }
        },
        {
          value: "nein",
          text: "Nein",
          replacementMap: {
            "temp_job": ""
          }
        }
      ]
    },
    {
      type: "radiogroup",
      name: "hgb-position",
      visibleIf: "{hgb} notempty and {hgb} != \"nein\"",
      title: "In welcher Position [[hgb:temp_hgb]] du an der HGB?",
      choices: [
        {
          value: "student",
          text: "Student_in"
        },
        {
          value: "mitarbeiter",
          text: "Mitarbeiter_in"
        },
        {
          value: "prof",
          text: "Professor_in"
        }
      ]
    },
    {
      type: "radiogroup",
      name: "other-job-type",
      visibleIf: `{hgb} = "nein" or ({hgb} = "ehemalige" and {hgb-position} notempty)`,
      title: "Was machst du[[hgb:temp_job]]?",
      choices: [
        {
          value: "arbeiten",
          text: "Arbeiten (angestellt)",
          replacementMap: {
            "du": "arbeitest"
          }
        },
        {
          value: "frei",
          text: "Arbeiten (selbstständig / frei)",
          replacementMap: {
            "du": "machst"
          }
        },
        {
          value: "studieren",
          text: "Studieren",
          replacementMap: {
            "du": "studierst"
          }
        },
        {
          value: "sonstige",
          text: "Sonstige",
          replacementMap: {
            "du": "machst"
          }
        },
      ]
    },
    {
      type: "text",
      name: "other-position",
      visibleIf: `{other-job-type} notempty`,
      title: "Was [[other-job-type:du]] du?"
    },
    {
      type: "text",
      name: "other-institution",
      visibleIf: `{other-position} notempty and {other-job-type} != "frei" and {other-job-type} != "sonstige"`,
      title: "In welcher Stadt [[other-job-type:du]] du?"
    },
    {
      visibleIf: `({hgb} = "ja" and {hgb-position} notempty) or {other-institution} notempty or ({other-position} notempty 
      and ({other-job-type} = "frei" or {other-job-type} = "sonstige"))`,
      type: "radiogroup",
      name: "wohnort",
      title: "Wo wohnst du?",
      description: "Im Sinne des persönlich empfundenen Hauptwohnsitzes.",
      choices: [
        {
          value: "leipzig",
          text: "Leipzig"
        },
        {
          value: "berlin",
          text: "Berlin"
        },
        {
          value: "halle",
          text: "Halle"
        },
        {
          value: "andere",
          text: "Andere"
        }
      ]
    },
    {
      type: "text",
      name: "other-wohnort",
      visibleIf: "{wohnort} = \"andere\"",
      title: "Wo denn?"
    },
    {
      visibleIf: "{hgb} = \"ja\" and {wohnort} notempty and ({wohnort} != \"andere\" or {other-wohnort} notempty)",
      type: "text",
      name: "fahrzeit",
      title: "Wie viele Minuten brauchst du von dort zur HGB?",
      description: `Für Pendler_innen: Diese Frage bezieht sich auf oben benannten "Hauptwohnsitz", nicht deine eventuell existierende Unterkunft in Leipzig.`,
      inputType: "number",
      unit: "Minuten"
    },
    {
      visibleIf: "({hgb} notempty and {hgb} != \"ja\" and {wohnort} notempty and ({wohnort} != \"andere\" or {other-wohnort} notempty)) or {fahrzeit} notempty",
      type: "radiogroup",
      name: "wohnungstyp",
      title: "In was für einer Art von Wohnung lebst du?",
      choices: [
        {
          value: "wg",
          text: "Wohngemeinschaft (WG)",
          replacementMap: {
            nominativ: "die WG",
            dativ: "der WG"
          }
        },
        {
          value: "wohnung",
          text: "Wohnung (alleine oder mit Partner/Familie)",
          replacementMap: {
            nominativ: "die Wohnung",
            dativ: "der Wohnung"
          }
        },
        {
          value: "hausprojekt",
          text: "Hausprojekt",
          replacementMap: {
            nominativ: "das Hausprojekt",
            dativ: "dem Hausprojekt"
          }
        },
        {
          value: "atelier",
          text: "Atelier",
          replacementMap: {
            nominativ: "das Atelier",
            dativ: "dem Atelier"
          }
        },
        {
          value: "haus",
          text: "Haus/Haushälfte",
          replacementMap: {
            nominativ: "das Haus / die Haushälfte",
            dativ: "dem Haus / der Haushälfte"
          }
        }
      ]
    },
    {
      type: "radiogroup",
      name: "zugelassen",
      visibleIf: "{wohnungstyp} = \"atelier\"",
      title: "Ist das Atelier offiziell als Wohnraum zugelassen?",
      choices: [
        {
          value: "ja",
          text: "Ja"
        },
        {
          value: "nein",
          text: "Nein"
        }
      ]
    },
    {
      type: "radiogroup",
      name: "atelier-kochen",
      visibleIf: "{zugelassen} notempty",
      title: "Hat das Atelier eine Kochmöglichkeit?",
      choices: [
        {
          value: "ja",
          text: "Ja"
        },
        {
          value: "nein",
          text: "Nein"
        }
      ]
    },
    {
      type: "radiogroup",
      name: "atelier-duschen",
      visibleIf: "{atelier-kochen} notempty",
      title: "Hat das Atelier eine Duschmöglichkeit?",
      choices: [
        {
          value: "ja",
          text: "Ja"
        },
        {
          value: "nein",
          text: "Nein"
        }
      ]
    },
    {
      visibleIf: `{wohnungstyp} notempty and ({wohnungstyp} != "atelier" or {atelier-duschen} notempty)`,
      type: "text",
      inputType: "number",
      name: "people",
      title: "Wie viele Menschen *inklusive dir* wohnen in [[wohnungstyp:dativ]]?"
    },
    {
      visibleIf: "{people} notempty and {people} > 1",
      type: "checkbox",
      name: "mit-wem",
      title: "In welchem formalen Verhältnis stehst du zu deinen Mitbewohner_innen?",
      description: "Mehrfachnennungen sind möglich.",
      choices: [
        {
          value: "mitbewohner",
          text: "Mitbewohner\\_innen / Freund\\_innen"
        },
        {
          value: "partner",
          text: "Partner_in"
        },
        {
          value: "familie",
          text: "Kinder"
        },
        {
          value: "verwandte",
          text: "Verwandte (auch Eltern)"
        },
      ]
    },
    {
      visibleIf: "{people} = 1 or {mit-wem} notempty",
      type: "radiogroup",
      name: "vertrag",
      title: "In was für einem Vertragsverhältnis bist du?",
      choices: [
        {
          value: "hauptmieter",
          text: "Hauptmieter_in"
        },
        {
          value: "untermieter-unbefristet",
          text: "Untermieter_in (unbefristet)"
        },
        {
          value: "untermieter-befristet",
          text: "Untermieter\\_in (befristet) / Zwischenmieter\\_in"
        },
        {
          value: "eigentümer",
          text: "Eigentümer_in"
        },
        {
          value: "gewerbe",
          text: "Gewerbemietvertrag"
        },
        {
          value: "kein",
          text: "Kein Vertrag"
        }
      ]
    },
    {
      visibleIf: `{vertrag} notempty and ({wohnungstyp} = "wg" or {wohnungstyp} = "wohnung")`,
      type: "text",
      inputType: "number",
      name: "zimmer",
      title: "Wie viele Zimmer hat [[wohnungstyp:nominativ]]?",
      description: "Dies ist exklusive Badezimmer, Küche, oder Flur."
    },
    {
      visibleIf: `{zimmer} notempty or ({vertrag} notempty and {wohnungstyp} != "wg" and {wohnungstyp} != "wohnung")`,
      type: "text",
      inputType: "number",
      name: "platz-gesamt",
      title: "Wie viele Quadratmeter hat [[wohnungstyp:nominativ]]?",
      unit: "m²"
    },
    {
      visibleIf: `{platz-gesamt} notempty and ({wohnungstyp} = "wg" or {wohnungstyp} = "hausprojekt")`,
      type: "text",
      inputType: "number",
      name: "platz-privat",
      title: "Wie viele Quadratmeter hast du für dich?",
      description: "Dies bezieht sich auf Raum den nur du verwendest - etwa ein Zimmer in einer WG, aber nicht das Wohnzimmer.",
      unit: "m²"
    },
    {
      visibleIf: `{platz-privat} notempty or ({wohnungstyp} != "wg" and {wohnungstyp} != "hausprojekt" and {platz-gesamt} notempty)`,
      type: "text",
      inputType: "number",
      name: "miete",
      title: "Wie viel kostet dich deine Wohnsituation monatlich, inklusive allem?",
      description: "\"Inklusive allem\" bezieht sich auf Kaltmiete, Nebenkosten, Heizung, Strom, Gas, " +
      "Internet, et cetera. Pendelkosten oder ähnliches bitte hier nicht einrechnen.",
      unit: "€"
    },
    {
      visibleIf: `{miete} notempty`,
      type: "text",
      inputType: "number",
      name: "einkommen",
      title: "Wie viel Einkommen hast du monatlich?",
      description: "Dies schließt BAföG, Stipendien, Wohngeld, Geld von deinen Eltern, et cetera ein - einfach alles. " +
      "Diese Frage ist notwendig um den Anteil der Miete am Einkommen zu ermitteln, einem in der " +
      "aktuellen Forschung wichtigen Wert.",
      unit: "€"
    },
    {
      type: "radiogroup",
      name: "atelier",
      visibleIf: `{einkommen} notempty and {wohnungstyp} != "atelier"`,
      title: "Hast du ein Atelier?",
      description: "Atelier wäre an dieser Stelle etwa ein separater Raum in einer Wohnung, ein mit Kommiliton_innen gemietetes Objekt, oder ähnliches. " +
      "Nicht gemeint ist etwa der Klassenraum.",
      choices: [
        {
          value: "ja",
          text: "Ja"
        },
        {
          value: "nein",
          text: "Nein"
        },
        {
          value: "nein-nein",
          text: "Nein (und ich hätte auch keinen Bedarf)"
        }
      ]
    },
    {
      visibleIf: `{atelier} = "ja"`,
      type: "text",
      inputType: "number",
      name: "atelier-miete",
      title: "Wie viel kostet dich deine Ateliersituation monatlich, inklusive allem?",
      description: "\"Inklusive allem\" bezieht sich auf Kaltmiete, Nebenkosten, Heizung, Strom, Gas, " +
      "Internet, et cetera. Pendelkosten oder ähnliches bitte hier nicht einrechnen.",
      unit: "€"
    },
    {
      visibleIf: `({atelier} notempty and {atelier} != "ja") or {atelier-miete} notempty or {wohnungstyp} = "atelier" and {einkommen} notempty`,
      type: "html",
      name: "submit",
      html: "<h1>Fertig?</h1>" +
        "Du hast alle Fragen beantwortet!<br/>" +
        "Wenn du nichts mehr korrigieren möchtest, klicke bitte auf 'Absenden'." +
        "<div style='text-align: right; margin-top: 1rem;'>" +
        "  <button type='button' onclick='window.npm_submit()'>Absenden</button>" +
        "</div>"
    }
  ],
  "intro": `
          <h1>Hallo.</h1>
          Dies ist eine Umfrage von Clemens Schöll aus der Medienkunst der HGB Leipzig zur Wohnungssituation, insbesondere von Menschen
          an der HGB Leipzig.<br/>
          Das Beantworten der Fragen dauert etwa fünf Minuten.
          Die Umfrage ist anonym und deine Daten werden rücksichtsvoll behandelt.<br/>
          <div class="small">
            <p>
              Die gesammelten Daten dienen primär der künstlerischen Recherche.
            </p>
            <p>
              Es ist ein Ziel die Daten öffentlich zugänglich zu machen. Dieser Vorsatz liegt jedoch unter Vorbehalt einer
              Privatsphäre-kompatiblen Möglichkeit (insbesondere respektive Deanonymisierung) der Veröffentlichung.
            </p>
            <p>
              Eine Weitergabe an Dritte (abgesehen von einer möglichen Öffentlichkeit wie oben beschrieben) findet nicht statt.
            </p>
            <p>
              Dies ist keine in Auftrag gegebene Umfrage / Studie. Es besteht kein Anspruch von Wissenschaftlichkeit.
            </p>
            <p>
              Diese Webseite verwendet keine Cookies.
            </p>
            <p>
              Dieses Projekt ist Open Source.
              Hier findest du den Quelltext für
              <a href="https://github.com/neopostmodern/fragen">die Webseite</a>,
              <a href="https://github.com/neopostmodern/antworten">den Server</a>,
              und für <a href="https://github.com/neopostmodern/antworten/blob/master/questionnaire.js">diesen Fragebogen</a>.
            </p>
            <p>
              Bei Fragen oder Zweifeln <a href="mailto:schoell@hgb-leipzig.de">schreib mir eine E-Mail</a>!
            </p>
          </div>`,
  "outro": `
          <h1>Vielen Dank für deine Teilnahme.</h1>
          <div className="normal">
            <h3>Was passiert jetzt?</h3>
            Erstmal nichts. Nachdem ich die Daten gesammelt und ausgewertet habe, werde ich überlegen,
            ob und wie ich die Daten in einer Privatsphäre-schützenden Form veröffentlichen kann.<br/>
            Spätestens zur Ausstellung <i>Verletzbare Subjekte</i> in der HGB Galerie wird ein indirekter Output gezeigt.
            <h3>Kann ich der Verwendung meiner Daten noch widersprechen?</h3>
            Ja, klar. Schicke mir <a href="mailto:schoell@hgb-leipzig.de">eine E-Mail</a> mit diesem Code: <code>{uuid}</code>
          </div>`
};

questionnaire.elements.forEach((element) => {
  if (typeof element.isRequired === 'undefined' && element.type !== "html") {
    element.isRequired = true;
  }
})

module.exports = questionnaire;