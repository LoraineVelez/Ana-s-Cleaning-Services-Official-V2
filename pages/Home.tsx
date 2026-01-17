
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Star, CheckCircle, ChevronRight, ChevronLeft, MoveHorizontal } from 'lucide-react';
import { SERVICES, TESTIMONIALS } from '../constants';
import { useQuoteForm } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

const CLIENT_PHOTO_URLS = [
  "https://i.ibb.co/PZ56yN4h/Screenshot-2026-01-16-at-5-39-50-PM.png",
  "https://i.ibb.co/gFfHC2k8/Screenshot-2026-01-16-at-5-39-21-PM.png",
  "https://i.ibb.co/218nrsRB/Screenshot-2026-01-16-at-5-39-27-PM.png",
  "https://i.ibb.co/ynpYsB0t/Screenshot-2026-01-16-at-5-39-03-PM.png"
];

const STORY_PHOTO_URL = "https://i.ibb.co/QFBQrCnQ/Anasgirls.png";

const SparkleText = ({ children }: { children?: React.ReactNode }) => {
  return (
    <span className="relative inline-block px-1">
      <motion.span
        animate={{ 
          color: ['#ffffff', '#ffed4a', '#ffffff', '#ffd1dc', '#ffffff'],
          textShadow: [
            "0 0 5px #fff",
            "0 0 10px #fff",
            "0 0 15px #FF1493",
            "0 0 10px #fff",
            "0 0 5px #fff"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </span>
  );
};

const Hero = () => {
  const { openQuoteForm } = useQuoteForm();
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center pt-4 md:pt-10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 bg-pink-50 text-[#FF1493] px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
            <Sparkles size={14} className="md:w-4 md:h-4" />
            <span>Serving Philly Since 2020</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 leading-[1.1] mb-4 md:mb-6">
            {t('hero.title', 'A Fresh Start for Your')} <span className="text-[#FF1493]">{t('hero.title_accent', 'Philly Home.')}</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-10 leading-relaxed max-w-lg mx-auto md:mx-0 px-2 md:px-0">
            {t('hero.desc', 'Modern, detail-oriented cleaning services designed for busy Philadelphians.')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start px-4 md:px-0">
            <button 
              onClick={openQuoteForm}
              className="bg-[#FF1493] text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold shadow-xl shadow-pink-200 active:scale-95 transition-all text-center"
            >
              {t('cta.quote', 'Request a Quote')}
            </button>
            <Link to="/services" className="bg-gray-100 text-gray-800 px-8 md:px-10 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold hover:bg-gray-200 transition-all text-center">
              {t('nav.services', 'Services')}
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="flex -space-x-2">
              {CLIENT_PHOTO_URLS.map((url, i) => (
                <img key={i} src={url} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white shadow-sm object-cover" alt="Client" />
              ))}
            </div>
            <p className="text-[10px] md:text-sm text-gray-500 font-bold uppercase tracking-wider">{t('hero.trust', 'Trusted by 500+ Philly households')}</p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative px-2 md:px-0 mt-4 md:mt-0"
        >
          <div className="absolute inset-0 bg-pink-200/20 blur-3xl rounded-full"></div>
          <img 
            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=1000" 
            alt="Clean Living Room" 
            className="relative rounded-[2rem] md:rounded-[3rem] shadow-2xl z-10 w-full aspect-[4/3] md:aspect-square object-cover"
          />
          
          {/* Floating Trust Card */}
          <div className="absolute -bottom-6 -left-2 md:-left-12 z-20 bg-white p-4 md:p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 flex items-center gap-4 animate-float">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div className="pr-4">
              <div className="flex items-center gap-1">
                <span className="text-sm md:text-base font-black text-gray-900 leading-none">5.0 Philly Rating</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1.5 whitespace-nowrap">Verified Professional</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StorySection = () => {
  const { t } = useTranslation();
  return (
    <section className="container mx-auto px-6 overflow-hidden">
      <div className="bg-gray-50 rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 flex flex-col md:flex-row items-center gap-12 md:gap-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          <img 
            src={STORY_PHOTO_URL} 
            alt="Ana's Cleaning Team" 
            className="relative rounded-[2.5rem] md:rounded-[4rem] shadow-2xl w-full h-[400px] md:h-[600px] object-cover"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 space-y-8 text-center md:text-left"
        >
          <div className="inline-block px-4 py-1.5 bg-white rounded-full text-[#FF1493] text-xs font-black uppercase tracking-widest shadow-sm">
            {t('story.label', 'Our Story')}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {t('story.title', 'Small Team.')} <span className="text-[#FF1493]">{t('story.title_accent', 'Big Heart.')}</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            {t('story.p1', 'We are a small, locally run cleaning company right here in Philadelphia. We believe that clients work best with a real team that takes the time to understand individual preferences.')}
          </p>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            {t('story.p2', 'Founded in 2020, we’ve built our reputation on the "Ana Standard"—a commitment to consistency and attention to detail.')}
          </p>
          <div className="pt-4">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-[#FF1493] font-black text-lg group"
            >
              {t('story.cta', 'Read Our Full Story')} <ArrowRight size={24} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { t, language } = useTranslation();
  return (
    <section className="container mx-auto px-6">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 italic px-4">{t('testimonials.label', 'Philly neighbors love Ana')}</h2>
        <div className="flex justify-center gap-1 text-yellow-400">
          {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={18} />)}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {/* Fix: Changed TESTIMALIALS to TESTIMONIALS to fix 'Cannot find name' error */}
        {TESTIMONIALS.slice(0, 3).map((testimonial, idx) => (
          <motion.div 
            key={testimonial.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-6 md:p-10 rounded-[2rem] border border-transparent shadow-sm flex flex-col"
          >
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-6 italic flex-grow">
              "{language === 'es' ? testimonial.content_es : testimonial.content}"
            </p>
            <div className="flex items-center gap-3 border-t border-gray-200/50 pt-5 mt-auto">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-pink-100 flex items-center justify-center text-[#FF1493] font-bold text-xs md:text-lg shadow-sm">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs md:text-base flex items-center gap-1">
                  {testimonial.name}
                  <CheckCircle size={12} className="text-blue-400 fill-blue-400" />
                </h4>
                <p className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">{testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ServicesSlider = () => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const { t, language } = useTranslation();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section className="container mx-auto px-6 overflow-hidden select-none relative">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12 gap-6 text-center md:text-left">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-4 leading-tight">{t('services.slider_title', 'The Perfect Clean')}</h2>
          <p className="text-gray-500 text-base md:text-lg">{t('services.slider_desc', 'Drag or use arrows to explore our Philadelphia services.')}</p>
        </div>
        <Link to="/services" className="text-[#FF1493] font-bold text-sm md:text-base flex items-center gap-2">
          {t('services.all', 'All Services')} <ArrowRight size={18} />
        </Link>
      </div>

      <motion.div ref={carousel} className="cursor-grab active:cursor-grabbing overflow-x-hidden">
        <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex gap-6 md:gap-8 pb-12">
          {SERVICES.map((service) => (
            <motion.div key={service.id} className="min-w-[300px] md:min-w-[420px] bg-gray-50 p-10 rounded-[3rem] group shadow-sm hover:bg-white transition-all duration-500 border border-transparent hover:border-pink-100/30 flex flex-col">
              <div className="mb-8 p-5 bg-white rounded-2xl w-fit group-hover:bg-pink-50 transition-all shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{language === 'es' ? service.title_es : service.title}</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 flex-grow">
                {language === 'es' ? service.description_es : service.description}
              </p>
              <Link to={`/services#${service.id}`} className="inline-flex items-center gap-3 font-black text-[#FF1493] uppercase tracking-widest text-xs">
                Learn More <ChevronRight size={18} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const Home = () => {
  const { openQuoteForm } = useQuoteForm();
  const { t } = useTranslation();
  return (
    <div className="space-y-16 md:space-y-32 mb-16 md:mb-20">
      <Hero />
      <ServicesSlider />
      <StorySection />
      <TestimonialsSection />
      <section className="container mx-auto px-2 md:px-6">
        <div className="bg-[#FF1493] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-center text-white relative overflow-hidden mx-2 md:mx-0">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 leading-tight">
              {t('cta.ready', 'Ready for a')} <SparkleText>{t('cta.ready_accent', 'sparkling')}</SparkleText> {t('cta.ready_end', 'home?')}
            </h2>
            <p className="text-base md:text-xl text-pink-50 mb-8 md:mb-12 opacity-90 font-medium">
              {t('cta.desc', 'Start your journey toward a cleaner space today. Contact us for a personalized quote.')}
            </p>
            <div className="flex flex-col gap-4 items-center">
              <button onClick={openQuoteForm} className="w-full sm:w-auto bg-white text-[#FF1493] px-8 md:px-10 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold shadow-xl shadow-pink-200">
                {t('cta.quote', 'Request a Quote')}
              </button>
              <p className="text-pink-100 font-bold mt-2 text-sm md:text-base">
                {t('cta.call', 'Or Call Us:')} (267) 854-9564
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
