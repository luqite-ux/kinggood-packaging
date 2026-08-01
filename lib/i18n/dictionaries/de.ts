import type { Dictionary } from '../types'

const de = {
  locale: 'de',
  languageName: 'Deutsch',
  navigation: {
    home: 'Startseite', products: 'Produkte', customPackaging: 'Maßgeschneiderte Verpackungen', industries: 'Branchen', about: 'Über uns', news: 'Aktuelles', contact: 'Kontakt', requestQuote: 'Angebot anfordern',
    mainNavigation: 'Hauptnavigation', mobileNavigation: 'Mobile Navigation', openMenu: 'Menü öffnen', closeMenu: 'Menü schließen',
  },
  actions: {
    requestQuote: 'Angebot anfordern', exploreProducts: 'Produkte entdecken', viewProduct: 'Produkt ansehen', readMore: 'Mehr erfahren', learnMore: 'Mehr erfahren',
    sendEnquiry: 'Anfrage senden', sending: 'Wird gesendet…', sendAnotherEnquiry: 'Weitere Anfrage senden', backToProducts: 'Zurück zu den Produkten', backToNews: 'Zurück zu Aktuelles',
  },
  hero: {
    ariaLabel: 'Titelbereich', eyebrow: 'Kinggood Packaging Materials (Nantong) Co., Ltd.', title: 'Technische Holzverpackungen', titleHighlight: 'für die globale Logistik',
    description: 'KINGGOOD entwickelt und produziert Holzpaletten, Schwerlast-Holzkisten und Kabeltrommeln für industrielle Transporte, Lagerhaltung und Exportlogistik. Lösungen lassen sich an Frachtmaße, Lasten, Fördertechnik und Anforderungen des Bestimmungslands anpassen.',
    metrics: {
      operating: { value: 'Seit 2010', label: 'Im Betrieb' },
      facilityArea: { value: '36.300 m²', label: 'Werksfläche' },
      production: { value: '5 Werkstätten', label: 'Produktion' },
      palletsPerDay: { value: '3.000+', label: 'Paletten / Tag' },
    },
  },
  footer: {
    description: 'Kinggood Packaging Materials (Nantong) Co., Ltd. — Hersteller von Holzpaletten, Schwerlast-Holzkisten und Kabeltrommeln für die globale Logistik. Gegründet 2010.',
    navigation: 'Navigation', products: 'Produkte', services: 'Leistungen', customPackaging: 'Maßgeschneiderte Verpackungen', industriesServed: 'Branchen', allRightsReserved: 'Alle Rechte vorbehalten.', location: 'Nantong, Jiangsu, China',
  },
  forms: {
    fullName: 'Vollständiger Name', fullNamePlaceholder: 'Ihr Name', company: 'Unternehmen', companyPlaceholder: 'Unternehmensname',
    email: 'E-Mail', emailPlaceholder: 'you@company.com', countryRegion: 'Land / Region', countryRegionPlaceholder: 'z. B. Deutschland',
    productInterest: 'Gewünschtes Produkt', selectProduct: 'Produkt auswählen', otherProduct: 'Sonstiges / Noch nicht sicher',
    message: 'Nachricht', messagePlaceholder: 'Beschreiben Sie Ihre Fracht, Maße, den Bestimmungsort und die erwartete Menge.',
    requiredField: '{field} ist erforderlich.', invalidEmail: 'Geben Sie eine gültige E-Mail-Adresse ein.',
    enquiryReceived: 'Vielen Dank für Ihre Anfrage', enquiryReceivedDescription: 'Unser Exportteam hat Ihre Nachricht erhalten und meldet sich innerhalb eines Werktags bei Ihnen.',
    enquiryFailed: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an kinggood66@163.com.',
  },
  pages: {
    products: { eyebrow: 'Unsere Produkte', title: 'Holzverpackungen für jede Logistikaufgabe', description: 'Entdecken Sie technische Paletten, Schwerlastkisten und Kabeltrommeln für industrielle Handhabung und Export.' },
    customPackaging: { eyebrow: 'Maßgeschneiderte Verpackungen', title: 'Verpackung passend zu Ihrer Fracht', description: 'Nennen Sie uns Fracht, Route und Handhabungsanforderungen für einen praxisgerechten Verpackungsvorschlag aus Holz.' },
    industries: { eyebrow: 'Branchen', title: 'Für anspruchsvolle Lieferketten gebaut', description: 'Zuverlässige Verpackungen für Industrie, Maschinenbau, Logistik und Export.' },
    about: { eyebrow: 'Über KINGGOOD', title: 'Ihr Partner für Holzverpackungen in der globalen Logistik', description: 'Von der Holzverarbeitung bis zur fertigen Verpackung unterstützen wir zuverlässige Industrieauslieferungen.' },
    news: { eyebrow: 'Aktuelles', title: 'Neuigkeiten von KINGGOOD', description: 'Unternehmensnachrichten, Verpackungshinweise und Logistikeinblicke.' },
    contact: { eyebrow: 'Kontakt', title: 'Starten Sie Ihre Verpackungsanfrage', description: 'Teilen Sie unserem Exportteam Ihre Fracht- und Bestimmungsanforderungen mit.' },
  },
  errors: {
    notFoundTitle: 'Seite nicht gefunden', notFoundDescription: 'Die angeforderte Seite ist nicht verfügbar oder wurde möglicherweise verschoben.',
    unavailableTitle: 'Inhalt nicht verfügbar', unavailableDescription: 'Bitte versuchen Sie es in Kürze erneut oder kontaktieren Sie unser Team.',
    englishFallbackNotice: 'Dieser Artikel ist derzeit nur auf Englisch verfügbar.',
  },
  carousel: {
    previousSlide: 'Vorheriges Bild', nextSlide: 'Nächstes Bild', pause: 'Karussell anhalten', play: 'Karussell starten', slideLabel: 'Folie',
    ariaLabel: 'Karussell mit Fabrikbildern', goToSlide: 'Zu Folie {slide} wechseln',
    imageAlt: { factoryExterior: 'Außenansicht der KINGGOOD Fabrik', factoryProduction: 'Produktionswerkstatt der KINGGOOD Fabrik' },
  },
  productOverlays: {
    category: 'Kategorie', materials: 'Materialien', dimensions: 'Abmessungen', applications: 'Anwendungen', specifications: 'Spezifikationen', handlingNotes: 'Hinweise zur Handhabung',
    requestQuote: 'Angebot anfordern', minimumOrderQuantity: 'MOQ', rfq: 'RFQ',
  },
} satisfies Dictionary

export default de
