'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Wrench, ChevronDown, Droplet, User, Star, Check, Phone, ShoppingCart, ArrowRight } from 'lucide-react';
import {  useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
  features: string[];
  specs: {
    name: string;
    value: string;
  }[];
}

const products: Product[] = [
  {
    id: 1,
    title: "Premium Flow Waste Kit",
    category: "Building Materials",
    price: "$599.99",
    description: "Our flagship flow waste kit containing all premium materials for your building projects. Perfect for professionals and serious DIY enthusiasts.",
    image: "/flow waste.webp",
    features: [
      "High-grade steel components",
      "Weather-resistant materials",
      "Precision engineered parts",
      "5-year warranty",
      "Easy assembly"
    ],
    specs: [
      { name: "Weight", value: "45 lbs" },
      { name: "Dimensions", value: "24 x 18 x 12 in" },
      { name: "Materials", value: "Steel, Aluminum, Composite" },
      { name: "Warranty", value: "5 years" }
    ]
  },
  {
    id: 2,
    title: "Professional Magic Waste",
    category: "Tools",
    price: "$599",
    description: "Complete set of professional-grade tools for all construction needs. Ergonomically designed for comfort during extended use.",
    image: "/magic waste.webp",
    features: [
      "24-piece set",
      "Lifetime warranty",
      "Anti-slip grips",
      "Precision crafted",
      "Corrosion resistant"
    ],
    specs: [
      { name: "Weight", value: "28 lbs" },
      { name: "Case Dimensions", value: "20 x 14 x 8 in" },
      { name: "Materials", value: "Chromium-vanadium steel" },
      { name: "Warranty", value: "Lifetime" }
    ]
  },
  {
    id: 3,
    title: "Eco-Friendly Gum Collection",
    category: "Finishing",
    price: "$20",
    description: "Premium zero-VOC gum collection in trending colors. Environmentally friendly without compromising on quality or durability.",
    image: "/gum.webp",
    features: [
      "Zero VOC formula",
      "20+ designer colors",
      "Washable finish",
      "Quick drying",
      "Mold resistant"
    ],
    specs: [
      { name: "Coverage", value: "400 sq ft/gal" },
      { name: "Dry Time", value: "1 hour" },
      { name: "Cleanup", value: "Soap and water" },
      { name: "Warranty", value: "10 years" }
    ]
  },
  {
    id: 4,
    title: "Smart Home P.P.R Taps",
    category: "Electrical",
    price: "$599",
    description: "Complete smart home P.P.R taps solution with all necessary components for modern home automation systems.",
    image: "/p.p.r-tabs.webp",
    features: [
      "Supports all major protocols",
      "Future-proof design",
      "Color-coded components",
      "Detailed instructions",
      "Safety certified"
    ],
    specs: [
      { name: "Weight", value: "32 lbs" },
      { name: "Components", value: "150+" },
      { name: "Certification", value: "UL, CE, RoHS" },
      { name: "Warranty", value: "7 years" }
    ]
  },
  {
    id: 5,
    title: "Premium Shower Poles",
    category: "Flooring",
    price: "$1,799",
    description: "High-end shower poles with authentic wood finish and exceptional durability for both residential and commercial spaces.",
    image: "/showerpole.avif",
    features: [
      "100% authentic wood",
      "Scratch resistant",
      "Easy installation",
      "10 color options",
      "Water resistant"
    ],
    specs: [
      { name: "Coverage", value: "500 sq ft" },
      { name: "Thickness", value: "12 mm" },
      { name: "Material", value: "Solid oak" },
      { name: "Warranty", value: "25 years" }
    ]
  },
  {
    id: 6,
    title: "Modern Quality Water Closet",
    category: "Safety Gear",
    price: "$349",
    description: "Comprehensive safety package meeting all OSHA requirements for construction site safety.",
    image: "/wc.avif",
    features: [
      "OSHA compliant",
      "Adjustable fits",
      "High visibility",
      "Comfortable design",
      "Durable materials"
    ],
    specs: [
      { name: "Items", value: "12 pieces" },
      { name: "Sizes", value: "S-XXL" },
      { name: "Materials", value: "Polyester, PVC, Steel" },
      { name: "Warranty", value: "3 years" }
    ]
  }
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  if (selectedProduct) {
    return (
      <div className="bg-white text-gray-800 min-h-screen">
        {/* Product Detail Header - Mobile Optimized */}
        <section className="relative h-64 md:h-96 flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={selectedProduct.image}
              alt={selectedProduct.title}
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 px-4 py-8 md:py-12 w-full"
          >
            <div className="max-w-6xl mx-auto">
              <motion.button
                onClick={closeProduct}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full font-semibold text-sm md:text-base shadow-md flex items-center gap-2 mb-4 md:mb-6"
              >
                <ArrowRight className="rotate-180" size={14} />
                Back
              </motion.button>
              <h1 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">{selectedProduct.title}</h1>
              <div className="flex flex-wrap gap-2 md:gap-4 text-sm md:text-base text-white/90">
                <span>{selectedProduct.category}</span>
                <span>•</span>
                <span className="text-orange-300 font-semibold">{selectedProduct.price}</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Product Details - Mobile Optimized */}
        <section className="py-8 md:py-16 px-4 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            <div className="md:col-span-2">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-3xl font-bold mb-4 text-orange-500"
              >
                Product Overview
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm md:text-base mb-6 md:mb-8"
              >
                {selectedProduct.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-8 md:mb-12"
              >
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-green-600">Key Features</h3>
                <ul className="space-y-2 md:space-y-3">
                  {selectedProduct.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 + index * 0.1 }}
                      className="flex items-start gap-2 text-sm md:text-base"
                    >
                      <Check className="text-orange-500 mt-0.5 md:mt-1 flex-shrink-0" size={16} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 p-4 md:p-6 rounded-xl shadow-sm sticky top-4 md:top-8 h-fit"
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h3 className="text-lg md:text-2xl font-bold text-orange-500">Price</h3>
                <span className="text-lg md:text-2xl font-bold">{selectedProduct.price}</span>
              </div>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {selectedProduct.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between border-b border-gray-200 pb-1 md:pb-2 text-sm md:text-base">
                    <span className="font-medium text-gray-600">{spec.name}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>

              <Link href="/contact" legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white py-2 md:py-3 rounded-lg font-semibold shadow-md flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <ShoppingCart size={16} />
                  Buy Now
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Related Products - Mobile Optimized */}
        <section className="py-8 md:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center text-green-600"
            >
              You Might Also Like
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.filter(p => p.id !== selectedProduct.id).slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md overflow-hidden hover:shadow-md md:hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-40 md:h-48">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-1 md:mb-2">
                      <h3 className="text-base md:text-lg font-bold">{product.title}</h3>
                      <span className="text-orange-500 font-semibold text-sm md:text-base">{product.price}</span>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm text-gray-500">{product.category}</span>
                      <motion.button
                        onClick={() => openProduct(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-orange-500 hover:text-orange-600 text-xs md:text-sm font-semibold flex items-center gap-1"
                      >
                        View Details <ArrowRight size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Mobile Optimized */}
        <section className="py-12 md:py-20 bg-cover bg-center" style={{ backgroundImage: "url('/background4.webp')" }}>
          <div className="bg-black/60 py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6"
              >
                Questions About <span className="text-orange-400">Our Products</span>?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-sm md:text-xl text-white mb-6 md:mb-8"
              >
                Our product specialists are ready to help you find the perfect solution.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Link href="/contact" legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-lg shadow-md flex items-center gap-2 mx-auto"
                  >
                    <Phone size={16} />
                    Contact Our Team
                  </motion.a>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section - Mobile Optimized */}
      <section className="relative h-[60vh] md:h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/background3.avif"
            alt="Premium Plumbing Products"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10 px-4 w-full"
        >
          <motion.div 
            initial={{ scale: 0.8, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-4 md:mb-6"
          >
            <div className="bg-orange-500 p-3 md:p-4 rounded-full shadow-xl">
              <Wrench size={32} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-green-400"
            >
              PREMIUM
            </motion.span>{' '}
            <motion.span 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-orange-400"
            >
              PLUMBING
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-white/90 px-2"
          >
            High-quality plumbing products and solutions for residential and commercial applications.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold text-sm md:text-lg shadow-md flex items-center gap-2 mx-auto"
          >
            <ShoppingCart size={18} />
            Shop Now
          </motion.button>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-orange-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Products Grid - Mobile Optimized */}
      <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8 md:mb-16 text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="text-green-600">OUR</span>{' '}
            <span className="text-orange-500">PRODUCTS</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-20 md:w-24 h-1 bg-orange-500 mx-auto mb-4 md:mb-6"
          />
          <p className="text-sm md:text-base max-w-2xl mx-auto">
            Browse our selection of premium plumbing products designed for performance and durability.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ 
                opacity: 0, 
                y: 20,
                scale: 0.95
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white rounded-lg md:rounded-xl shadow-sm md:shadow-md overflow-hidden hover:shadow-md md:hover:shadow-lg transition-shadow group relative"
            >
              {/* Buy Now Button (shown on hover) */}
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-3 right-3 z-10"
              >
                <Link href="/contact" legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 md:px-4 py-2 rounded-full font-medium text-xs md:text-sm shadow-sm flex items-center gap-1"
                  >
                    <ShoppingCart size={12} />
                    Buy Now
                  </motion.a>
                </Link>
              </motion.div>

              <div className="relative h-40 md:h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-base md:text-lg font-bold text-white">{product.title}</h3>
                  <p className="text-white/80 text-xs md:text-sm">{product.category}</p>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-center mb-2 md:mb-3">
                  <span className="text-orange-500 font-bold text-sm md:text-base">{product.price}</span>
                  <span className="text-xs md:text-sm text-gray-500">{product.specs[0].value}</span>
                </div>
                <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{product.description}</p>
                <motion.button
                  onClick={() => openProduct(product)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-orange-500 hover:text-orange-600 text-xs md:text-sm font-semibold flex items-center gap-1"
                >
                  View Details <ArrowRight size={12} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-3 gap-4 md:gap-6"
          >
            {[
              {
                title: "Premium Quality",
                description: "All our products meet the highest industry standards for quality and durability.",
                icon: <Star className="text-orange-500" size={20} />
              },
              {
                title: "Expert Support",
                description: "Our team is available to help you choose the right products for your project.",
                icon: <User className="text-orange-500" size={20} />
              },
              {
                title: "Fast Shipping",
                description: "Get your products quickly with our reliable shipping partners.",
                icon: <Droplet className="text-orange-500" size={20} />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-xs md:shadow-sm text-center"
              >
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className="bg-orange-100 p-2 md:p-3 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-xs md:text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 md:py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background2.jpg')" }}>
        <div className="bg-black/60 py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6"
            >
              Need Help <span className="text-orange-400">Choosing Products</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-sm md:text-xl text-white mb-6 md:mb-8"
            >
              Our experts can guide you to the perfect products for your specific needs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Link href="/contact" legacyBehavior>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-lg shadow-md flex items-center gap-2 mx-auto"
                >
                  <Phone size={16} />
                  Contact Our Experts
                </motion.a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}