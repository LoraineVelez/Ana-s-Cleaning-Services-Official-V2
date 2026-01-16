import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Building2, User, MapPin, ClipboardList, Clock, Loader2, Sparkles, Calendar, Phone, Mail, Key } from 'lucide-react';
import { useQuoteForm } from '../context/QuoteContext';
import { useTranslation } from '../context/LanguageContext';

const BUSINESS_TYPES = ['Office', 'Retail', 'Restaurant', 'Airbnb / Short Term Rental', 'Other'];
const SERVICES_REQUESTED = ['Routine Cleaning', 'Deep Cleaning', 'Move In / Move Out', 'Post Construction', 'Other'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_WINDOWS = ['Morning', 'Afternoon', 'Evening', 'After Hours'];
const FREQUENCIES = ['One Time', 'Weekly', 'Biweekly', 'Monthly', 'Custom'];

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const CommercialQuoteModal = () => {
  const { isCommercialQuoteOpen, closeCommercialQuote } = useQuoteForm();
  const { t } = useTranslation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    street: '',
    apt: '',
    city: '',
    state: 'PA',
    zip: '',
    businessType: 'Office',
    otherBusinessType: '',
    isOccupied: 'Yes',
    sqft: '',
    numRooms: '',
    numBathrooms: '',
    numFloors: '1',
    services: [] as string[],
    serviceDescription: '',
    preferredDays: [] as string[],
    preferredTime: 'Morning',
    afterHoursAllowed: 'No',
    startTimeWindow: '',
    frequency: 'One Time',
    accessInfo: '',
    additionalNotes: '',
    followUpPreference: 'Email',
    acknowledgment: false,
    notificationsOptIn: false,
    'bot-field': ''
  });

  const generateRefId = () => {
    const randomNum = Math.floor(Math.random() * 90000) + 10000;
    return `C${randomNum}`;
  };

  useEffect(() => {
    if (isCommercialQuoteOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCommercialQuoteOpen]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: 'services' | 'preferredDays', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acknowledgment) return;
    setIsSubmitting(true);
    
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/26066533/ugqpdwr/";
    const formName = 'Commercial Quote Request';
    const refId = generateRefId();
    const today = new Date().toISOString().split('T')[0];
    
    const payload = {
      'form-name': formName,
      'bot-field': formData['bot-field'],
      company: formData.businessName,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      street_address: formData.street,
      apt_suite: formData.apt,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip,
      businessType: formData.businessType,
      otherBusinessType: formData.otherBusinessType,
      isOccupied: formData.isOccupied,
      sqft: formData.sqft,
      numRooms: formData.numRooms,
      numBathrooms: formData.numBathrooms,
      numFloors: formData.numFloors,
      services: formData.services.join(', '),
      serviceDescription: formData.serviceDescription,
      preferredDays: formData.preferredDays.join(', '),
      preferredTime: formData.preferredTime,
      afterHoursAllowed: formData.afterHoursAllowed,
      startTimeWindow: formData.startTimeWindow,
      frequency: formData.frequency,
      accessInfo: formData.accessInfo,
      additionalNotes: formData.additionalNotes,
      followUpPreference: formData.followUpPreference,
      notifications_opt_in: formData.notificationsOptIn ? 'Yes' : 'No',
      reference_id: refId,
      group: 'Commercial',
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
      {isCommercialQuoteOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCommercialQuote}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gray-900 p-5 md:p-8 text-white flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#FF1493] block mb-0.5">Business Solutions</span>
                <h2 className="text-xl md:text-3xl font-bold">Commercial Estimate</h2>
              </div>
              <button onClick={closeCommercialQuote} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto flex-grow p-5 md:p-10 custom-scrollbar">
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-[#FF1493] mx-auto border border-pink-100 shadow-sm">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2 px-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Proposal Request Received!</h3>
                    <p className="text-gray-700 text-base md:text-lg max-w-md mx-auto font-medium">
                      Thank you for reaching out. Ana will review your commercial space requirements and contact you shortly to discuss the next steps.
                    </p>
                  </div>
                  <button onClick={closeCommercialQuote} className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-transform">
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <form 
                  name="Commercial Quote Request"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit} 
                  className="space-y-12"
                >
                  <input type="hidden" name="form-name" value="Commercial Quote Request" />
                  <input type="hidden" name="bot-field" value={formData['bot-field']} />

                  {/* Section: Business Info */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Building2 className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Business Information</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Business Name (Company)</label>
                        <input name="company" required type="text" value={formData.businessName} onChange={e => handleInputChange('businessName', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none transition-all font-medium text-gray-900" placeholder="Company LLC" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                        <input name="first_name" required type="text" value={formData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none transition-all font-medium text-gray-900" placeholder="Jane" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                        <input name="last_name" required type="text" value={formData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none transition-all font-medium text-gray-900" placeholder="Smith" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <input name="phone" required type="tel" value={formData.phone} onChange={e => handleInputChange('phone', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none transition-all font-medium text-gray-900" placeholder="(215) 555-0123" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input name="email" required type="email" value={formData.email} onChange={e => handleInputChange('email', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none transition-all font-medium text-gray-900" placeholder="jane@company.com" />
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <MapPin className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Service Location</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Street Address</label>
                        <input name="street_address" required type="text" value={formData.street} onChange={e => handleInputChange('street', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-medium text-gray-900" placeholder="123 Market St" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Apt or Suite</label>
                        <input name="apt_suite" type="text" value={formData.apt} onChange={e => handleInputChange('apt', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-medium text-gray-900" placeholder="Suite 200" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">City</label>
                        <input name="city" required type="text" value={formData.city} onChange={e => handleInputChange('city', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-medium text-gray-900" placeholder="Philadelphia" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">State</label>
                        <input name="state" required type="text" value={formData.state} onChange={e => handleInputChange('state', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-medium text-gray-900" placeholder="PA" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Zip Code</label>
                        <input name="zip_code" required type="text" value={formData.zip} onChange={e => handleInputChange('zip', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-medium text-gray-900" placeholder="19106" />
                      </div>
                    </div>
                  </section>

                  {/* Section: Business Type */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <ClipboardList className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Business Type</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Type of Commercial Space</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {BUSINESS_TYPES.map(type => (
                            <button 
                              key={type} type="button" 
                              onClick={() => handleInputChange('businessType', type)}
                              className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.businessType === type ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-100 text-gray-500 hover:border-pink-100'}`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="businessType" value={formData.businessType} />
                        {formData.businessType === 'Other' && (
                          <input name="otherBusinessType" type="text" value={formData.otherBusinessType} onChange={e => handleInputChange('otherBusinessType', e.target.value)} className="w-full mt-2 bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none text-gray-900" placeholder="Please specify..." />
                        )}
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Is this location currently occupied?</label>
                        <div className="flex gap-3">
                          {['Yes', 'No'].map(opt => (
                            <button 
                              key={opt} type="button" 
                              onClick={() => handleInputChange('isOccupied', opt)}
                              className={`px-8 py-3 rounded-xl text-xs font-black border-2 transition-all ${formData.isOccupied === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="isOccupied" value={formData.isOccupied} />
                      </div>
                    </div>
                  </section>

                  {/* Section: Space Details */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <MapPin className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Space Size</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Approx. Sqft</label>
                        <input name="sqft" required type="text" value={formData.sqft} onChange={e => handleInputChange('sqft', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-bold text-gray-900" placeholder="2500" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Rooms / Offices</label>
                        <input name="numRooms" required type="number" value={formData.numRooms} onChange={e => handleInputChange('numRooms', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-bold text-gray-900" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Bathrooms</label>
                        <input name="numBathrooms" required type="number" step="0.5" value={formData.numBathrooms} onChange={e => handleInputChange('numBathrooms', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-bold text-gray-900" placeholder="0" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Floors</label>
                        <input name="numFloors" required type="number" value={formData.numFloors} onChange={e => handleInputChange('numFloors', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-bold text-gray-900" placeholder="1" />
                      </div>
                    </div>
                  </section>

                  {/* Section: Cleaning Needs */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Sparkles className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Cleaning Needs</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Services Requested</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SERVICES_REQUESTED.map(service => (
                            <label key={service} className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border-2 border-gray-100 cursor-pointer hover:border-pink-200 transition-all">
                              <input 
                                type="checkbox" 
                                className="w-5 h-5 accent-[#FF1493]" 
                                checked={formData.services.includes(service)}
                                onChange={() => toggleArrayItem('services', service)}
                              />
                              <span className="text-sm font-bold text-gray-700">{service}</span>
                            </label>
                          ))}
                        </div>
                        <input type="hidden" name="services" value={formData.services.join(', ')} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Brief Description of Needs</label>
                        <textarea name="serviceDescription" value={formData.serviceDescription} onChange={e => handleInputChange('serviceDescription', e.target.value)} rows={3} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none resize-none font-medium text-gray-900" placeholder="Example: restrooms, kitchen, floors, windows..."></textarea>
                      </div>
                    </div>
                  </section>

                  {/* Section: Scheduling */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Calendar className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Scheduling</h3>
                    </div>
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Service Days</label>
                        <div className="flex flex-wrap gap-2">
                          {DAYS.map(day => (
                            <button 
                              key={day} type="button" 
                              onClick={() => toggleArrayItem('preferredDays', day)}
                              className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter border-2 transition-all ${formData.preferredDays.includes(day) ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                            >
                              {day.slice(0, 3)}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="preferredDays" value={formData.preferredDays.join(', ')} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Time of Day</label>
                          <select name="preferredTime" value={formData.preferredTime} onChange={e => handleInputChange('preferredTime', e.target.value)} className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl outline-none font-bold text-gray-900">
                            {TIME_WINDOWS.map(tw => <option key={tw} value={tw}>{tw}</option>)}
                          </select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">After Hours Allowed?</label>
                          <div className="flex gap-3">
                            {['Yes', 'No'].map(opt => (
                              <button 
                                key={opt} type="button" 
                                onClick={() => handleInputChange('afterHoursAllowed', opt)}
                                className={`flex-1 py-3 rounded-xl text-xs font-black border-2 transition-all ${formData.afterHoursAllowed === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          <input type="hidden" name="afterHoursAllowed" value={formData.afterHoursAllowed} />
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Clock className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Frequency</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {FREQUENCIES.map(freq => (
                        <button 
                          key={freq} type="button" 
                          onClick={() => handleInputChange('frequency', freq)}
                          className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.frequency === freq ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-gray-50 border-gray-100 text-gray-500'}`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                    <input type="hidden" name="frequency" value={formData.frequency} />
                  </section>

                  {/* Section: Access Info */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                      <Key className="text-[#FF1493]" size={18} />
                      <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Access Information</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Entry Instructions / Access Notes</label>
                      <textarea name="accessInfo" value={formData.accessInfo} onChange={e => handleInputChange('accessInfo', e.target.value)} rows={3} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none resize-none font-medium text-gray-900" placeholder="e.g. Door code is 1234, or pick up key from front desk..."></textarea>
                    </div>
                  </section>

                  <section className="space-y-8 pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Additional Notes</label>
                        <textarea name="additionalNotes" value={formData.additionalNotes} onChange={e => handleInputChange('additionalNotes', e.target.value)} rows={2} className="w-full bg-gray-50 border-2 border-gray-100 focus:border-gray-900 focus:bg-white p-4 rounded-xl outline-none resize-none font-medium text-gray-900" placeholder="Anything else we should know?"></textarea>
                      </div>

                      <label className="flex items-start gap-4 cursor-pointer group bg-pink-50/30 p-4 rounded-2xl border border-pink-100/50">
                        <input 
                          name="notifications_opt_in"
                          type="checkbox" 
                          className="mt-1 w-6 h-6 rounded accent-[#FF1493] shrink-0 cursor-pointer"
                          checked={formData.notificationsOptIn}
                          onChange={e => handleInputChange('notificationsOptIn', e.target.checked)}
                        />
                        <span className="text-sm text-gray-700 font-bold leading-relaxed group-hover:text-gray-900 transition-colors">
                          Opt-in to receive appointment notifications via text or email.
                        </span>
                      </label>

                      <label className="flex items-start gap-4 cursor-pointer group bg-gray-50 p-6 rounded-[2rem] border-2 border-gray-100 hover:border-pink-100 transition-all">
                        <input 
                          name="acknowledgment"
                          required type="checkbox" 
                          className="mt-1 w-6 h-6 rounded accent-[#FF1493] shrink-0 cursor-pointer"
                          checked={formData.acknowledgment}
                          onChange={e => handleInputChange('acknowledgment', e.target.checked)}
                        />
                        <span className="text-sm text-gray-600 font-bold leading-relaxed group-hover:text-gray-900 transition-colors">
                          I understand this request does not guarantee service and Ana’s Cleaning Services will contact me to confirm or decline.
                        </span>
                      </label>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting || !formData.acknowledgment}
                      className="w-full bg-gray-900 text-white py-6 md:py-8 rounded-[2rem] text-xl font-black shadow-2xl hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={24} />
                          Processing Request...
                        </>
                      ) : (
                        <>
                          Submit Commercial Quote Request
                        </>
                      )}
                    </button>
                  </section>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommercialQuoteModal;
