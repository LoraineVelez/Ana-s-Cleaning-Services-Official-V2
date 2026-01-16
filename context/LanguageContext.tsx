
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText: string) => string;
}

const STATIC_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Nav & General
    'nav.services': 'Services',
    'nav.about': 'About',
    'nav.testimonials': 'Testimonials',
    'nav.portal': 'Client Center',
    'cta.quote': 'Request a Quote',
    'cta.view_services': 'View Services',
    'cta.free_quote': 'Request a Free Quote',
    'cta.call_now': 'Call Us Now',
    'cta.email_support': 'Email Support',
    'footer.built': 'Built for Philly',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.contact': 'Contact',
    'footer.explore': 'Explore',
    'footer.areas': 'Service Areas',
    'footer.translate': 'Translate Page',

    // Hero
    'hero.title': 'A Fresh Start for Your',
    'hero.title_accent': 'Philly Home.',
    'hero.desc': 'Modern, detail-oriented cleaning services designed for busy Philadelphians. Professional, polished, and perfectly clean.',
    'hero.trust': 'Trusted by 500+ Philly households',

    // About Page
    'about.title': 'A Spark of Joy,',
    'about.title_accent': 'Philadelphia Style.',
    'about.desc': 'Founded in South Philadelphia in early 2020, Ana Rose Cleaning Co began with a simple mission: to help our neighbors find more time for what matters most by handling the heavy lifting of home care.',
    'about.stat.years': 'Years of Service',
    'about.stat.years_desc': 'Helping Philly sparkle since 2020.',
    'about.stat.owned': 'Philly Owned',
    'about.stat.owned_desc': 'Locally operated with local pride.',
    'about.stat.hours': 'Hours Scrubbed',
    'about.stat.hours_desc': 'Dedication in every single detail.',
    'about.why.title': 'Why Choose Ana’s?',
    'about.why.1.title': 'Personalized Touch',
    'about.why.1.desc': 'We are a small, locally run cleaning company. Clients work with a real team that takes the time to understand individual preferences instead of treating every home the same.',
    'about.why.2.title': 'The Ana’s Standard',
    'about.why.2.desc': 'Every cleaning follows a detailed checklist designed to support consistency and attention to detail.',
    'about.why.3.title': 'Safe and Respectful',
    'about.why.3.desc': 'We treat every home with care and professionalism, recognizing that each space and client has different needs. All cleaners are background checked.',
    'about.owner_title': 'Founder',
    'about.owner_bio': 'Ana is the owner of Ana’s Cleaning Services, a professional cleaning company serving Philadelphia and surrounding areas. After moving from the Dominican Republic, Ana quickly built a reputation for high-quality residential and office cleaning through strong work ethic, attention to detail, and consistent results.',
    'about.cta.sparkle': 'Ready to see your home sparkle?',
    'about.cta.desc': 'Join our community of satisfied Philadelphia neighbors. Explore our service tiers or request a personalized estimate today.',

    // Services Page
    'services.hero.title': 'Services Built for',
    'services.hero.title_accent': 'Philly Living',
    'services.hero.desc': 'From historic Rittenhouse homes to modern Fishtown workspaces, we provide tailored cleaning solutions that sparkle.',
    'services.residential_label': 'Residential Tiers',
    'services.commercial_label': 'Commercial Excellence',
    'services.commercial.badge': 'Business Solutions',
    'services.commercial.title': 'Impress Clients with a',
    'services.commercial.title_accent': 'Spotless Workspace.',
    'services.commercial.cta': 'Request a Business Quote',
    'services.additional.title': 'Additional',
    'services.additional.title_accent': 'Services',
    'services.additional.disclaimer': 'Additional services are available for an added fee and must be approved prior to arrival.',

    // Pricing Page
    'pricing.title': 'Our Service',
    'pricing.title_accent': 'Tiers.',
    'pricing.desc': 'Transparent options for every home. Request a customized estimate to get started with the plan that fits your lifestyle.',
    'pricing.popular': 'Most Popular',
    'pricing.guarantee.title': "The Ana's Guarantee",
    'pricing.guarantee.desc': "We stand by our work. If for any reason you're not completely satisfied with your cleaning, notify us within 24 hours and we'll resolve any issues at no extra cost.",
    'pricing.stat.checkpoints': 'Checkpoints',
    'pricing.stat.vetted': 'Vetted Staff',

    // Client Portal
    'portal.title': 'Client',
    'portal.title_accent': 'Center',
    'portal.desc': 'Welcome back! This space is dedicated to our recurring Philly neighbors. Request schedule changes, handle payments, and share the love.',
    'portal.schedule.title': 'Request a Schedule Change',
    'portal.schedule.desc': 'Need to adjust your cleaning frequency or pause service? Let us know below.',
    'portal.schedule.success': 'Request Received',
    'portal.schedule.success_desc': 'Ana will review your request and reach out via email or text to confirm.',
    'portal.schedule.another': 'Send another request',
    'portal.payment.title': 'Payments',
    'portal.payment.preferred': 'Preferred Method',
    'portal.payment.invoice': 'Email Invoices',
    'portal.payment.invoice_desc': 'Invoices sent to your email are our preferred payment method. You\'ll receive a direct link to pay securely after each session.',
    'portal.payment.cta': 'Pay Your Invoice',
    'portal.payment.details_alert': 'Details for Venmo, CashApp, and Zelle are available upon request. We encourage using the email link for instant confirmation.',
    'portal.refer.title': 'Share the Sparkle',
    'portal.refer.reward': 'Earn a reward for every referral!',
    'portal.refer.desc': 'Know someone in Philadelphia who deserves a fresh start? Tell them about Ana\'s Cleaning Services!',
    'portal.review.title': 'Leave a Review',
    'portal.review.desc': 'Loving your service? Your feedback helps us grow and keep Philly sparkling!',
    'portal.tip.label': 'PRO TIP',
    'portal.tip.desc': 'Recurring clients get priority scheduling, custom notes in our system, and locked-in rates. Join the family!',
    'portal.contact.email_label': 'EMAIL US',
    'portal.contact.email_btn': 'Email',

    // Story Section Home
    'story.label': 'Our Story',
    'story.title': 'Small Team.',
    'story.title_accent': 'Big Heart.',
    'story.p1': 'We are a small, locally run cleaning company right here in Philadelphia. We believe that clients work best with a real team that takes the time to understand individual preferences.',
    'story.p2': 'Founded in 2020, we’ve built our reputation on the "Ana Standard"—a commitment to consistency and attention to detail.',
    'story.cta': 'Read Our Full Story',

    // CTA Section Home
    'cta.ready': 'Ready for a',
    'cta.ready_accent': 'sparkling',
    'cta.ready_end': 'home?',
    'cta.desc': 'Start your journey toward a cleaner space today. Contact us for a personalized quote.',
    'cta.call': 'Or Call Us:',
    'services.slider_title': 'The Perfect Clean for Your Space',
    'services.slider_desc': 'Drag or use arrows to explore our Philadelphia services.',
    'services.all': 'All Services',
    'testimonials.label': 'Philly neighbors love Ana'
  },
  es: {
    // Nav & General
    'nav.services': 'Servicios',
    'nav.about': 'Nosotros',
    'nav.testimonials': 'Testimonios',
    'nav.portal': 'Centro de Clientes',
    'cta.quote': 'Solicitar Presupuesto',
    'cta.view_services': 'Ver Servicios',
    'cta.free_quote': 'Solicitar Presupuesto Gratis',
    'cta.call_now': 'Llámenos Ahora',
    'cta.email_support': 'Soporte por Email',
    'footer.built': 'Hecho para Philly',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.contact': 'Contacto',
    'footer.explore': 'Explorar',
    'footer.areas': 'Áreas de Servicio',
    'footer.translate': 'Traducir Página',

    // Hero
    'hero.title': 'Un nuevo comienzo para su',
    'hero.title_accent': 'hogar en Philly.',
    'hero.desc': 'Servicios de limpieza modernos y detallados diseñados para los habitantes de Filadelfia ocupados. Profesionales, pulidos y perfectamente limpios.',
    'hero.trust': 'Confiado por más de 500 hogares en Philly',

    // About Page
    'about.title': 'Un Toque de Alegría,',
    'about.title_accent': 'Estilo Filadelfia.',
    'about.desc': 'Fundada en el sur de Filadelfia a principios de 2020, Ana Rose Cleaning Co comenzó con una misión simple: ayudar a nuestros vecinos a encontrar más tiempo para lo que más importa encargándonos del trabajo pesado del cuidado del hogar.',
    'about.stat.years': 'Años de Servicio',
    'about.stat.years_desc': 'Ayudando a Philly a brillar desde 2020.',
    'about.stat.owned': 'Propiedad de Philly',
    'about.stat.owned_desc': 'Operado localmente con orgullo local.',
    'about.stat.hours': 'Horas de Limpieza',
    'about.stat.hours_desc': 'Dedicación en cada detalle.',
    'about.why.title': '¿Por qué elegir a Ana?',
    'about.why.1.title': 'Toque Personalizado',
    'about.why.1.desc': 'Somos una empresa de limpieza pequeña de gestión local. Los clientes trabajan con un equipo real que se toma el tiempo de entender las preferencias individuales.',
    'about.why.2.title': 'El Estándar de Ana',
    'about.why.2.desc': 'Cada limpieza sigue una lista de verificación detallada diseñada para mantener la consistencia y la atención al detalle.',
    'about.why.3.title': 'Seguro y Respetuoso',
    'about.why.3.desc': 'Tratamos cada hogar con cuidado y profesionalismo, reconociendo que cada espacio es diferente. Todo nuestro personal ha pasado verificaciones de antecedentes.',
    'about.owner_title': 'Fundadora',
    'about.owner_bio': 'Ana es la propietaria de Ana’s Cleaning Services, una empresa profesional que sirve a Filadelfia y sus alrededores. Después de mudarse desde la República Dominicana, Ana rápidamente construyó una reputación de alta calidad.',
    'about.cta.sparkle': '¿Listo para ver tu casa brillar?',
    'about.cta.desc': 'Únete a nuestra comunidad de vecinos satisfechos en Filadelfia. Explora nuestros servicios o solicita un presupuesto hoy mismo.',

    // Services Page
    'services.hero.title': 'Servicios Hechos para la',
    'services.hero.title_accent': 'Vida en Philly',
    'services.hero.desc': 'Desde casas históricas en Rittenhouse hasta espacios de trabajo modernos en Fishtown, brindamos soluciones de limpieza a medida.',
    'services.residential_label': 'Niveles Residenciales',
    'services.commercial_label': 'Excelencia Comercial',
    'services.commercial.badge': 'Soluciones para Negocios',
    'services.commercial.title': 'Impresione a sus Clientes con un',
    'services.commercial.title_accent': 'Espacio Impecable.',
    'services.commercial.cta': 'Solicitar Presupuesto Comercial',
    'services.additional.title': 'Servicios',
    'services.additional.title_accent': 'Adicionales',
    'services.additional.disclaimer': 'Los servicios adicionales están disponibles por una tarifa extra y deben aprobarse antes de la llegada.',

    // Pricing Page
    'pricing.title': 'Nuestros Niveles de',
    'pricing.title_accent': 'Servicio.',
    'pricing.desc': 'Opciones transparentes para cada hogar. Solicite un presupuesto personalizado para comenzar con el plan que se adapte a su estilo de vida.',
    'pricing.popular': 'Más Popular',
    'pricing.guarantee.title': "La Garantía de Ana",
    'pricing.guarantee.desc': "Respaldamos nuestro trabajo. Si por alguna razón no está completamente satisfecho, notifíquenos dentro de las 24 horas y resolveremos cualquier problema sin costo extra.",
    'pricing.stat.checkpoints': 'Puntos de Control',
    'pricing.stat.vetted': 'Personal Verificado',

    // Client Portal
    'portal.title': 'Centro de',
    'portal.title_accent': 'Clientes',
    'portal.desc': '¡Bienvenido de nuevo! Este espacio está dedicado a nuestros vecinos recurrentes de Philly. Solicite cambios de horario, gestione pagos y comparta el amor.',
    'portal.schedule.title': 'Solicitar Cambio de Horario',
    'portal.schedule.desc': '¿Necesita ajustar su frecuencia de limpieza o pausar el servicio? Infórmenos a continuación.',
    'portal.schedule.success': 'Solicitud Recibida',
    'portal.schedule.success_desc': 'Ana revisará su solicitud y se pondrá en contacto por email o texto para confirmar.',
    'portal.schedule.another': 'Enviar otra solicitud',
    'portal.payment.title': 'Pagos',
    'portal.payment.preferred': 'Método Preferido',
    'portal.payment.invoice': 'Facturas por Email',
    'portal.payment.invoice_desc': 'Las facturas enviadas a su correo son nuestro método preferido. Recibirá un enlace directo para pagar de forma segura después de cada sesión.',
    'portal.payment.cta': 'Pagar Factura',
    'portal.payment.details_alert': 'Los detalles de Venmo, CashApp y Zelle están disponibles a pedido. Recomendamos usar el enlace de email para una confirmación instantánea.',
    'portal.refer.title': 'Comparta el Brillo',
    'portal.refer.reward': '¡Gane una recompensa por cada referido!',
    'portal.refer.desc': '¿Conoce a alguien en Filadelfia que merezca un nuevo comienzo? ¡Cuéntele sobre Ana\'s Cleaning Services!',
    'portal.review.title': 'Dejar una Reseña',
    'portal.review.desc': '¿Le encanta nuestro servicio? ¡Sus comentarios nos ayudan a crecer y a mantener a Philly brillando!',
    'portal.tip.label': 'CONSEJO PRO',
    'portal.tip.desc': 'Los clientes recurrentes obtienen programación prioritaria, notas personalizadas en nuestro sistema y tarifas fijas. ¡Únete a la familia!',
    'portal.contact.email_label': 'ENVÍENOS UN EMAIL',
    'portal.contact.email_btn': 'Email',

    // Story Section Home
    'story.label': 'Nuestra Historia',
    'story.title': 'Equipo Pequeño.',
    'story.title_accent': 'Gran Corazón.',
    'story.p1': 'Somos una pequeña empresa de limpieza de gestión local aquí mismo en Filadelfia. Creemos que los clientes trabajan mejor con un equipo real que se toma el tiempo para comprender las preferencias individuales.',
    'story.p2': 'Fundada en 2020, hemos construido nuestra reputación sobre el "Estándar Ana", un compromiso con la consistencia y la atención al detalle.',
    'story.cta': 'Lea Nuestra Historia Completa',

    // CTA Section Home
    'cta.ready': '¿Listo para un hogar',
    'cta.ready_accent': 'reluciente?',
    'cta.ready_end': '',
    'cta.desc': 'Comience su viaje hacia un espacio más limpio hoy mismo. Contáctenos para un presupuesto personalizado.',
    'cta.call': 'O Llámenos:',
    'services.slider_title': 'La Limpieza Perfecta para su Espacio',
    'services.slider_desc': 'Arrastre o use las flechas para explorar nuestros servicios en Filadelfia.',
    'services.all': 'Todos los Servicios',
    'testimonials.label': 'Los vecinos de Philly aman a Ana'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, defaultText: string) => {
    return STATIC_TRANSLATIONS[language][key] || defaultText;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
