import type { Dictionary } from '../types'
import { localizedContent } from '../content.ts'

const es = {
  locale: 'es',
  languageName: 'Español',
  navigation: {
    home: 'Inicio', products: 'Productos', customPackaging: 'Embalaje a medida', industries: 'Industrias', about: 'Nosotros', news: 'Noticias', contact: 'Contacto', requestQuote: 'Solicitar presupuesto',
    mainNavigation: 'Navegación principal', mobileNavigation: 'Navegación móvil', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú',
    languageSelection: 'Selección de idioma', logoAlt: 'Inicio de KINGGOOD',
  },
  languages: {
    en: { shortLabel: 'EN', fullName: 'Inglés' }, zh: { shortLabel: '中文', fullName: 'Chino simplificado' },
    de: { shortLabel: 'DE', fullName: 'Alemán' }, es: { shortLabel: 'ES', fullName: 'Español' },
  },
  actions: {
    requestQuote: 'Solicitar presupuesto', exploreProducts: 'Explorar productos', viewProduct: 'Ver producto', readMore: 'Leer más', learnMore: 'Más información',
    sendEnquiry: 'Enviar consulta', sending: 'Enviando…', sendAnotherEnquiry: 'Enviar otra consulta', backToProducts: 'Volver a productos', backToNews: 'Volver a noticias',
  },
  hero: {
    ariaLabel: 'Sección principal', eyebrow: 'Kinggood Packaging Materials (Nantong) Co., Ltd.', title: 'Embalaje de madera diseñado', titleHighlight: 'para la logística global',
    description: 'KINGGOOD diseña y fabrica palés de madera, cajas de madera de alta resistencia y carretes para cables destinados al transporte industrial, el almacenamiento y la logística de exportación. Las soluciones se pueden configurar según las dimensiones de la carga, el peso, los equipos de manipulación y los requisitos del destino.',
    metrics: {
      operating: { value: 'Desde 2010', label: 'En operación' },
      facilityArea: { value: '36.300 m²', label: 'Superficie de planta' },
      production: { value: '5 talleres', label: 'Producción' },
      palletsPerDay: { value: '3.000+', label: 'Palés / día' },
    },
  },
  footer: {
    description: 'Kinggood Packaging Materials (Nantong) Co., Ltd. — fabricante de palés de madera, cajas de madera de alta resistencia y carretes para cables para la logística global. Fundada en 2010.',
    navigation: 'Navegación', products: 'Productos', services: 'Servicios', customPackaging: 'Embalaje a medida', industriesServed: 'Industrias atendidas', allRightsReserved: 'Todos los derechos reservados.', location: 'Nantong, Jiangsu, China',
  },
  forms: {
    fullName: 'Nombre completo', fullNamePlaceholder: 'Su nombre', company: 'Empresa', companyPlaceholder: 'Nombre de la empresa',
    email: 'Correo electrónico', emailPlaceholder: 'you@company.com', countryRegion: 'País / Región', countryRegionPlaceholder: 'p. ej., Alemania',
    productInterest: 'Producto de interés', selectProduct: 'Seleccione un producto', otherProduct: 'Otro / No estoy seguro',
    message: 'Mensaje', messagePlaceholder: 'Cuéntenos sobre su carga, dimensiones, destino y volumen previsto.',
    requiredField: 'El campo {field} es obligatorio.', invalidEmail: 'Introduzca una dirección de correo electrónico válida.',
    enquiryReceived: 'Gracias por su consulta', enquiryReceivedDescription: 'Nuestro equipo de exportación ha recibido su mensaje y le responderá en un día hábil.',
    enquiryFailed: 'No pudimos enviar su consulta. Inténtelo de nuevo o escriba a kinggood66@163.com.',
    websiteEnquiry: 'Consulta del sitio web',
  },
  pages: {
    products: { eyebrow: 'Nuestros productos', title: 'Embalaje de madera para cada reto logístico', description: 'Explore palés diseñados, cajas de alta resistencia y carretes para cables para la manipulación industrial y la exportación.' },
    customPackaging: { eyebrow: 'Embalaje a medida', title: 'Embalaje creado para su carga', description: 'Indíquenos su carga, ruta y requisitos de manipulación para recibir una propuesta práctica de embalaje de madera.' },
    industries: { eyebrow: 'Industrias', title: 'Fabricado para cadenas de suministro exigentes', description: 'Embalaje fiable para fabricación industrial, maquinaria, logística y operaciones de exportación.' },
    about: { eyebrow: 'Sobre KINGGOOD', title: 'Un socio de embalaje de madera para la logística global', description: 'Desde el procesamiento de madera hasta el embalaje terminado, respaldamos entregas industriales fiables.' },
    news: { eyebrow: 'Noticias', title: 'Novedades de KINGGOOD', description: 'Noticias de la empresa, orientación sobre embalaje e información logística.' },
    contact: { eyebrow: 'Contacto', title: 'Inicie su consulta de embalaje', description: 'Comparta los requisitos de su carga y destino con nuestro equipo de exportación.' },
  },
  errors: {
    notFoundTitle: 'Página no encontrada', notFoundDescription: 'La página solicitada no está disponible o puede haberse movido.',
    unavailableTitle: 'Contenido no disponible', unavailableDescription: 'Inténtelo de nuevo en breve o contacte con nuestro equipo para obtener ayuda.',
    englishFallbackNotice: 'Este artículo está disponible actualmente solo en inglés.',
  },
  carousel: {
    previousSlide: 'Diapositiva anterior', nextSlide: 'Siguiente diapositiva', pause: 'Pausar carrusel', play: 'Reproducir carrusel', slideLabel: 'Diapositiva',
    ariaLabel: 'Carrusel de imágenes de fábrica', goToSlide: 'Ir a la diapositiva {slide}',
    imageAlt: { factoryExterior: 'Vista exterior de la fábrica de KINGGOOD', factoryProduction: 'Taller de producción de la fábrica de KINGGOOD' },
  },
  productOverlays: {
    category: 'Categoría', materials: 'Materiales', dimensions: 'Dimensiones', applications: 'Aplicaciones', specifications: 'Especificaciones', handlingNotes: 'Notas de manipulación',
    requestQuote: 'Solicitar presupuesto', minimumOrderQuantity: 'MOQ', rfq: 'RFQ',
  },
  content: localizedContent.es,
} satisfies Dictionary

export default es
