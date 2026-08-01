import type { Dictionary } from '../types'

const en = {
  locale: 'en',
  languageName: 'English',
  navigation: {
    home: 'Home', products: 'Products', customPackaging: 'Custom Packaging', industries: 'Industries',
    about: 'About', news: 'News', contact: 'Contact', requestQuote: 'Request a Quote',
    mainNavigation: 'Main navigation', mobileNavigation: 'Mobile navigation', openMenu: 'Open menu', closeMenu: 'Close menu',
  },
  actions: {
    requestQuote: 'Request a Quote', exploreProducts: 'Explore Products', viewProduct: 'View product',
    readMore: 'Read more', learnMore: 'Learn more', sendEnquiry: 'Send enquiry', sending: 'Sending…',
    sendAnotherEnquiry: 'Send another enquiry', backToProducts: 'Back to products', backToNews: 'Back to news',
  },
  hero: {
    ariaLabel: 'Hero', eyebrow: 'Kinggood Packaging Materials (Nantong) Co., Ltd.',
    title: 'Engineered Wood Packaging', titleHighlight: 'for Global Logistics',
    description: 'KINGGOOD designs and manufactures wooden pallets, heavy-duty wood crates and cable reels for industrial transportation, warehousing and export logistics. Solutions can be configured around cargo dimensions, load, handling equipment and destination requirements.',
    metrics: {
      operating: { value: 'Since 2010', label: 'In Operation' },
      facilityArea: { value: '36,300 m²', label: 'Facility Area' },
      production: { value: '5 Workshops', label: 'Production' },
      palletsPerDay: { value: '3,000+', label: 'Pallets / Day' },
    },
  },
  footer: {
    description: 'Kinggood Packaging Materials (Nantong) Co., Ltd. — manufacturers of wooden pallets, heavy-duty wood crates and cable reels for global logistics. Founded 2010.',
    navigation: 'Navigation', products: 'Products', services: 'Services', customPackaging: 'Custom Packaging',
    industriesServed: 'Industries Served', allRightsReserved: 'All rights reserved.', location: 'Nantong, Jiangsu, China',
  },
  forms: {
    fullName: 'Full name', fullNamePlaceholder: 'Your name', company: 'Company', companyPlaceholder: 'Company name',
    email: 'Email', emailPlaceholder: 'you@company.com', countryRegion: 'Country / Region', countryRegionPlaceholder: 'e.g. Germany',
    productInterest: 'Product of interest', selectProduct: 'Select a product', otherProduct: 'Other / Not sure',
    message: 'Message', messagePlaceholder: 'Tell us about your cargo, dimensions, destination and expected volume.',
    requiredField: '{field} is required.', invalidEmail: 'Enter a valid email address.',
    enquiryReceived: 'Thank you for your enquiry', enquiryReceivedDescription: 'Our export team has received your message and will get back to you within one business day.',
    enquiryFailed: 'We could not send your enquiry. Please try again or email kinggood66@163.com.',
  },
  pages: {
    products: { eyebrow: 'Our Products', title: 'Wood Packaging for Every Logistics Challenge', description: 'Explore engineered pallets, heavy-duty crates and cable reels made for industrial handling and export.' },
    customPackaging: { eyebrow: 'Custom Packaging', title: 'Packaging Built Around Your Cargo', description: 'Tell us your cargo, route and handling requirements for a practical wood packaging proposal.' },
    industries: { eyebrow: 'Industries', title: 'Built for Demanding Supply Chains', description: 'Reliable packaging for industrial manufacturing, machinery, logistics and export operations.' },
    about: { eyebrow: 'About KINGGOOD', title: 'A Wood Packaging Partner for Global Logistics', description: 'From timber processing to finished packaging, we support dependable industrial deliveries.' },
    news: { eyebrow: 'News', title: 'KINGGOOD Updates', description: 'Company news, packaging guidance and logistics insights.' },
    contact: { eyebrow: 'Contact', title: 'Start Your Packaging Enquiry', description: 'Share your cargo and destination requirements with our export team.' },
  },
  errors: {
    notFoundTitle: 'Page not found', notFoundDescription: 'The page you requested is unavailable or may have moved.',
    unavailableTitle: 'Content unavailable', unavailableDescription: 'Please try again shortly or contact our team for assistance.',
    englishFallbackNotice: 'This article is currently available in English.',
  },
  carousel: {
    previousSlide: 'Previous slide', nextSlide: 'Next slide', pause: 'Pause carousel', play: 'Play carousel', slideLabel: 'Slide',
    ariaLabel: 'Factory image carousel', goToSlide: 'Go to slide {slide}',
    imageAlt: { factoryExterior: 'Exterior view of the KINGGOOD factory', factoryProduction: 'KINGGOOD factory production workshop' },
  },
  productOverlays: {
    category: 'Category', materials: 'Materials', dimensions: 'Dimensions', applications: 'Applications', specifications: 'Specifications',
    handlingNotes: 'Handling Notes', requestQuote: 'Request a Quote', minimumOrderQuantity: 'MOQ', rfq: 'RFQ',
  },
} satisfies Dictionary

export default en
