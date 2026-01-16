
import React from 'react';
import { Home, Building2, Sparkles, Clock, Star, Trash2, CheckCircle2 } from 'lucide-react';
import { Service, Testimonial, PricingPlan } from './types';

export interface LocalizedService extends Service {
  title_es: string;
  description_es: string;
}

export interface LocalizedTestimonial extends Testimonial {
  content_es: string;
}

export const SERVICES: LocalizedService[] = [
  {
    id: 'basic',
    title: 'Basic Clean',
    title_es: 'Limpieza Básica',
    description: 'Up to 2 bedrooms and 2 bathrooms. Approximately 3 hours. Light to medium clean including vacuum and mop, changing bed covers, and trash removal.',
    description_es: 'Hasta 2 dormitorios y 2 baños. Aproximadamente 3 horas. Limpieza ligera a media que incluye aspirado y trapeado, cambio de fundas de cama y eliminación de basura.',
    icon: <Home className="w-8 h-8 text-[#FF1493]" />,
    imageUrl: 'https://i.ibb.co/3yb03g3y/pexels-heyho-6782275.jpg'
  },
  {
    id: 'premium',
    title: 'Premium Clean',
    title_es: 'Limpieza Premium',
    description: 'Up to 3 bedrooms and 2 bathrooms. Up to 4 hours. Includes everything in Basic plus inside microwave cleaning, cabinet wipe down, and sheet changes.',
    description_es: 'Hasta 3 dormitorios y 2 baños. Hasta 4 horas. Incluye todo lo de la Básica más limpieza interior de microondas, limpieza de gabinetes y cambio de sábanas.',
    icon: <Sparkles className="w-8 h-8 text-[#FF1493]" />,
    imageUrl: 'https://i.ibb.co/rfvKkRHs/Screenshot-2026-01-08-at-12-23-07-AM.png'
  },
  {
    id: 'deep',
    title: 'Deep Clean',
    title_es: 'Limpieza Profunda',
    description: 'Up to 5 hours. Includes everything in Premium plus inside oven and fridge cleaning, laundry and dishes, folding one load, and washing one load of dishes.',
    description_es: 'Hasta 5 horas. Incluye todo lo de la Premium más limpieza interior de horno y refrigerador, lavandería y platos, doblado de una carga y lavado de una carga de platos.',
    icon: <Star className="w-8 h-8 text-[#FF1493]" />,
    imageUrl: 'https://i.ibb.co/rRkfPMKt/Chat-GPT-Image-Jan-8-2026-12-26-14-AM.png'
  },
  {
    id: 'move-in-out',
    title: 'Move In / Move Out Clean',
    title_es: 'Limpieza de Mudanza',
    description: 'Separate service. Empty home deep clean including appliances, cabinets, and baseboards.',
    description_es: 'Servicio independiente. Limpieza profunda de vivienda vacía incluyendo electrodomésticos, gabinetes y zócalos.',
    icon: <Clock className="w-8 h-8 text-[#FF1493]" />,
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'commercial',
    title: 'Commercial & Office Cleaning',
    title_es: 'Limpieza Comercial y Oficinas',
    description: 'Professional maintenance for Philadelphia’s workspaces. From boutique offices in Center City to retail fronts in Fishtown, we provide reliable, high-standard cleaning tailored to your business needs.',
    description_es: 'Mantenimiento profesional para espacios de trabajo en Filadelfia. Desde oficinas boutique en Center City hasta locales comerciales en Fishtown, brindamos una limpieza confiable y de alto nivel adaptada a sus necesidades comerciales.',
    icon: <Building2 className="w-8 h-8 text-[#FF1493]" />,
    imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200'
  }
];

export const ADDITIONAL_SERVICES = [
  "Inside oven cleaning",
  "Inside fridge cleaning",
  "Laundry wash and fold",
  "Dishes",
  "Interior windows",
  "Baseboards",
  "Pet hair add on",
  "Extra bedrooms or bathrooms",
  "Organization or light decluttering"
];

