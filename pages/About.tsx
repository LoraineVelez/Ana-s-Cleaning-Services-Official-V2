
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import { useQuoteForm } from '../context/QuoteContext';

const About = () => {
  const { t } = useTranslation();
  const { openQuoteForm } = useQuoteForm();
  const ownerHeadshot = "https://i.ibb.co/7twF5vbr/anas-headshot.png";

  return (
    <div className="pb-32">
      <section className="container mx-auto px-6 pt-20 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-8"
          >
            {t('about.title', 'A Spark of Joy,')} <span className="text-[#FF1493]">{t('about.title_accent', 'Philadelphia Style.')}</span>
          </motion.h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            {t('about.desc', 'Founded in South Philadelphia in early 2020, Ana Rose Cleaning Co began with a simple mission: to help our neighbors find more time for what matters most by handling the heavy lifting of home care.')}
          </p>
          <img 
            src="https://i.ibb.co/8DTdWWrB/pexels-falling4utah-2724749.jpg" 
            className="w-full h-[350px] md:h-[500px] object-cover rounded-[3rem] md:rounded-[4rem] shadow-2xl" 
            alt="Philadelphia Cityscape"
          />
        </div>
      </section>

      <section className="container mx-auto px-6 grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-center">
          <h3 className="text-5xl font-bold text-[#FF1493] mb-4">4+</h3>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{t('about.stat.years', 'Years of Service')}</h4>
          <p className="text-gray-500">{t('about.stat.years_desc', 'Helping Philly sparkle since 2020.')}</p>
        </div>
        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-center">
          <h3 className="text-5xl font-bold text-[#FF1493] mb-4">100%</h3>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{t('about.stat.owned', 'Philly Owned')}</h4>
          <p className="text-gray-500">{t('about.stat.owned_desc', 'Locally operated with local pride.')}</p>
        </div>
        <div className="bg-gray-50 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-center">
          <h3 className="text-5xl font-bold text-[#FF1493] mb-4">15k</h3>
          <h4 className="text-xl font-bold text-gray-900 mb-2">{t('about.stat.hours', 'Hours Scrubbed')}</h4>
          <p className="text-gray-500">{t('about.stat.hours_desc', 'Dedication in every single detail.')}</p>
        </div>
      </section>

      <section className="container mx-auto px-6 mt-32">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">{t('about.why.title', 'Why Choose Ana’s?')}</h2>
            <div className="space-y-6">
              {[
                { 
                  title: t('about.why.1.title', "Personalized Touch"), 
                  desc: t('about.why.1.desc', "We are a small, locally run cleaning company. Clients work with a real team that takes the time to understand individual preferences instead of treating every home the same.")
                },
                { 
                  title: t('about.why.2.title', "The Ana’s Standard"), 
                  desc: t('about.why.2.desc', "Every cleaning follows a detailed checklist designed to support consistency and attention to detail.") 
                },
                { 
                  title: t('about.why.3.title', "Safe and Respectful"), 
                  desc: t('about.why.3.desc', "We treat every home with care and professionalism, recognizing that each space and client has different needs. All cleaners are background checked.") 
                }
              ].map(item => (
                <div key={item.title}>
                  <h4 className="text-xl font-bold text-[#FF1493] mb-1">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://i.ibb.co/0R6GGbqJ/pexels-heyho-7046006.jpg" className="rounded-[2rem] w-full h-[250px] md:h-[300px] object-cover" alt="Detail" />
              <img src="https://i.ibb.co/QFBQrCnQ/Anasgirls.png" className="rounded-[2rem] w-full h-[250px] md:h-[300px] object-cover mt-8" alt="Ana's Cleaning Service" />
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="container mx-auto px-6 mt-40">
        <div className="max-w-4xl mx-auto border-t border-gray-100 pt-16">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start gap-6 md:gap-10"
          >
            <div className="shrink-0">
              <img 
                src={ownerHeadshot} 
                alt="Ana - Founder" 
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 md:border-4 border-white shadow-lg transition-transform hover:scale-105 duration-500"
              />
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                {t('about.owner_title', 'Founder')}
              </h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                {t('about.owner_bio', 'Ana is the owner of Ana’s Cleaning Services...')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call Out Section */}
      <section className="container mx-auto px-6 mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-pink-50 rounded-[3rem] md:rounded-[4rem] p-10 md:p-16 text-center relative overflow-hidden border border-pink-100/50"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF1493]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF1493]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-[#FF1493] shadow-sm">
              <Sparkles size={14} className="text-[#FF1493]" /> {t('portal.refer.reward', 'Experience the Difference')}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              {t('about.cta.sparkle', 'Ready to see your home sparkle?')}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium">
              {t('about.cta.desc', 'Join our community of satisfied Philadelphia neighbors.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link 
                to="/services" 
                className="bg-white text-[#FF1493] border-2 border-[#FF1493] px-8 py-5 rounded-2xl font-black text-lg hover:bg-[#FF1493] hover:text-white transition-all flex items-center justify-center gap-2 group shadow-xl shadow-pink-100"
              >
                {t('cta.view_services', 'View Services')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={openQuoteForm}
                className="bg-[#FF1493] text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {t('cta.free_quote', 'Request a Free Quote')}
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
