import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Calendar, User, MapPin, ClipboardList, Clock, Plus, Loader2, Sparkles, Building2 } from 'lucide-react';
import { useQuoteForm } from '../context/QuoteContext';

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const QuoteFormModal = () => {
  const { isQuoteFormOpen, closeQuoteForm, openCommercialQuote } = useQuoteForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', apt: '', city: '', state: 'PA', zip: '',
    serviceType: 'Basic Clean',
    bedrooms: '', bathrooms: '', occupied: 'Yes', pets: 'No',
    date: '', timeWindow: 'Flexible',
    additionalServices: [] as string[],
    frequency: 'One time cleaning',
    notes: '',
    consent: false,
    notificationsOptIn: false,
    'bot-field': ''
  });

  const generateRefId = () => {
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    return `R${randomNum}`;
  };

  const minDateString = useMemo(() => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 4);
    return minDate.toISOString().split('T')[0];
  }, []);

  const displayMinDate = useMemo(() => {
    const d = new Date(minDateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [minDateString]);

  useEffect(() => {
    if (isQuoteFormOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isQuoteFormOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email must be in a valid format (e.g. name@domain.com)";
    }

    const digits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (digits.length !== 10) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.street.trim()) newErrors.street = "Street address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim() || formData.state.length !== 2) newErrors.state = "State must be 2 letters (e.g. PA)";
    if (!formData.zip.trim() || !/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = "Zip code must be 5 digits";

    setErrors(newErrors);

    // Focus first error
    if (newErrors.firstName) firstNameRef.current?.focus();
    else if (newErrors.lastName) lastNameRef.current?.focus();
    else if (newErrors.email) emailRef.current?.focus();
    else if (newErrors.phone) phoneRef.current?.focus();
    else if (newErrors.street) streetRef.current?.focus();
    else if (newErrors.city) cityRef.current?.focus();
    else if (newErrors.state) stateRef.current?.focus();
    else if (newErrors.zip) zipRef.current?.focus();

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/26066533/ugqpdwr/";
    const formName = 'Residential Quote Request';
    const refId = generateRefId();
    const today = new Date().toISOString().split('T')[0];
    
    // Normalize phone to US E.164: +1XXXXXXXXXX
    const digits = formData.phone.replace(/\D/g, '');
    const normalizedPhone = `+1${digits}`;

    const payload = {
      'form-name': formName,
      'bot-field': formData['bot-field'],
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: normalizedPhone,
      street_address: formData.street,
      apt_suite: formData.apt,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip,
      service_type: formData.serviceType,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      occupied: formData.occupied,
      pets: formData.pets,
      preferred_date: formData.date,
      time_window: formData.timeWindow,
      add_ons: formData.additionalServices.join(', '),
      frequency: formData.frequency,
      additional_notes: formData.notes,
      notifications_opt_in: formData.notificationsOptIn ? 'Yes' : 'No',
      reference_id: refId,
      group: 'Residential',
      time_zone: 'EST',
      birthday: today
    };

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(payload)
      });

      await fetch(webhookUrl, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isQuoteFormOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuoteForm}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#FF1493] p-5 md:p-8 text-white flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest opacity-90 block mb-0.5">Free Estimate</span>
                <h2 className="text-xl md:text-3xl font-bold">Residential Quote</h2>
              </div>
              <button 
                onClick={closeQuoteForm}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} className="md:w-7 md:h-7" />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow p-5 md:p-10 custom-scrollbar">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto border border-green-100 shadow-sm">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2 px-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Request Received!</h3>
                    <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto font-bold leading-relaxed">
                      Thank you, {formData.firstName}! Your request has been sent successfully. Ana will review your details and get back to you shortly.
                    </p>
                  </div>
                  <button 
                    onClick={closeQuoteForm}
                    className="bg-[#FF1493] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-pink-100 hover:scale-105 active:scale-95 transition-transform"
                  >
                    Got it!
                  </button>
                </motion.div>
              ) : (
                <form 
                  noValidate
                  name="Residential Quote Request"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-10 md:space-y-12"
                >
                  <input type="hidden" name="form-name" value="Residential Quote Request" />
                  <input type="hidden" name="bot-field" value={formData['bot-field']} />

                  <div className="bg-pink-50/50 p-4 md:p-6 rounded-2xl border border-pink-100 flex items-start gap-4">
                    <Building2 className="text-[#FF1493] shrink-0 mt-1" size={20} />
                    <p className="text-sm text-gray-700 font-bold leading-relaxed">
                      If the home is not occupied by you, please complete a <button type="button" onClick={() => { closeQuoteForm(); openCommercialQuote(); }} className="text-[#FF1493] underline hover:text-[#D1107A]">commercial quote</button> instead.
                    </p>
                  </div>

                  <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <User className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs md:text-sm">Contact Information</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">First Name <span className="text-red-500">*</span></label>
                        <input ref={firstNameRef} name="first_name" required type="text" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.firstName ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="Jane" />
                        {errors.firstName && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.firstName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Last Name <span className="text-red-500">*</span></label>
                        <input ref={lastNameRef} name="last_name" required type="text" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.lastName ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="Doe" />
                        {errors.lastName && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.lastName}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Email Address <span className="text-red-500">*</span></label>
                        <input ref={emailRef} name="email" required type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.email ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="jane@example.com" />
                        {errors.email && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Phone Number <span className="text-red-500">*</span></label>
                        <input ref={phoneRef} name="phone" required type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.phone ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="(215) 555-0123" />
                        {errors.phone && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.phone}</p>}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <MapPin className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs md:text-sm">Service Address</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Street Address <span className="text-red-500">*</span></label>
                        <input ref={streetRef} name="street_address" required type="text" value={formData.street} onChange={e => handleInputChange('street', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.street ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="123 Philly Lane" />
                        {errors.street && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.street}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Apt or Suite</label>
                        <input name="apt_suite" type="text" value={formData.apt} onChange={e => handleInputChange('apt', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400" placeholder="Apt 4B" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">City <span className="text-red-500">*</span></label>
                        <input ref={cityRef} name="city" required type="text" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.city ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="Philadelphia" />
                        {errors.city && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.city}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">State <span className="text-red-500">*</span></label>
                        <input ref={stateRef} name="state" required type="text" value={formData.state} onChange={e => handleInputChange('state', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.state ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="PA" />
                        {errors.state && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.state}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Zip Code <span className="text-red-500">*</span></label>
                        <input ref={zipRef} name="zip_code" required type="text" value={formData.zip} onChange={e => handleInputChange('zip', e.target.value)} className={`w-full bg-gray-50 border-2 ${errors.zip ? 'border-red-300' : 'border-gray-100'} focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none transition-all text-gray-900 text-sm md:text-base font-medium placeholder:text-gray-400`} placeholder="19103" />
                        {errors.zip && <p className="text-gray-500 text-[10px] font-bold mt-1 ml-1 italic">{errors.zip}</p>}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Sparkles className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs md:text-sm">Service Details</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Type of Cleaning</label>
                        <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                          {['Basic Clean', 'Premium Clean', 'Deep Clean', 'Move In / Out'].map(type => (
                            <button 
                              key={type} type="button" 
                              onClick={() => handleInputChange('serviceType', type)}
                              className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black border-2 transition-all active:scale-95 ${formData.serviceType === type ? 'bg-[#FF1493] text-white border-[#FF1493] shadow-md shadow-pink-100' : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-pink-200'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="service_type" value={formData.serviceType} />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Bedrooms</label>
                          <input name="bedrooms" required type="number" value={formData.bedrooms} onChange={e => handleInputChange('bedrooms', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none text-gray-900 text-sm font-bold" placeholder="0" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Bathrooms</label>
                          <input name="bathrooms" required type="number" step="0.5" value={formData.bathrooms} onChange={e => handleInputChange('bathrooms', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none text-gray-900 text-sm font-bold" placeholder="0" />
                        </div>
                        <div className="space-y-2 col-span-2 md:col-span-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Are there pets?</label>
                          <select name="pets" value={formData.pets} onChange={e => handleInputChange('pets', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none text-gray-900 text-sm font-bold cursor-pointer">
                            <option>No</option>
                            <option>Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4 md:space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Calendar className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs md:text-sm">Scheduling</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <div className="flex justify-between items-end mb-1 px-1">
                          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Preferred Date</label>
                          <span className="text-[10px] text-[#FF1493] font-black italic">Earliest: {displayMinDate}</span>
                        </div>
                        <div className="relative">
                          <input 
                            name="preferred_date"
                            required 
                            type="date" 
                            min={minDateString}
                            value={formData.date} 
                            onClick={(e) => (e.target as any).showPicker?.()}
                            onChange={e => handleInputChange('date', e.target.value)} 
                            className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none text-gray-900 text-sm font-bold cursor-pointer" 
                          />
                          <Calendar size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Time Window</label>
                        <select name="time_window" value={formData.timeWindow} onChange={e => handleInputChange('timeWindow', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white p-3.5 md:p-4 rounded-xl md:rounded-2xl outline-none text-gray-900 text-sm font-bold cursor-pointer">
                          <option>Morning</option>
                          <option>Afternoon</option>
                          <option>Flexible</option>
                        </select>
                      </div>
                      <div className="space-y-3 md:col-span-2">
                        <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Frequency</label>
                        <div className="grid grid-cols-2 gap-2.5 md:gap-3">
                          {['One time cleaning', 'Weekly', 'Biweekly', 'Monthly'].map(freq => (
                            <button 
                              key={freq} type="button" 
                              onClick={() => handleInputChange('frequency', freq)}
                              className={`p-3 md:p-4 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all active:scale-95 ${formData.frequency === freq ? 'bg-[#FF1493] text-white border-[#FF1493] shadow-lg shadow-pink-100' : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-pink-200'}`}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="frequency" value={formData.frequency} />
                      </div>
                    </div>
                  </section>

                  <div className="pt-6 pb-2 space-y-6">
                    <div className="space-y-4">
                      <label className="flex items-start gap-4 cursor-pointer group bg-pink-50/30 p-4 rounded-2xl border border-pink-100/50">
                        <input 
                          name="notifications_opt_in"
                          type="checkbox" 
                          className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded accent-[#FF1493] shrink-0 cursor-pointer"
                          checked={formData.notificationsOptIn}
                          onChange={e => handleInputChange('notificationsOptIn', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700 font-bold leading-relaxed group-hover:text-gray-900 transition-colors">
                          Opt-in to receive appointment notifications via text or email.
                        </span>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer group bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <input 
                          name="consent"
                          required type="checkbox" 
                          className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded accent-[#FF1493] shrink-0 cursor-pointer"
                          checked={formData.consent}
                          onChange={e => handleInputChange('consent', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700 font-bold leading-relaxed group-hover:text-gray-900 transition-colors">
                          I understand this is a request for a quote and not a confirmed booking. Ana will contact me to finalize.
                        </span>
                      </label>
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FF1493] text-white py-5 md:py-6 rounded-2xl md:rounded-[2rem] text-lg md:text-xl font-black shadow-xl shadow-pink-200 hover:scale-[1.01] hover:bg-[#D1107A] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Request a Free Quote
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteFormModal;