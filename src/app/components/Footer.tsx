'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Twitter,
  Home, Wrench, Paintbrush, HardHat, ArrowRight, Heart
} from 'lucide-react';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
  };

  // Predefined positions for the floating elements to avoid hydration mismatch
  const floatingElements = [
    { width: 89, height: 141, left: '20%', top: '7%' },
    { width: 146, height: 122, left: '52%', top: '96%' },
    { width: 113, height: 128, left: '90%', top: '13%' },
    { width: 74, height: 137, left: '44%', top: '52%' },
    { width: 136, height: 115, left: '71%', top: '54%' },
    { width: 78, height: 53, left: '11%', top: '49%' },
    { width: 51, height: 65, left: '38%', top: '92%' },
    { width: 105, height: 68, left: '63%', top: '56%' },
    { width: 138, height: 80, left: '52%', top: '11%' },
    { width: 76, height: 63, left: '88%', top: '14%' },
    { width: 109, height: 96, left: '6%', top: '7%' },
    { width: 115, height: 141, left: '67%', top: '37%' }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black pt-20 pb-12 px-4">
      {/* Floating background elements */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {floatingElements.map((element, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500 mix-blend-overlay"
              style={{
                width: element.width,
                height: element.height,
                left: element.left,
                top: element.top,
              }}
              initial={{ opacity: 0 }}
              animate={{
                y: [0, (Math.random() * 100) - 50],
                x: [0, (Math.random() * 60) - 30],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                repeatType: 'reverse' as const,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-10 mb-16"
        >
          {/* Brand Section */}
          <motion.div variants={item} className="space-y-4">
            <motion.div whileHover={hoverEffect}>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                ONYII'S SERVICES
              </h2>
            </motion.div>
            <p className="text-gray-400">
              Premium construction solutions with unmatched quality and service.
            </p>
            <div className="flex space-x-4 pt-2">
              {[Instagram, Facebook, Linkedin, Twitter].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', icon: Home, href: '/' },
                { name: 'Services', icon: Wrench, href: '/services' },
                { name: 'Projects', icon: HardHat, href: '/projects' },
                { name: 'Resources', icon: Paintbrush, href: '/resources' },
              ].map((link) => (
                <motion.li key={link.name} variants={item}>
                  <Link href={link.href} className="group flex items-center text-gray-400 hover:text-white transition-colors">
                    <link.icon className="w-4 h-4 mr-2 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 translate-x-[-5px] group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <HardHat className="w-5 h-5 mr-2 text-purple-400" />
              Our Products
            </h3>
            <ul className="space-y-3">
              {[
                'Construction Materials',
                'Plumbing Solutions',
                'Customs Pipes',
                'Safety Equipment',
                'Power Tools',
                'HVAC Systems'
              ].map((product) => (
                <motion.li 
                  key={product}
                  variants={item}
                  whileHover={{ x: 5 }}
                >
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2"></span>
                    {product}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold mb-6 text-white flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-400" />
              Contact Us
            </h3>
            <ul className="space-y-4">
              <motion.li variants={item} className="flex items-start">
                <div className="p-2 rounded-full bg-blue-500/10 mr-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">(+234) 916-187-0884</p>
                </div>
              </motion.li>
              <motion.li variants={item} className="flex items-start">
                <div className="p-2 rounded-full bg-blue-500/10 mr-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">ezennakaonyedika@gmail.com</p>
                </div>
              </motion.li>
              <motion.li variants={item} className="flex items-start">
                <div className="p-2 rounded-full bg-blue-500/10 mr-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Address</p>
                  <p className="text-white"> Head Bridge, Onitsha , Anambra state ,Nigeria</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div 
          className="mb-16 p-8 rounded-xl backdrop-blur-sm bg-gray-800/30 border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3 
              className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
              whileHover={{ scale: 1.02 }}
            >
              Stay Updated
            </motion.h3>
            <p className="text-gray-400 mb-6">Get the latest products and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <motion.input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-lg bg-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe <Heart className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} ONYII'S SERVICES. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;