
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Instagram, Facebook, MessageCircle, Globe, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuoteForm } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openQuoteForm } = useQuoteForm();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: t('nav.services', 'Services'), path: '/services' },
    { name: t('nav.about', 'About'), path: '/about' },
    { name: t('nav.testimonials', 'Testimonials'), path: '/testimonials' },
    { name: t('nav.portal', 'Client Center'), path: '/portal' }
  ];

  const logoSrc = "https://i.ibb.co/FbY9Gvyn/Untitled-design-8.png";

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
            : 'bg-white md:bg-transparent py-3 md:py-6'
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center group transition-transform hover:scale-[1.02] active:scale-95">
            <img 
              src={logoSrc} 
              alt="Ana's Cleaning Services" 
              className={`transition-all duration-300 ${isScrolled ? 'h-9 md:h-12' : 'h-11 md:h-16'} w-auto object-contain`}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`text-sm font-semibold transition-colors hover:text-[#FF1493] ${location.pathname === item.path ? 'text-[#FF1493]' : 'text-gray-600'}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:267-854-9564" className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#FF1493] transition-colors">
              <Phone size={18} className="text-[#FF1493] animate-bounce" />
              (267) 854-9564
            </a>
            <button 
              onClick={openQuoteForm}
              className="bg-[#FF1493] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-pink-200 hover:scale-105 active:scale-95 transition-all"
            >
              {t('cta.quote', 'Request a Quote')}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a href="tel:267-854-9564" className="p-2 text-[#FF1493] active:scale-90 transition-transform">
              <Phone size={22} />
            </a>
            <button 
              className="p-2 text-gray-800 active:scale-90 transition-transform" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[110] flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-50">
              <img src={logoSrc} alt="Ana's Cleaning Services" className="h-9 w-auto object-contain" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 rounded-full">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-8 py-10 flex flex-col gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className={`text-4xl font-bold tracking-tight ${location.pathname === item.path ? 'text-[#FF1493]' : 'text-gray-900'}`} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/faq" className="text-2xl font-bold text-gray-400 mt-2" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
              
              <div className="mt-auto space-y-4 pt-10 pb-6">
                <a href="tel:267-854-9564" className="w-full bg-gray-50 text-gray-800 py-5 rounded-3xl flex items-center justify-center gap-3 text-lg font-bold active:scale-95 transition-transform">
                  <Phone size={20} className="text-[#FF1493]" /> (267) 854-9564
                </a>
                <button 
                  onClick={() => { setMobileMenuOpen(false); openQuoteForm(); }}
                  className="w-full bg-[#FF1493] text-white py-6 rounded-3xl text-center text-xl font-bold shadow-xl shadow-pink-100 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {t('cta.quote', 'Request a Quote')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  const { language, setLanguage, t } = useTranslation();
  const logoSrc = "https://i.ibb.co/FbY9Gvyn/Untitled-design-8.png";

  return (
    <footer className="bg-white pt-16 md:pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <Link to="/" className="mb-4 block">
              <img src={logoSrc} alt="Ana's Cleaning Services" className="h-16 md:h-12 w-auto object-contain" />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Providing top-tier cleaning services to Philadelphia homes and businesses since 2020. Your trust is my priority.
            </p>
            <div className="flex flex-col gap-3 mt-4 items-center md:items-start">
              <div className="inline-flex items-center gap-2 bg-pink-50 text-[#FF1493] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-pink-100/50">
                <Globe size={12} /> Se Habla Español
              </div>
              
              {/* Language Toggle */}
              <div className="inline-flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100 shadow-inner">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-tighter transition-all ${language === 'en' ? 'bg-[#FF1493] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('es')}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black tracking-tighter transition-all ${language === 'es' ? 'bg-[#FF1493] text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  ES
                </button>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Instagram className="text-gray-400 hover:text-[#FF1493] cursor-pointer transition-colors" size={20} />
              <Facebook className="text-gray-400 hover:text-[#FF1493] cursor-pointer transition-colors" size={20} />
            </div>
          </div>

          <div className="text-center md:text-left hidden md:block">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">{t('footer.explore', 'Explore')}</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <li><Link to="/services" className="hover:text-[#FF1493] transition-colors">{t('nav.services', 'Services')}</Link></li>
              <li><Link to="/about" className="hover:text-[#FF1493] transition-colors">{t('nav.about', 'About')}</Link></li>
              <li><Link to="/testimonials" className="hover:text-[#FF1493] transition-colors">{t('nav.testimonials', 'Reviews')}</Link></li>
              <li><Link to="/portal" className="hover:text-[#FF1493] transition-colors">{t('nav.portal', 'Client Center')}</Link></li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">{t('footer.contact', 'Contact')}</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-600 font-medium">
              <li><a href="tel:267-854-9564" className="hover:text-[#FF1493] transition-colors">(267) 854-9564</a></li>
              <li><a href="mailto:anascleaningservicesphl@gmail.com" className="hover:text-[#FF1493] transition-colors">anascleaningservicesphl@gmail.com</a></li>
              <li>Philadelphia, PA</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">{t('footer.areas', 'Service Areas')}</h4>
            <ul className="grid grid-cols-2 md:flex md:flex-col gap-2 text-sm text-gray-500 font-medium">
              <li>Center City</li>
              <li>Fishtown</li>
              <li>Main Line</li>
              <li>South Philly</li>
              <li>University City</li>
              <li>NoLibs</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] md:text-xs text-gray-400 font-bold text-center md:text-left uppercase tracking-widest">© 2024 Ana Rose Cleaning Co. {t('footer.built', 'Built for Philly')}.</p>
          <div className="flex gap-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">
            <Link to="/terms" className="hover:text-gray-900">{t('footer.terms', 'Terms')}</Link>
            <Link to="/privacy" className="hover:text-gray-900">{t('footer.privacy', 'Privacy')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-16 md:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};
