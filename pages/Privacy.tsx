
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, RefreshCw } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="pb-32 bg-white">
      {/* Header */}
      <section className="bg-gray-50 pt-24 pb-16 rounded-b-[4rem]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-white text-gray-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-sm">
              <ShieldCheck size={14} className="text-[#FF1493]" /> Privacy Protected
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-[#FF1493]">Policy</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Last Updated: January 15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 mt-16">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-50/50">
          <div className="prose prose-pink max-w-none text-gray-600 space-y-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ana’s Cleaning Services</h2>
            </div>

            <p className="italic bg-pink-50/50 p-6 rounded-2xl border-l-4 border-[#FF1493]">
              Ana’s Cleaning Services (“we,” “us,” or “our”) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains what information we collect, how we use it, and your choices regarding that information. By using our services or contacting us, you agree to this Privacy Policy.
            </p>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <Eye size={20} className="text-[#FF1493]" /> Information We Collect
                </h3>
                <p>We collect information you voluntarily provide, including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Service address</li>
                  <li>Service details and instructions</li>
                  <li>Payment confirmation (we do not store full payment card numbers)</li>
                </ul>
                <p className="mt-2">We may also collect limited information automatically when you visit our website, such as browser type or IP address, for basic website functionality and security.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  How We Use Your Information
                </h3>
                <p>We use your information to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Schedule and provide cleaning services</li>
                  <li>Communicate with you about appointments, updates, or issues</li>
                  <li>Process payments</li>
                  <li>Respond to inquiries and customer support requests</li>
                  <li>Improve our services and operations</li>
                </ul>
                <p className="mt-2 font-medium text-[#FF1493]">We do not sell your personal information.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Text and Email Communications
                </h3>
                <p>If you provide your phone number or email address, you consent to receive service-related messages from us. Message and data rates may apply. You may opt out of non-essential communications at any time.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Sharing of Information
                </h3>
                <p>We do not sell or rent your personal information.</p>
                <p className="mt-2">We may share information only:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With trusted service providers who assist with payment processing or business operations</li>
                  <li>If required by law or legal process</li>
                  <li>To protect the rights, safety, or property of Ana’s Cleaning Services or others</li>
                </ul>
                <p className="mt-2">All third parties are required to safeguard your information.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Cookies
                </h3>
                <p>Our website may use basic cookies to function properly and improve user experience. You can adjust cookie settings through your browser preferences.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <Lock size={20} className="text-[#FF1493]" /> Data Security
                </h3>
                <p>We take reasonable steps to protect your personal information using administrative, technical, and physical safeguards. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Data Retention
                </h3>
                <p>We retain personal information only as long as necessary to provide services, comply with legal obligations, or resolve disputes. When information is no longer needed, it is deleted or anonymized.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Children’s Privacy
                </h3>
                <p>Our services are not directed to children under 16. We do not knowingly collect personal information from children.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Your Rights
                </h3>
                <p>You may request access to, correction of, or deletion of your personal information by contacting us. We will respond in accordance with applicable law.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <RefreshCw size={20} className="text-[#FF1493]" /> Changes to This Policy
                </h3>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Contact Us
                </h3>
                <p>If you have questions about this Privacy Policy or how we handle your information, please contact us at <a href="mailto:anascleaningservicesphl@gmail.com" className="text-[#FF1493] font-bold">anascleaningservicesphl@gmail.com</a>.</p>
              </section>
            </div>

            <div className="pt-12 border-t border-gray-100 mt-12 text-center text-sm font-bold text-gray-400 uppercase tracking-widest">
              © Ana’s Cleaning Services
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
