
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../constants';
import { useTranslation } from '../context/LanguageContext';

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`border-b border-gray-100 last:border-0 transition-all duration-300 ${isOpen ? 'bg-pink-50/10' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 px-8 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-bold transition-colors ${isOpen ? 'text-[#FF1493]' : 'text-gray-900 group-hover:text-[#FF1493]'}`}>
          {question}
        </span>
        <div className={`shrink-0 ml-4 p-2 rounded-full transition-all ${isOpen ? 'bg-[#FF1493] text-white rotate-180' : 'bg-gray-50 text-gray-400'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 text-gray-600 leading-relaxed text-lg italic">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { t, language } = useTranslation();
  return (
    <div className="pb-32 bg-white">
      {/* Header */}
      <section className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <HelpCircle size={14} /> Knowledge Base
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {t('faq.title', 'Common')} <span className="text-[#FF1493]">{t('faq.title_accent', 'Questions.')}</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {t('faq.desc', 'Everything you need to know about our polished Philadelphia cleaning services.')}
          </p>
        </div>
      </section>

      {/* Accordion Content */}
      <section className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          {FAQ_DATA.map((category, idx) => (
            <motion.div 
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-[#FF1493]/20 flex-grow"></div>
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap">
                  {language === 'es' ? category.category_es : category.category}
                </h2>
                <div className="h-px bg-[#FF1493]/20 flex-grow"></div>
              </div>

              <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
                {category.items.map((item) => (
                  <AccordionItem 
                    key={item.q} 
                    question={language === 'es' ? item.q_es : item.q} 
                    answer={language === 'es' ? item.a_es : item.a} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support Section */}
      <section className="container mx-auto px-6 mt-32">
        <div className="max-w-4xl mx-auto bg-gray-50 p-12 md:p-20 rounded-[4rem] text-center space-y-8">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#FF1493] mx-auto shadow-sm">
            <MessageCircle size={32} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">{t('faq.support_title', 'Still have a question?')}</h2>
            <p className="text-gray-500 text-lg italic">{t('faq.support_desc', 'Our friendly Philly team is here to help you get the answers you need.')}</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <a href="tel:267-854-9564" className="bg-[#FF1493] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-pink-100">
              {t('cta.call_now', 'Call Us Now')}
            </a>
            <a href="mailto:anascleaningservicesphl@gmail.com" className="bg-white text-gray-900 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all">
              {t('cta.email_support', 'Email Support')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
