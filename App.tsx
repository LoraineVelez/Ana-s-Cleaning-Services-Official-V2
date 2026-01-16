
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Testimonials from './pages/Testimonials';
import ClientPortal from './pages/ClientPortal';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { QuoteProvider } from './context/QuoteContext';
import { LanguageProvider } from './context/LanguageContext';
import QuoteFormModal from './components/QuoteFormModal';
import CommercialQuoteModal from './components/CommercialQuoteModal';

const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LanguageProvider>
      <QuoteProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/portal" element={<ClientPortal />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </Layout>
        <QuoteFormModal />
        <CommercialQuoteModal />
      </QuoteProvider>
    </LanguageProvider>
  );
};

export default App;
