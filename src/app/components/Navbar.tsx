'use client';

import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
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
import { usePathname } from "next/navigation";

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
  mobile = false,
  closeMenu
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  mobile?: boolean;
  closeMenu: () => void;
}) => {
  const handleClick = (e: React.MouseEvent) => {
    closeMenu();
    onClick?.();
  };

  return (
    <motion.div
      whileHover={{ scale: mobile ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      <Link
        href={href}
        onClick={handleClick}
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
  closeMenu
}: {
  item: typeof NAV_ITEMS[0];
  mobile?: boolean;
  closeMenu: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === item.href || item.subItems.some(subItem => pathname === subItem.href)) {
      setIsOpen(false);
    }
  }, [pathname, item.href, item.subItems]);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className={`relative ${mobile ? "w-full" : ""}`}>
      <div className="flex items-center">
        <NavLink 
          href={item.href} 
          className={!mobile ? "pr-0" : ""}
          closeMenu={closeMenu}
          onClick={() => setIsOpen(false)}
        >
          <>{item.icon} {item.title}</>
        </NavLink>
        
        {item.subItems.length > 0 && (
          <button
            onClick={toggleDropdown}
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
                transition={{ duration: 0.15, delay: index * 0.03 }}
              >
                <NavLink 
                  href={subItem.href} 
                  mobile={mobile}
                  closeMenu={closeMenu}
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
  const [shakeHome, setShakeHome] = useState(false);
  const pathname = usePathname();
  const homeLinkRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const toggleMenu = () => {
    if (mobileOpen) {
      setShakeHome(true);
      setTimeout(() => setShakeHome(false), 1000);
    }
    setMobileOpen(prev => !prev);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-full ${
          scrolled ? "bg-black/80 backdrop-blur-md shadow-xl" : "bg-black/60 backdrop-blur-sm"
        } border border-gray-700/50 transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink href="/" className="text-xl font-bold" closeMenu={closeMenu}>
                <motion.div
                  ref={homeLinkRef}
                  animate={shakeHome ? {
                    rotate: [0, -10, 10, -10, 10, 0],
                    transition: { duration: 0.6 }
                  } : {}}
                  className="flex items-center"
                >
                  <div className="bg-orange-500 p-2 rounded-lg shadow-lg">
                    <Wrench size={24} className="text-white" />
                  </div>
                  <span className="text-white ml-2 font-bold">
                    <span className="text-orange-400">ONYII'S </span>  SERVICES
                  </span>
                </motion.div>
              </NavLink>
            </motion.div>

            <ul className="hidden lg:flex items-center gap-1 font-bold">
              <li>
                <NavLink href="/" closeMenu={closeMenu}>
                  <Home size={18} className="text-orange-400 " />
                  Home
                </NavLink>
              </li>
              
              {NAV_ITEMS.map((item) => (
                <li key={item.title}>
                  <Dropdown item={item} closeMenu={closeMenu} />
                </li>
              ))}
              
              <li>
                <NavLink href="/contact" closeMenu={closeMenu}>
                  <Phone size={18} className="text-orange-400" />
                  Contact
                </NavLink>
              </li>
              
              <motion.li whileHover={{ scale: 1.05 }}>
                <Link 
                  href="/quote" 
                  onClick={closeMenu}
                  className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
                >
                  <CircleDollarSign size={18} />
                  Get Quote
                </Link>
              </motion.li>
            </ul>

            <motion.div 
              className="lg:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <button 
                onClick={toggleMenu}
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

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />
            
            <motion.div
              initial={{ y: "-100vh", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100vh", opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 200
              }}
              className="fixed inset-0 z-50 pt-24 px-4 pb-8 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
                <div className="p-4 space-y-2">
                  <NavLink 
                    href="/" 
                    onClick={closeMenu}
                    mobile
                    closeMenu={closeMenu}
                  >
                    <Home size={18} className="text-orange-400" />
                    Home
                  </NavLink>
                  
                  {NAV_ITEMS.map((item) => (
                    <Dropdown 
                      key={item.title} 
                      item={item}
                      mobile 
                      closeMenu={closeMenu}
                    />
                  ))}
                  
                  <NavLink 
                    href="/contact" 
                    onClick={closeMenu}
                    mobile
                    closeMenu={closeMenu}
                  >
                    <Phone size={18} className="text-orange-400" />
                    Contact
                  </NavLink>
                  
                  <motion.div 
                    className="mt-4"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href="/quote" 
                      onClick={closeMenu}
                      className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CircleDollarSign size={18} />
                      Free Quote
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}