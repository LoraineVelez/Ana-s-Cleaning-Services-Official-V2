
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, FileText } from 'lucide-react';

const Terms = () => {
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
              <ShieldAlert size={14} className="text-[#FF1493]" /> Legal Agreement
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Terms & <span className="text-[#FF1493]">Conditions</span>
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
              <p className="font-bold text-[#FF1493]">United States</p>
            </div>

            <p className="italic bg-pink-50/50 p-6 rounded-2xl border-l-4 border-[#FF1493]">
              These Terms and Conditions (“Agreement”) govern the cleaning services provided by Ana’s Cleaning Services (“Company,” “we,” “us,” or “our”). By booking or receiving services, you agree to the terms below.
            </p>

            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  <FileText size={20} className="text-[#FF1493]" /> Services Provided
                </h3>
                <p>Ana’s Cleaning Services provides residential and commercial cleaning services directly. Services are performed according to the scope selected at booking and any written notes provided by the customer. Requests for additional tasks or time may result in additional charges.</p>
                <p className="mt-2">Cleaning results may vary based on the condition of the space, materials, buildup, and prior maintenance. We do not guarantee the removal of all stains, odors, discoloration, scratches, or permanent damage.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Payment Terms
                </h3>
                <p>Payment is due upon completion of service unless otherwise agreed in writing. All payments are non-refundable once service has been completed. Pricing is based on estimated time and scope. Final pricing may change if the condition of the space differs from what was disclosed at booking.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Cancellations & Lockouts
                </h3>
                <p>Cancellations made within 6 hours of the scheduled appointment may be charged a $40 late cancellation fee.</p>
                <p className="mt-2">If our cleaner is unable to access the property at the scheduled time due to lockout or lack of access, the appointment may be charged in full.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Customer Responsibilities
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate information about the space and scope of work</li>
                  <li>Secure pets, valuables, and fragile items prior to service</li>
                  <li>Ensure safe access to the property</li>
                  <li>Notify us of any special instructions or hazards in advance</li>
                </ul>
                <p className="mt-4 text-sm font-medium">We are not responsible for damage caused by unstable items, improper installation, pre-existing conditions, or customer-supplied products or equipment.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Damage & Claims
                </h3>
                <p>If you believe damage occurred during a cleaning, you must notify Ana’s Cleaning Services within 24 hours of service completion and provide photos and a description.</p>
                <p className="mt-2">We are not responsible for: Pre-existing damage, Normal wear and tear, Items that retain functionality with minor cosmetic wear, Items of high or sentimental value not secured prior to service.</p>
                <p className="mt-2">Any resolution, if offered, will be at our discretion and limited to repair, replacement, or a partial refund for the affected portion of the service, as permitted by law.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Text & Email Communications
                </h3>
                <p>By providing your contact information, you consent to receive service-related calls, texts, or emails. Message and data rates may apply. You may opt out of non-essential communications at any time.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Limitation of Liability
                </h3>
                <p>To the maximum extent permitted by law, Ana’s Cleaning Services shall not be liable for indirect, incidental, special, or consequential damages. Our total liability shall not exceed the amount paid for the specific service giving rise to the claim.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Disclaimer of Warranties
                </h3>
                <p>Services are provided on an “as is” basis. We make no warranties, express or implied, including warranties of merchantability or fitness for a particular purpose, to the extent permitted by law.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Governing Law
                </h3>
                <p>This Agreement is governed by the laws of the state in which the service is performed, without regard to conflict of law principles.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                  Termination
                </h3>
                <p>We reserve the right to refuse or discontinue service for unsafe conditions, inappropriate conduct, non-payment, or violation of these Terms.</p>
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

export default Terms;
