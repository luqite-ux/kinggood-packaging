import type { Locale } from './config'

export type Dictionary = {
  locale: Locale
  languageName: string
  navigation: {
    home: string
    products: string
    customPackaging: string
    industries: string
    about: string
    news: string
    contact: string
    requestQuote: string
    mainNavigation: string
    mobileNavigation: string
    openMenu: string
    closeMenu: string
  }
  actions: {
    requestQuote: string
    exploreProducts: string
    viewProduct: string
    readMore: string
    learnMore: string
    sendEnquiry: string
    sending: string
    sendAnotherEnquiry: string
    backToProducts: string
    backToNews: string
  }
  hero: {
    ariaLabel: string
    eyebrow: string
    title: string
    titleHighlight: string
    description: string
    metrics: {
      operating: { value: string; label: string }
      facilityArea: { value: string; label: string }
      production: { value: string; label: string }
      palletsPerDay: { value: string; label: string }
    }
  }
  footer: {
    description: string
    navigation: string
    products: string
    services: string
    customPackaging: string
    industriesServed: string
    allRightsReserved: string
    location: string
  }
  forms: {
    fullName: string
    fullNamePlaceholder: string
    company: string
    companyPlaceholder: string
    email: string
    emailPlaceholder: string
    countryRegion: string
    countryRegionPlaceholder: string
    productInterest: string
    selectProduct: string
    otherProduct: string
    message: string
    messagePlaceholder: string
    requiredField: string
    invalidEmail: string
    enquiryReceived: string
    enquiryReceivedDescription: string
    enquiryFailed: string
  }
  pages: {
    products: { eyebrow: string; title: string; description: string }
    customPackaging: { eyebrow: string; title: string; description: string }
    industries: { eyebrow: string; title: string; description: string }
    about: { eyebrow: string; title: string; description: string }
    news: { eyebrow: string; title: string; description: string }
    contact: { eyebrow: string; title: string; description: string }
  }
  errors: {
    notFoundTitle: string
    notFoundDescription: string
    unavailableTitle: string
    unavailableDescription: string
    englishFallbackNotice: string
  }
  carousel: {
    previousSlide: string
    nextSlide: string
    pause: string
    play: string
    slideLabel: string
    ariaLabel: string
    goToSlide: string
    imageAlt: {
      factoryExterior: string
      factoryProduction: string
    }
  }
  productOverlays: {
    category: string
    materials: string
    dimensions: string
    applications: string
    specifications: string
    handlingNotes: string
    requestQuote: string
    minimumOrderQuantity: string
    rfq: string
  }
}
