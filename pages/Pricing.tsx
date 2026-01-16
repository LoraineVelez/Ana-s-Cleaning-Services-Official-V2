
import React from 'react';
import { motion } from 'framer-motion';
import { PRICING_PLANS } from '../constants';
import { Check, ShieldCheck, Heart } from 'lucide-react';
import { useQuoteForm } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

const Pricing = () => {
  const { openQuoteForm } = useQuoteForm();
  const { t } = useTranslation();
  
  return (
    <div className="pb-32">
      <section className="bg-white pt-20 pb-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            {t('pricing.title', 'Our Service')} <span className="text-[#FF1493]">{t('pricing.title_accent', 'Tiers.')}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t('pricing.desc', 'Transparent options for every home. Request a customized estimate to get started with the plan that fits your lifestyle.')}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col p-10 rounded-[3rem] transition-all duration-300 border-2 ${plan.recommended ? 'bg-[#FF1493] text-white border-[#FF1493] scale-105 shadow-2xl shadow-pink-200 z-10' : 'bg-gray-50 text-gray-900 border-transparent hover:border-pink-100 hover:bg-white'}`}
            >
              {plan.recommended && (
                <div className="bg-white text-[#FF1493] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit mb-6">
                  {t('pricing.popular', 'Most Popular')}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-6">{plan.name}</h3>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map(feat => (
                  <li key={feat} className="flex items-center gap-3 font-medium opacity-90">
                    <Check size={20} className={plan.recommended ? 'text-pink-200' : 'text-[#FF1493]'} />
                    {feat}
                  </li>
                ))}
              </ul>
              <button 
                onClick={openQuoteForm}
                className={`w-full py-5 rounded-2xl font-bold text-center text-lg transition-all ${plan.recommended ? 'bg-white text-[#FF1493] hover:bg-gray-50' : 'bg-[#FF1493] text-white hover:bg-[#D1107A] shadow-lg shadow-pink-100'}`}
              >
                {t('cta.quote', 'Request a Quote')}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 mt-32">
        <div className="bg-gray-50 p-12 md:p-20 rounded-[4rem] flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-[#FF1493] mb-6">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('pricing.guarantee.title', "The Ana's Guarantee")}</h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              {t('pricing.guarantee.desc', "We stand by our work. If for any reason you're not completely satisfied with your cleaning, notify us within 24 hours and we'll resolve any issues at no extra cost.")}
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 w-full">
            <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
              <p className="text-3xl font-bold text-gray-900 mb-1">50+</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('pricing.stat.checkpoints', 'Checkpoints')}</p>
            </div>
            <div className="bg-white p-6 rounded-3xl text-center shadow-sm">
              <p className="text-3xl font-bold text-gray-900 mb-1">100%</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('pricing.stat.vetted', 'Vetted Staff')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
