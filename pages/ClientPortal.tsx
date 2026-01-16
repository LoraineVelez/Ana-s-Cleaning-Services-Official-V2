
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Gift, Sparkles, Copy, Check, Star, Heart, ExternalLink, CreditCard, ShieldCheck, Wallet, Smartphone, Loader2, RefreshCw, MessageSquare, Send } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

const WEBSITE_URL = "https://anascleaningservicesphl.com"; 
const GOOGLE_REVIEW_URL = "https://g.page/r/anaestevez990/review"; 
const YELP_REVIEW_URL = "https://www.yelp.com/biz/anas-cleaning-services-philadelphia"; 
const SQUARE_PAYMENT_URL = "https://square.link/u/hx7O8aYP"; 

const encode = (data: any) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const ClientPortal = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '',
    currentFrequency: 'Bi-weekly',
    requestedFrequency: 'Bi-weekly',
    startDate: '',
    notes: '',
    'bot-field': ''
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(WEBSITE_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("(267) 854-9564");
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/26066533/ugqpdwr/";
    
    const payload = {
      'form-name': 'Schedule Change Request',
      ...formData
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
    <div className="pb-32 bg-white overflow-hidden">
      {/* Premium Hero Header - Matching Testimonials Style */}
      <section className="relative bg-[#FF1493] text-white pt-28 pb-48 md:pt-40 md:pb-64 text-center rounded-b-[4rem] md:rounded-b-[10rem]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-white rounded-full blur-[120px]"
          />
          <motion.div 
            animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-pink-300 rounded-full blur-[120px]"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4 border border-white/20">
              <Sparkles size={16} className="text-yellow-300" />
              <span className="text-[10px] font-black tracking-[0.2em] uppercase">Private Client Center</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-bold tracking-tighter leading-none italic">
              {t('portal.title', 'Client')} <span className="text-pink-200">{t('portal.title_accent', 'Center')}</span>
            </h1>
            <p className="text-lg md:text-2xl text-pink-50 max-w-2xl mx-auto leading-relaxed font-medium opacity-90 px-4">
              {t('portal.desc', 'Welcome back! This space is dedicated to our recurring Philly neighbors. Request schedule changes, handle payments, and share the love.')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 -mt-24 md:-mt-32 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8 md:space-y-12">
            
            {/* Schedule Change Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 text-center md:text-left">
                <div className="w-20 h-20 bg-pink-50 rounded-[2rem] flex items-center justify-center text-[#FF1493] shrink-0 shadow-sm border border-pink-100">
                  <RefreshCw size={36} strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">{t('portal.schedule.title', 'Request a Schedule Change')}</h2>
                  <p className="text-gray-500 text-lg md:text-xl font-medium">{t('portal.schedule.desc', 'Need to adjust your cleaning frequency or pause service?')}</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50/50 p-10 md:p-16 rounded-[3rem] text-center space-y-6 border border-green-100"
                >
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-green-500 mx-auto shadow-sm">
                    <Check size={48} strokeWidth={3} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{t('portal.schedule.success', 'Request Received')}</h3>
                    <p className="text-gray-600 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
                      {t('portal.schedule.success_desc', 'Ana will review your request and reach out via email or text to confirm.')}
                    </p>
                  </div>
                  <button onClick={() => setIsSubmitted(false)} className="text-[#FF1493] font-black underline text-xl tracking-tight hover:text-[#D1107A] transition-colors">
                    {t('portal.schedule.another', 'Send another request')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input required name="name" value={formData.name} onChange={handleInputChange} type="text" className="w-full bg-gray-50/50 p-5 rounded-2xl border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white transition-all outline-none text-gray-900 font-bold placeholder:text-gray-300" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-gray-50/50 p-5 rounded-2xl border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white transition-all outline-none text-gray-900 font-bold placeholder:text-gray-300" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">New Frequency</label>
                    <select name="requestedFrequency" value={formData.requestedFrequency} onChange={handleInputChange} className="w-full bg-gray-50/50 p-5 rounded-2xl border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white transition-all outline-none text-gray-900 font-black cursor-pointer">
                      <option>Weekly</option>
                      <option>Bi-weekly</option>
                      <option>Monthly</option>
                      <option>Pause Service</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Start Date</label>
                    <input required name="startDate" value={formData.startDate} onChange={handleInputChange} type="date" className="w-full bg-gray-50/50 p-5 rounded-2xl border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white transition-all outline-none text-gray-900 font-black cursor-pointer" />
                  </div>
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Additional Notes</label>
                    <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full bg-gray-50/50 p-5 rounded-2xl border-2 border-gray-100 focus:border-[#FF1493] focus:bg-white transition-all outline-none resize-none text-gray-900 font-medium placeholder:text-gray-300" placeholder="Tell us about the change..."></textarea>
                  </div>
                  <div className="sm:col-span-2 pt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#FF1493] text-white py-6 md:py-8 rounded-3xl font-black text-xl shadow-2xl shadow-pink-200 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-70">
                      {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <>{t('portal.schedule.title', "Update Cleaning Frequency")} <Send size={20} /></>}
                    </button>
                    <p className="mt-4 text-center text-xs text-gray-400 font-bold italic">* All schedule changes are reviewed by our team.</p>
                  </div>
                </form>
              )}

              {/* Specific Pro Tip Request - Styled as a Footnote */}
              <div className="mt-12 p-8 bg-pink-50/50 rounded-[2.5rem] border border-pink-100">
                <p className="text-sm md:text-base text-[#FF1493] font-bold leading-relaxed">
                  <span className="font-black uppercase tracking-tighter mr-2 italic">{t('portal.tip.label', 'PRO TIP.')}</span>
                  {t('portal.tip.desc', 'recurring clients get priority scheduling, custom notes in our system, and locked-in rates. Join the family!')}
                </p>
              </div>
            </motion.div>

            {/* Payments Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-16 rounded-[3rem] md:rounded-[5rem] shadow-xl shadow-gray-200/50 border border-gray-100"
            >
              <div className="flex items-center gap-5 mb-12">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF1493] border border-pink-100 shadow-sm">
                  <CreditCard size={32} />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{t('portal.payment.title', 'Payments')}</h2>
              </div>
              
              {/* Preferred: Square Invoices Card */}
              <div className="bg-gradient-to-br from-white to-pink-50/40 p-10 md:p-16 rounded-[3.5rem] border-2 border-pink-100 shadow-sm mb-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>
                
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FF1493] text-white p-1 rounded-md">
                        <ShieldCheck size={20} />
                      </div>
                      <span className="text-[#FF1493] font-black uppercase tracking-[0.2em] text-xs">{t('portal.payment.preferred', 'Preferred Method')}</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold text-gray-900 leading-none">{t('portal.payment.invoice', 'Email Invoices')}</h3>
                    <p className="text-gray-600 text-lg md:text-xl font-bold leading-relaxed max-w-md">
                      {t('portal.payment.invoice_desc', 'Invoices sent to your email are our preferred payment method.')}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <a href={SQUARE_PAYMENT_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 bg-[#FF1493] text-white px-12 py-7 rounded-[2.5rem] font-black text-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-pink-100">
                      {t('portal.payment.cta', 'Pay My Invoice')} <ExternalLink size={24} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Other Methods */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap">Other Accepted Methods</h4>
                  <div className="h-px bg-gray-100 flex-grow"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { name: 'Venmo', icon: <Wallet size={20} />, color: 'bg-blue-50 text-blue-500', border: 'border-blue-100' },
                    { name: 'CashApp', icon: <Smartphone size={20} />, color: 'bg-green-50 text-green-500', border: 'border-green-100' },
                    { name: 'Zelle', icon: <CreditCard size={20} />, color: 'bg-pink-50 text-[#FF1493]', border: 'border-pink-100' }
                  ].map((method) => (
                    <div key={method.name} className={`flex items-center gap-4 p-8 bg-white border-2 ${method.border} rounded-[2rem] group hover:shadow-xl hover:-translate-y-1 transition-all`}>
                      <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        {method.icon}
                      </div>
                      <span className="font-bold text-gray-800 text-xl">{method.name}</span>
                    </div>
                  ))}
                </div>

                {/* Specific Payment Alert Box Request - Matching Screenshot 4 Exactly */}
                <div className="bg-pink-50/50 p-10 rounded-[3rem] border border-pink-100 flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#FF1493] shadow-sm border border-pink-100">
                    <Heart size={24} fill="currentColor" />
                  </div>
                  <p className="text-base md:text-lg text-gray-800 font-bold leading-relaxed">
                    {t('portal.payment.details_alert', 'Details for Venmo, CashApp, and Zelle are available upon request. We encourage using the email link for instant confirmation.')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Referral & Review Grid */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Share the Sparkle */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900 p-12 md:p-16 rounded-[4rem] text-center text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Gift size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-[2rem] text-pink-400 mb-2 border border-white/10">
                    <Gift size={40} />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">{t('portal.refer.title', 'Share the Sparkle')}</h2>
                    <p className="text-pink-400 text-xs font-black uppercase tracking-widest">{t('portal.refer.reward', 'Get a reward for every referral!')}</p>
                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                      {t('portal.refer.desc', 'Tell a Philly neighbor about Ana\'s Cleaning Services!') }
                    </p>
                  </div>
                  <button onClick={handleCopyLink} className="w-full flex items-center justify-center gap-4 bg-white text-gray-900 py-6 rounded-3xl font-black text-xl hover:bg-pink-50 transition-all shadow-xl">
                    {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} className="text-gray-400" />}
                    {copied ? 'Link Copied!' : 'Copy Link'}
                  </button>
                </div>
              </motion.div>

              {/* Review Section - Matching Screenshot 1 Layout */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#FF1493] p-12 md:p-16 rounded-[4rem] text-center text-white relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 text-white/10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                  <MessageSquare size={200} strokeWidth={1} />
                </div>
                <div className="relative z-10 space-y-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-[2rem] text-white mb-2 border border-white/10">
                    <Heart size={40} fill="currentColor" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight">{t('portal.review.title', 'Leave a Review')}</h2>
                    <p className="text-white/80 text-lg leading-relaxed font-bold italic">
                      {t('portal.review.desc', 'Loving your service? Your feedback helps us grow!')}
                    </p>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col gap-4">
                      {/* Stylized Platform Buttons */}
                      <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-gray-900 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-blue-900/20 hover:-translate-y-1 transition-transform">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-7 h-7" /> Google <ExternalLink size={20} className="text-gray-300" />
                      </a>
                      <a href={YELP_REVIEW_URL} target="_blank" rel="noopener noreferrer" className="w-full bg-white text-gray-900 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-red-900/20 hover:-translate-y-1 transition-transform">
                        <img src="https://i.ibb.co/YTLvCCsb/Yelp-Logo.png" alt="Yelp" className="w-10 h-auto" /> Yelp <ExternalLink size={20} className="text-gray-300" />
                      </a>
                    </div>
                    {/* Restored 5 Yellow Stars Exactly as in Screenshot 1 */}
                    <div className="flex justify-center gap-2 text-yellow-300">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={28} />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar Support Column - Matching Screenshot 2 & 3 Styling */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] sticky top-32"
            >
              <h3 className="text-3xl font-black text-gray-900 mb-12 tracking-tight">Support</h3>
              <div className="space-y-12">
                
                {/* Contact: Phone Link */}
                <div className="group space-y-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF1493] group-hover:scale-110 transition-transform border border-pink-100 shadow-sm">
                        <Phone size={24} />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('footer.call_text', 'CALL OR TEXT US')}</span>
                   </div>
                   <button onClick={handleCopyPhone} className="text-gray-900 font-black text-2xl hover:text-[#FF1493] transition-colors leading-none tracking-tighter">
                    (267) 854-9564
                   </button>
                   {phoneCopied && <p className="text-[10px] text-green-500 font-bold mt-2">Number copied to clipboard!</p>}
                </div>

                {/* Contact: Specific Email Button styling requested from Screenshot 3 */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-[#FF1493] border border-pink-100 shadow-sm">
                        <Mail size={24} />
                      </div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{t('portal.contact.email_label', 'EMAIL US')}</span>
                   </div>
                   <a 
                      href="mailto:anascleaningservicesphl@gmail.com"
                      className="w-full flex items-center justify-center gap-4 bg-pink-50/50 text-[#FF1493] py-6 rounded-3xl font-black text-xl border-2 border-transparent hover:border-pink-100 hover:bg-pink-100/50 transition-all shadow-sm"
                    >
                      {t('portal.contact.email_btn', 'Email')} <ExternalLink size={24} />
                    </a>
                </div>

                <div className="pt-10 border-t border-gray-50 text-center">
                  <p className="text-xs text-gray-400 font-bold italic leading-relaxed">
                    Philly based support: <br/> 
                    <span className="font-black text-gray-900 uppercase tracking-widest mt-1 inline-block">Mon–Sat • 8am–6pm</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
