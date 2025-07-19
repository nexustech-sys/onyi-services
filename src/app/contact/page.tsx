'use client';

import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, Wrench } from 'lucide-react';
import { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '4f9c6050-7eba-4b6b-9e26-a0ce5a55a0f2',
          ...formData,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success('Thank you! Your message has been sent successfully.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            background: '#f0fdf4',
            color: '#166534',
            borderLeft: '4px solid #22c55e'
          }
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        toast.error(result.message || 'Failed to send message. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: {
            background: '#fef2f2',
            color: '#b91c1c',
            borderLeft: '4px solid #ef4444'
          }
        });
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          background: '#fef2f2',
          color: '#b91c1c',
          borderLeft: '4px solid #ef4444'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32 flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-500/10 to-green-500/10">
        <div className="absolute inset-0 bg-[url('/plumbing-hero.jpg')] bg-cover bg-center opacity-20"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4 max-w-6xl mx-auto"
        >
          <motion.div 
            initial={{ scale: 0.8, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-4 sm:mb-6"
          >
            <div className="bg-orange-500 p-3 sm:p-4 rounded-full shadow-xl">
              <Wrench size={36} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-green-600">CONTACT</span>{' '}
            <span className="text-orange-500">US</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            Have questions or ready to start your project? Reach out to our team today.
          </p>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="py-12 sm:py-20 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-600">Send Us a Message</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Full Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Email</label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    whileFocus={{ scale: 1.01 }}
                    className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm sm:text-base"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Phone</label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    whileFocus={{ scale: 1.01 }}
                    className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">Your Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-sm sm:text-base"
                ></motion.textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-md flex items-center gap-2 w-full justify-center transition text-sm sm:text-base"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-orange-500">Get In Touch</h2>
              <p className="mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
                Our team is ready to assist you with any questions about our plumbing products or to provide a free estimate for your project.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-orange-500 p-2 sm:p-3 rounded-full text-white flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Our Location</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Head Bridge Market</p>
                    <p className="text-gray-600 text-sm sm:text-base">Onitsha Main Market, Anambra</p>
                    <p className="text-gray-600 text-sm sm:text-base">Nigeria</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-green-500 p-2 sm:p-3 rounded-full text-white flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Email Us</h3>
                    <p className="text-gray-600 text-sm sm:text-base">info@ezennakaonyedika@gmail</p>
                    <p className="text-gray-600 text-sm sm:text-base">sales@plumbingsolutions.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-blue-500 p-2 sm:p-3 rounded-full text-white flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">Call Us</h3>
                    <p className="text-gray-600 text-sm sm:text-base">+234 9161781036</p>
                    <p className="text-gray-600 text-sm sm:text-base">+234 9161870884</p>
                    <p className="text-gray-600 text-sm sm:text-base">Mon-Sat: 8am - 6pm</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Map - Head Bridge Onitsha Main Market */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-200"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d6.779633315769037!3d6.1236288956218775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104393c5c5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sHead%20Bridge%20Market%2C%20Onitsha!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Head Bridge Onitsha Main Market Location"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background.jpg')" }}>
        <div className="bg-black/60 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6"
            >
              Need <span className="text-orange-400">Immediate Assistance</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white mb-6 sm:mb-8"
            >
              Call us now to speak with one of our plumbing specialists.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.a
                href="tel:+2349161870884"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg flex items-center gap-2 mx-auto w-fit"
              >
                <Phone size={18} />
                +234 9161870884
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}