export const TESTIMONIALS: LocalizedTestimonial[] = [
  {
    id: 1,
    name: 'Mary B',
    location: 'Fishtown • June 2025',
    content: "If you need the best cleaner, Ana and Ana ALONE is who you need! I am EXTREMELY picky when it comes to having cleaners come in and clean my home in a manner that meets my extremely high standards. Ana met and exceeded my cleaning desires!",
    content_es: "¡Si necesitas la mejor limpieza, Ana y SOLO Ana es quien necesitas! Soy EXTREMADAMENTE exigente cuando se trata de que alguien limpie mi casa de una manera que cumpla con mis estándares. ¡Ana cumplió y superó mis deseos de limpieza!",
    rating: 5
  },
  {
    id: 2,
    name: 'Jennifer G',
    location: 'Rittenhouse • 9 months ago',
    content: "Ana did a wonderful job tackling our kitchen and bathrooms. Like a lot of households, we work full time and have a lot going on, so we don’t always clean as thoroughly as we should. Ana came in and did a phenomenal job.",
    content_es: "Ana hizo un trabajo maravilloso con nuestra cocina y baños. Como muchos hogares, trabajamos a tiempo completo y tenemos muchas cosas que hacer, por lo que no siempre limpiamos tan a fondo como deberíamos. Ana vino e hizo un trabajo fenomenal.",
    rating: 5
  },
  {
    id: 3,
    name: 'Loraine V',
    location: 'South Philly • 2 weeks ago',
    content: "Ana showed up early, communicated throughout the entire visit, and even asked about my sensitivities to the products she was using. My bathroom had never been so clean.",
    content_es: "Ana llegó temprano, se comunicó durante toda la visita e incluso preguntó sobre mis sensibilidades a los productos que estaba usando. Mi baño nunca había estado tan limpio.",
    rating: 5
  },
  {
    id: 4,
    name: 'Sarah T.',
    location: 'Northern Liberties • 1 month ago',
    content: "Absolutely spectacular service. The 'Ana Standard' is real! Every corner was dusted, and the floors literally shone. It's so hard to find reliable help in the city, but Ana is the best.",
    content_es: "Servicio absolutamente espectacular. ¡El 'Estándar Ana' es real! Cada rincón estaba libre de polvo y los pisos literalmente brillaban. Es muy difícil encontrar ayuda confiable en la ciudad, pero Ana es la mejor.",
    rating: 5
  },
  {
    id: 5,
    name: 'Michael D.',
    location: 'University City • 3 months ago',
    content: "I've tried several services in Philly, but Ana Rose Cleaning Co is on another level. Meticulous, professional, and very friendly. They handle my apartment with such care.",
    content_es: "He probado varios servicios en Philly, pero Ana Rose Cleaning Co está en otro nivel. Meticulosos, profesionales y muy amables. Manejan mi apartamento con mucho cuidado.",
    rating: 5
  },
  {
    id: 6,
    name: 'Elena R.',
    location: 'Center City • 1 week ago',
    content: "Coming home after a long shift at HUP to a house cleaned by Ana is the highlight of my week. She really understands what a busy professional needs. Reliable and high quality.",
    content_es: "Llegar a casa después de un largo turno en HUP a una casa limpia por Ana es lo mejor de mi semana. Ella realmente entiende lo que necesita un profesional ocupado. Confiable y de alta calidad.",
    rating: 5
  },
  {
    id: 7,
    name: 'James K.',
    location: 'Fairmount • 5 months ago',
    content: "We use Ana for our office and our home. Consistency is key for us, and she delivers every single time. Her attention to detail on baseboards and windows is impressive.",
    content_es: "Usamos a Ana para nuestra oficina y nuestro hogar. La consistencia es clave para nosotros, y ella cumple cada vez. Su atención al detalle en los zócalos y las ventanas es impresionante.",
    rating: 5
  },
  {
    id: 8,
    name: 'Patricia S.',
    location: 'Old City • 3 weeks ago',
    content: "Ana is truly a gem in Philadelphia. I have a historic home with delicate surfaces, and she handles everything with such grace and precision. The air even feels lighter after she leaves!",
    content_es: "Ana es verdaderamente una joya en Filadelfia. Tengo una casa histórica con superficies delicadas, y ella maneja todo con mucha gracia y precisión. ¡Incluso el aire se siente más ligero después de que ella se va!",
    rating: 5
  },
  {
    id: 9,
    name: 'Greg M.',
    location: 'Passyunk Crossing • 2 months ago',
    content: "With two large dogs, our house is a constant battle against fur. Ana's pet hair add-on is a lifesaver. She is thorough, kind to the pups, and leaves the place smelling incredible.",
    content_es: "Con dos perros grandes, nuestra casa es una batalla constante contra el pelo. El complemento de pelo de mascota de Ana es un salvavidas. Ella es minuciosa, amable con los cachorros y deja el lugar oliendo increíble.",
    rating: 5
  },
  {
    id: 10,
    name: 'Sofia L.',
    location: 'Graduate Hospital • 4 days ago',
    content: "Found Ana through a neighbor's recommendation and I'm so glad I did. Her 'Move-In' clean made our new place feel like home immediately. The baseboards look brand new!",
    content_es: "Encontré a Ana a través de la recomendación de un vecino y me alegro mucho de haberlo hecho. Su limpieza de 'Mudanza' hizo que nuestro nuevo lugar se sintiera como en casa de inmediato. ¡Los zócalos parecen nuevos!",
    rating: 5
  }
];

export const STAR_REVIEWS = [
  { name: 'Sarah J.', date: 'Oct 2025' },
  { name: 'David L.', date: 'Sept 2025' },
  { name: 'Emily R.', date: 'Aug 2025' },
  { name: 'Michael W.', date: 'July 2025' },
  { name: 'Jessica K.', date: 'June 2025' },
  { name: 'Chris P.', date: 'May 2025' },
  { name: 'Amanda M.', date: 'Apr 2025' },
  { name: 'Robert B.', date: 'Mar 2025' },
  { name: 'Linda T.', date: 'Feb 2025' },
  { name: 'Kevin H.', date: 'Jan 2025' },
  { name: 'Michelle G.', date: 'Dec 2024' },
  { name: 'Jason D.', date: 'Nov 2024' }
];

export const FAQ_DATA = [
  {
    category: "Cleaning Services",
    category_es: "Servicios de Limpieza",
    items: [
      {
        q: "What's included in Basic vs. Premium Cleaning?",
        q_es: "¿Qué se incluye en la Limpieza Básica frente a la Premium?",
        a: "Basic cleaning covers essential maintenance. Premium cleaning handles larger spaces with additional focus on kitchen detail.",
        a_es: "La limpieza básica cubre el mantenimiento esencial. La limpieza Premium se encarga de espacios más grandes con un enfoque adicional en los detalles de la cocina."
      }
    ]
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Basic Clean',
    price: 'Contact for Quote',
    features: ['Vacuum and mop floors', 'Change bed covers', 'Trash removal']
  },
  {
    name: 'Premium Clean',
    price: 'Contact for Quote',
    recommended: true,
    features: ['Everything in Basic', 'Inside microwave', 'Cabinet wipe down']
  },
  {
    name: 'Deep Clean',
    price: 'Contact for Quote',
    features: ['Everything in Premium', 'Inside oven', 'Inside fridge']
  }
];
