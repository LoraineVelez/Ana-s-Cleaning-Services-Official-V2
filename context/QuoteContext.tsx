
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteContextType {
  isQuoteFormOpen: boolean;
  openQuoteForm: () => void;
  closeQuoteForm: () => void;
  isCommercialQuoteOpen: boolean;
  openCommercialQuote: () => void;
  closeCommercialQuote: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isCommercialQuoteOpen, setIsCommercialQuoteOpen] = useState(false);

  const openQuoteForm = () => setIsQuoteFormOpen(true);
  const closeQuoteForm = () => setIsQuoteFormOpen(false);
  
  const openCommercialQuote = () => setIsCommercialQuoteOpen(true);
  const closeCommercialQuote = () => setIsCommercialQuoteOpen(false);

  return (
    <QuoteContext.Provider value={{ 
      isQuoteFormOpen, openQuoteForm, closeQuoteForm,
      isCommercialQuoteOpen, openCommercialQuote, closeCommercialQuote
    }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteForm = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuoteForm must be used within a QuoteProvider');
  }
  return context;
};
