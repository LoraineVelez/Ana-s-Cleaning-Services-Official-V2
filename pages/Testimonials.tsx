
import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, STAR_REVIEWS } from '../constants';
import { Star, Quote, CheckCircle, ExternalLink, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { useQuoteForm } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

const GOOGLE_REVIEW_URL = "https://g.page/r/anaestevez990/review"; 
const YELP_REVIEW_URL = "https://www.yelp.com/biz/anas-cleaning-services-philadelphia"; 

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Testimonials = () => {
  const { openQuoteForm } = useQuoteForm();
  const { language, t } = useTranslation();

  return (
    <div className="pb-32 bg-white overflow-hidden">
      {/* Dynamic Hero Section */}
      <section className="relative bg-[#FF1493] text-white pt-28 pb-56 md:pt-32 md:pb-64 text-center rounded-b-[4rem] md:rounded-b-[10rem]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-[100px]"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-300 rounded-full blur-[100px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/20">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-xs font-black tracking-[0.2em] uppercase">Trusted Across Philadelphia</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 italic tracking-tighter leading-none">
              Philly <span className="text-pink-200">Loves</span> Us.
            </h1>
            <p className="text-lg md:text-2xl text-pink-50 max-w-2xl mx-auto mb-10 font-medium leading-relaxed opacity-90 px-4">
              Join hundreds of happy families and businesses who trust the "Ana Standard" to maintain their beautiful spaces.
            </p>
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/5 backdrop-blur-lg p-2 rounded-[2rem] sm:rounded-full border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 px-6 py-3">
                <div className="flex gap-1 text-yellow-300">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <span className="font-black text-sm tracking-tight border-l border-white/20 pl-4 uppercase">5.0/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Reviews Wall */}
      <section className="container mx-auto px-6 -mt-32 md:-mt-40 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          {TESTIMONIALS.map((review, idx) => (
            <motion.div 
              key={review.id}
              variants={itemVariants}
              className="break-inside-avoid bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-2 transition-all duration-500 relative flex flex-col"
            >
              <div className="absolute top-8 right-10 text-pink-50 group-hover:text-pink-100 transition-colors">
                <Quote size={40} strokeWidth={3} />
              </div>
              
              <div className="flex gap-1 text-yellow-400 mb-6">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={14} />)}
              </div>

              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic font-medium">
                "{language === 'es' ? review.content_es : review.content}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center text-[#FF1493] font-black text-lg border-2 border-white shadow-sm shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 flex items-center gap-1.5 text-sm md:text-base">
                    {review.name}
                    <div className="bg-blue-500 rounded-full p-0.5" title="Verified Client">
                      <CheckCircle size={10} className="text-white" fill="currentColor" />
                    </div>
                  </h4>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mt-1">{review.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Grid of star-only ratings */}
      <section className="container mx-auto px-6 mt-32">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-[#FF1493] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            <CheckCircle size={12} /> Verified Excellence
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">More <span className="text-[#FF1493]">5-Star</span> Neighbors</h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {STAR_REVIEWS.map((review, idx) => (
            <div 
              key={`${review.name}-${idx}`}
              className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="flex gap-0.5 text-yellow-400 mb-3">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={10} />)}
              </div>
              <h4 className="font-bold text-gray-900 text-[11px] mb-1">{review.name}</h4>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.1em]">{review.date}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* External Platform Links */}
      <section className="container mx-auto px-6 mt-32">
        <div className="relative max-w-5xl mx-auto overflow-hidden rounded-[3rem] md:rounded-[5rem] bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-2xl shadow-gray-200/50">
          <div className="absolute -right-20 -top-20 opacity-10 rotate-12 pointer-events-none">
            <MessageSquare size={300} className="text-[#FF1493]" />
          </div>
          
          <div className="p-10 md:p-20 flex flex-col items-center text-center relative z-10">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF1493] mb-8 shadow-sm">
              <Heart size={32} fill="currentColor" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
              Share your <span className="text-[#FF1493]">Philly</span> sparkle.
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
              As a local Philadelphia business, your feedback is our heartbeat. If we made your home sparkle, please share it with the neighborhood!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
              <a 
                href={GOOGLE_REVIEW_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 border border-gray-200 shadow-xl hover:-translate-y-1 transition-transform"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                Google <ExternalLink size={18} className="text-gray-300" />
              </a>

              <a 
                href={YELP_REVIEW_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-gray-900 px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 border border-gray-200 shadow-xl hover:-translate-y-1 transition-transform"
              >
                <img src="https://i.ibb.co/YTLvCCsb/Yelp-Logo.png" alt="Yelp" className="w-8 h-auto" />
                Yelp <ExternalLink size={18} className="text-gray-400" />
              </a>
            </div>
            
            <div className="mt-10 flex gap-1.5 text-yellow-400">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={24} />)}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container mx-auto px-6 mt-32">
        <div className="bg-gray-900 rounded-[3rem] md:rounded-[5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF1493]/20 to-transparent"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl md:text-7xl font-bold leading-[1.1]">Ready for your own 5-star clean?</h2>
            <p className="text-gray-400 text-lg md:text-2xl font-medium leading-relaxed">
              Every clean is backed by our signature 100% Satisfaction Promise. If you aren't happy, we'll fix it.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={openQuoteForm} 
                className="bg-[#FF1493] text-white px-12 py-6 rounded-2xl text-xl font-black shadow-2xl shadow-[#FF1493]/20 hover:scale-105 active:scale-95 transition-all"
              >
                Request Your Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
