'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Wrench,
  Phone,
  Home,
  Hammer,
  Droplet,
  ClipboardCheck,
  BookOpen,
  Settings,
  CircleDollarSign
} from "lucide-react";

const NAV_ITEMS = [
  {
    title: "Services",
    href: "/services",
    icon: <Wrench size={18} className="text-orange-400" />,
    subItems: [
      { label: "Leak Detection", href: "/services#leak", icon: <Droplet size={14} /> },
      { label: "Pipe Installation", href: "/services#pipe-installation", icon: <Settings size={14} /> },
      { label: "Drain Cleaning", href: "/services#drain-cleaning", icon: <Droplet size={14} /> },
      { label: "Sewer Line Repair", href: "/services#sewer", icon: <Wrench size={14} /> },
      { label: "Water Heater", href: "/services#water-heater", icon: <Hammer size={14} /> },
      { label: "Emergency Services", href: "/services#emergency", icon: <Phone size={14} /> },
      { label: "Maintenance Plans", href: "/services#maintenance", icon: <ClipboardCheck size={14} /> },
      { label: "Consultation", href: "/services#consultation", icon: <BookOpen size={14} /> },
    ]
  },
  {
    title: "Products",
    href: "/product",
    icon: <Settings size={18} className="text-orange-400" />,
    subItems: [
      { label: "Wrenches", href: "/product#wrenches", icon: <Wrench size={14} /> },
      { label: "Pipes & Tubes", href: "/product#pipes", icon: <Settings size={14} /> },
      { label: "Faucets", href: "/product#faucets", icon: <Droplet size={14} /> },
      { label: "Valves", href: "/product#valves", icon: <CircleDollarSign size={14} /> },
      { label: "Washers", href: "/product#washers", icon: <Hammer size={14} /> },
      { label: "Hoses", href: "/product#hoses", icon: <Droplet size={14} /> },
      { label: "Sealants", href: "/product#sealants", icon: <ClipboardCheck size={14} /> },
      { label: "Tools", href: "/product#tools", icon: <Wrench size={14} /> },
      { label: "Accessories", href: "/product#accessories", icon: <Settings size={14} /> },
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    icon: <BookOpen size={18} className="text-orange-400" />,
    subItems: [
      { label: "DIY Hacks", href: "/resources#diy", icon: <Hammer size={14} /> },
      { label: "Maintenance Tips", href: "/resources#maintenance", icon: <ClipboardCheck size={14} /> },
      { label: "Water Saving", href: "/resources#saving-water", icon: <Droplet size={14} /> },
      { label: "Safety Guidelines", href: "/resources#safety", icon: <Settings size={14} /> },
      { label: "Plumbing Codes", href: "/resources#codes", icon: <BookOpen size={14} /> },
      { label: "Installation Guides", href: "/resources#installation", icon: <Wrench size={14} /> },
      { label: "Troubleshooting", href: "/resources#troubleshooting", icon: <Hammer size={14} /> },
      { label: "FAQs", href: "/resources#faqs", icon: <ClipboardCheck size={14} /> },
    ]
  }
];

const NavLink = ({ 
  href, 
  children,
  onClick,
  className = "",
  mobile = false
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  mobile?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ scale: mobile ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-2 font-medium transition-all ${
          mobile 
            ? "text-gray-200 hover:text-orange-400 py-3 px-4 rounded-lg"
            : "text-gray-200 hover:text-white hover:bg-black/30 px-4 py-2 rounded-lg " + className
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
};

const Dropdown = ({
  item,
  mobile = false,
}: {
  item: typeof NAV_ITEMS[0];
  mobile?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`}>
      <div className="flex items-center">
        <NavLink 
          href={item.href} 
          className={!mobile ? "pr-0" : ""}
        >
          <>{item.icon} {item.title}</>
        </NavLink>
        
        {item.subItems.length > 0 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={!mobile ? () => setIsOpen(true) : undefined}
            className={`ml-1 p-1 rounded-full ${
              mobile ? "text-gray-400" : "text-gray-300 hover:text-orange-400"
            }`}
            aria-label={`Toggle ${item.title} menu`}
          >
            <ChevronDown 
              size={16} 
              className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-orange-400" : ""}`}
            />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && item.subItems.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onMouseLeave={!mobile ? () => setIsOpen(false) : undefined}
            className={`${
              mobile
                ? "mt-1 space-y-1 pl-8"
                : "absolute bg-gray-900/95 backdrop-blur-md text-gray-200 mt-1 rounded-lg p-2 shadow-2xl w-56 z-10 border border-gray-700/50"
            }`}
          >
            {item.subItems.map((subItem, index) => (
              <motion.li 
                key={subItem.href}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.15, delay: mobile ? index * 0.03 : 0 }}
              >
                <NavLink 
                  href={subItem.href} 
                  mobile={mobile}
                >
                  <span className="text-orange-400">{subItem.icon}</span>
                  {subItem.label}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-xl" : "bg-black/60 backdrop-blur-sm"
        } border border-gray-700/50 transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink href="/" className="text-xl font-bold">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg shadow-lg">
                  <Wrench size={24} className="text-white" />
                </div>
                <span className="text-white ml-2 font-bold">
                  <span className="text-orange-400">ONYII'S </span> SERVICES
                </span>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1 font-bold">
              <li>
                <NavLink href="/">
                  <Home size={18} className="text-orange-400" />
                  Home
                </NavLink>
              </li>
              
              {NAV_ITEMS.map((item) => (
                <li key={item.title}>
                  <Dropdown item={item} />
                </li>
              ))}
              
              <li>
                <NavLink href="/contact">
                  <Phone size={18} className="text-orange-400" />
                  Contact
                </NavLink>
              </li>
              
              <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/quote" 
                  className="ml-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-orange-500/20"
                >
                  <CircleDollarSign size={18} />
                  Get Quote
                </Link>
              </motion.li>
            </ul>

            {/* Mobile Menu Button */}
            <motion.div 
              className="lg:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <button 
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg bg-black/30 text-gray-200 hover:text-orange-400 focus:outline-none transition-all"
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X size={24} className="text-orange-400" />
                ) : (
                  <Menu size={24} />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 pt-20 bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-lg overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col space-y-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink 
                    href="/" 
                    onClick={() => setMobileOpen(false)}
                    mobile
                  >
                    <Home size={20} className="text-orange-400" />
                    <span className="text-lg">Home</span>
                  </NavLink>
                </motion.div>
                
                {NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + (index * 0.05) }}
                  >
                    <Dropdown 
                      key={item.title} 
                      item={item}
                      mobile 
                    />
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                >
                  <NavLink 
                    href="/contact" 
                    onClick={() => setMobileOpen(false)}
                    mobile
                  >
                    <Phone size={20} className="text-orange-400" />
                    <span className="text-lg">Contact</span>
                  </NavLink>
                </motion.div>
                
                <motion.div 
                  className="mt-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/quote" 
                    onClick={() => setMobileOpen(false)}
                    className="block text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/30 text-lg"
                  >
                    <CircleDollarSign size={20} />
                    Get Free Quote
                  </Link>
                </motion.div>
              </div>

              {/* Close button at bottom */}
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-3 rounded-full bg-gray-800 text-gray-400 hover:text-orange-400 transition-all"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}