import type { Locale } from './config'

export type LocalizedCategory = {
  key: 'pallets' | 'crates' | 'cable-reels'
  name: string
  eyebrow: string
  description: string
}

export type LocalizedStat = {
  value: string
  label: string
  suffix: string
  note?: string
}

export type LocalizedCard = { title: string; description: string; icon: string }
export type LocalizedStep = { step: string; title: string; description: string }
export type LocalizedIndustry = {
  key: string
  title: string
  description: string
  icon: string
}
export type LocalizedFaq = { q: string; a: string }

export type LocalizedContent = {
  shared: {
    brandLockup: string
    footerProducts: { slug: string; name: string }[]
    categories: LocalizedCategory[]
    stats: LocalizedStat[]
    advantages: LocalizedCard[]
    customPackagingSteps: LocalizedStep[]
    industries: LocalizedIndustry[]
    faqPreview: LocalizedFaq[]
  }
  home: {
    marquee: string[]
    products: {
      label: string
      title: string
      description: string
      productListLabel: string
      viewAll: string
    }
    metricsAriaLabel: string
    why: { label: string; title: string }
    process: { label: string; title: string; description: string; details: string; stepLabel: string }
    industries: { label: string; title: string; all: string }
    facility: {
      label: string
      title: string
      description: string
      images: { factoryExterior: string; productionWorkshop: string; warehouse: string }
      more: string
    }
    quality: {
      label: string
      title: string
      description: string
      ariaLabel: string
      points: string[]
      imageAlt: string
    }
    faq: { label: string; title: string }
    cta: { title: string; description: string }
  }
  products: { ctaTitle: string; ctaDescription: string }
  productDetail: {
    breadcrumb: string
    galleryView: string
    overview: string
    advantages: string
    specificationNote: string
    related: string
  }
  about: {
    workshopImageAlt: string
    storyLabel: string
    storyTitle: string
    storyParagraphs: string[]
    values: string[]
    statsAriaLabel: string
    facilityLabel: string
    facilityTitle: string
    facilityDescription: string
    gallery: { alt: string; caption: string }[]
    capabilityLabel: string
    capabilityTitle: string
    capabilities: { title: string; description: string; icon: string }[]
    ctaTitle: string
    ctaDescription: string
  }
  contact: {
    phoneWeChat: string
    businessHours: string
    businessHoursValue: string
    introduction: string
  }
  customPackaging: {
    introLabel: string
    introTitle: string
    introParagraphs: string[]
    capabilities: string[]
    warehouseImageAlt: string
    processLabel: string
    processTitle: string
    processDescription: string
    productsLabel: string
    productsTitle: string
    productCards: { title: string; description: string; href: string }[]
    ctaTitle: string
    ctaDescription: string
  }
  industries: {
    label: string
    introTitle: string
    introDescription: string
    relatedProducts: string
    requirementsLabel: string
    requirementsTitle: string
    requirementsDescription: string
    requirements: { title: string; description: string }[]
    ctaTitle: string
    ctaDescription: string
  }
}

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
    languageSelection: string
    logoAlt: string
  }
  languages: Record<Locale, { shortLabel: string; fullName: string }>
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
    websiteEnquiry: string
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
  content: LocalizedContent
}
