
// Fix: Import React to resolve 'Cannot find namespace React' error for React.ReactNode type
import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  content: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}