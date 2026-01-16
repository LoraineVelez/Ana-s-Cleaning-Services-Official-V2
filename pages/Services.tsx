
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { SERVICES, ADDITIONAL_SERVICES } from '../constants';
import { CheckCircle2, Mail, Building2, Plus } from 'lucide-react';
import { useQuoteForm } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

const Services = () => {
  const { openQuoteForm, openCommercialQuote } = useQuoteForm();
  const { hash } = useLocation();
  const { t, language } = useTranslation();
  
  const residentialServices = SERVICES.filter(s => s.id !== 'commercial');
  const commercialService = SERVICES.find(s => s.id === 'commercial');

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [hash]);

  return (
    <div className="pb-20 md:pb-32">
      {/* Hero Section */}
      <section className="bg-gray-50 pt-12 md:pt-20 pb-24 md:pb-32 rounded-b-[3rem] md:rounded-b-[5rem]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {t('services.hero.title', 'Services Built for')} <span className="text-[#FF1493]">{t('services.hero.title_accent', 'Philly Living')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('services.hero.desc', 'From historic Rittenhouse homes to modern Fishtown workspaces, we provide tailored cleaning solutions that sparkle.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Residential Section */}
      <section className="container mx-auto px-4 md:px-6 -mt-12 md:-mt-20">
        <div className="flex items-center gap-4 mb-8 md:mb-16">
          <h2 className="text-xs md:text-lg font-black text-[#FF1493] uppercase tracking-[0.15em] md:tracking-[0.25em] whitespace-nowrap">
            {t('services.residential_label', 'Residential Tiers')}
          </h2>
          <div className="h-px bg-pink-100 flex-grow"></div>
        </div>

        <div className="grid gap-12 md:gap-20">
          {residentialServices.map((service, idx) => (
            <motion.div 
              id={service.id}
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center bg-white p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-xl shadow-gray-100 border border-gray-50 scroll-mt-32`}
            >
              <div className="w-full md:flex-1">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-[250px] md:h-[450px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-sm"
                />
              </div>
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  {language === 'es' ? service.title_es : service.title}
                </h2>
                <p className="text-gray-500 leading-relaxed text-base md:text-lg">
                  {language === 'es' ? service.description_es : service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {['Expert Care', 'Detail Oriented', 'Satisfaction Guarantee', 'Reliable Service'].map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-gray-700 text-sm md:text-base font-medium">
                      <CheckCircle2 className="text-[#FF1493] shrink-0" size={18} />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <button 
                    onClick={openQuoteForm}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-bold bg-[#FF1493] text-white shadow-lg shadow-pink-100 hover:scale-105 active:scale-95 transition-all"
                  >
                    <Mail size={20} />
                    {t('cta.quote', 'Request a Quote')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Commercial Section */}
      {commercialService && (
        <section id="commercial" className="container mx-auto px-6 mt-24 md:mt-32 scroll-mt-32">
          <div className="flex items-center gap-4 mb-10 md:mb-12">
            <h2 className="text-xs md:text-lg font-black text-[#FF1493] uppercase tracking-[0.15em] md:tracking-[0.25em] whitespace-nowrap">
              {t('services.commercial_label', 'Commercial Excellence')}
            </h2>
            <div className="h-px bg-pink-100 flex-grow"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-[3rem] md:rounded-[5rem] overflow-hidden flex flex-col lg:flex-row items-center relative"
          >
            <div className="w-full lg:w-1/2 h-[300px] lg:h-[600px] relative">
              <img 
                src={commercialService.imageUrl} 
                alt="Commercial Office Cleaning" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent hidden lg:block"></div>
            </div>
            
            <div className="w-full lg:w-1/2 p-8 md:p-16 text-white space-y-8 relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FF1493] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                <Building2 size={14} /> {t('services.commercial.badge', 'Business Solutions')}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                {t('services.commercial.title', 'Impress Clients with a')} <span className="text-[#FF1493]">{t('services.commercial.title_accent', 'Spotless Workspace.')}</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                {language === 'es' ? commercialService.description_es : commercialService.description}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { t: 'After-Hours Care', d: 'Scheduling that fits your business hours.' },
                  { t: 'Boutique Focus', d: 'Retail and creative spaces are our specialty.' },
                  { t: 'Reliable Service', d: 'Background-checked professional care.' },
                  { t: 'Detail Oriented', d: 'Meticulous care for every surface and corner.' }
                ].map((item) => (
                  <div key={item.t} className="space-y-2">
                    <h4 className="font-bold text-[#FF1493]">{item.t}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.d}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 text-center lg:text-left">
                <button 
                  onClick={openCommercialQuote}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-6 rounded-2xl font-black text-xl bg-white text-gray-900 hover:bg-[#FF1493] hover:text-white transition-all shadow-2xl"
                >
                  {t('services.commercial.cta', 'Request a Business Quote')}
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Additional Services Section */}
      <section id="additional" className="container mx-auto px-6 mt-24 md:mt-32 scroll-mt-32">
        <div className="bg-gray-50 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                {t('services.additional.title', 'Additional')} <span className="text-[#FF1493]">{t('services.additional.title_accent', 'Services')}</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {ADDITIONAL_SERVICES.map((item) => (
                <div key={item} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-[#FF1493] group-hover:scale-110 transition-transform">
                    <Plus size={18} />
                  </div>
                  <span className="font-semibold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 md:mt-16 text-center">
              <p className="text-gray-500 font-medium text-lg md:text-xl">
                {t('services.additional.disclaimer', 'Additional services are available for an added fee and must be approved prior to arrival.')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
