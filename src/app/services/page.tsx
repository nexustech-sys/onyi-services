'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wrench, ChevronDown, HardHat, Hammer, CircleDollarSign, Star, Check, Phone, Home, Paintbrush, Warehouse, LandPlot, BrickWall, Construction } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactElement<{ size?: number; className?: string }>;
  index: number;
}

const ServiceCard = ({ title, description, icon, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50,
        x: index % 2 === 0 ? -30 : 30
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        x: 0
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="p-6 md:p-8">
        <div className="flex justify-center mb-4 md:mb-6">
          <motion.div 
            initial={{ scale: 0.8, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="bg-orange-500/10 p-3 md:p-4 rounded-full group-hover:bg-orange-500/20 transition-colors duration-300"
          >
            <div className="text-orange-500 group-hover:text-orange-600 transition-colors duration-300">
              {React.cloneElement(icon, { size: 32, className: icon.props.className })}
            </div>
          </motion.div>
        </div>
        <h3 className="text-lg md:text-xl font-bold text-center mb-2 md:mb-3 text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm md:text-base text-center">{description}</p>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const services = [
    {
      title: "Custom Home Building",
      description: "Tailored home construction designed to your exact specifications and lifestyle needs.",
      icon: <Home size={40} />
    },
    {
      title: "Commercial Construction",
      description: "Expert commercial building solutions for offices, retail spaces, and industrial facilities.",
      icon: <Warehouse size={40} />
    },
    {
      title: "Interior Finishing",
      description: "Premium interior work including flooring, cabinetry, and custom millwork installations.",
      icon: <Paintbrush size={40} />
    },
    {
      title: "Land Development",
      description: "Comprehensive land preparation, grading, and infrastructure development services.",
      icon: <LandPlot size={40} />
    },
    {
      title: "Structural Renovations",
      description: "Expert structural modifications and upgrades for existing buildings and homes.",
      icon: <BrickWall size={40} />
    },
    {
      title: "Project Management",
      description: "Full-service construction management from planning through completion.",
      icon: <Construction size={40} />
    }
  ];

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: "url('/background.jpg')" }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10 px-4 w-full"
        >
          <motion.div 
            initial={{ scale: 0.8, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-4 md:mb-6"
          >
            <div className="bg-orange-500 p-3 md:p-4 rounded-full shadow-xl">
              <Wrench size={36} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-white">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-green-400"
            >
              OUR
            </motion.span>{' '}
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-orange-400"
            >
              SERVICES
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto text-white/90 px-4"
          >
            Comprehensive construction solutions tailored to your unique needs and vision.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={28} className="text-orange-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">EXPERT</span>{' '}
            <span className="text-orange-500">SERVICES</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-orange-500 mx-auto mb-4 md:mb-6"
          />
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            We offer a full range of construction services with uncompromising quality and attention to detail.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-green-600">OUR</span>{' '}
              <span className="text-orange-500">PROCESS</span>
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4 md:mb-6"></div>
            <p className="text-base md:text-lg max-w-3xl mx-auto">
              A streamlined approach to ensure your project&apos;s success from concept to completion.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-orange-500/30 transform -translate-x-1/2"></div>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {[
                {
                  title: "Consultation",
                  description: "We begin with an in-depth discussion to understand your vision, needs, and budget.",
                  icon: <Phone size={20} className="text-orange-500" />
                },
                {
                  title: "Planning",
                  description: "Our team creates detailed plans and 3D renderings to bring your vision to life.",
                  icon: <HardHat size={20} className="text-orange-500" />
                },
                {
                  title: "Approval",
                  description: "We refine the plans based on your feedback until you&apos;re completely satisfied.",
                  icon: <Check size={20} className="text-orange-500" />
                },
                {
                  title: "Construction",
                  description: "Our skilled craftsmen execute the project with precision and quality materials.",
                  icon: <Hammer size={20} className="text-orange-500" />
                },
                {
                  title: "Inspection",
                  description: "Rigorous quality checks ensure every detail meets our high standards.",
                  icon: <Wrench size={20} className="text-orange-500" />
                },
                {
                  title: "Completion",
                  description: "We hand over your finished project with a comprehensive warranty.",
                  icon: <Home size={20} className="text-orange-500" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} ${index < 5 ? 'mb-8 md:mb-12' : ''}`}
                >
                  {index % 2 === 0 ? (
                    <div className="md:text-right">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="hidden md:block absolute -right-4 top-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white"
                      >
                        {step.icon}
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-green-600">{step.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                    </div>
                  ) : (
                    <div className="md:text-left">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className="hidden md:block absolute -left-4 top-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white"
                      >
                        {step.icon}
                      </motion.div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-green-600">{step.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">WHY</span>{' '}
            <span className="text-orange-500">CHOOSE US</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            What sets us apart in the competitive construction industry.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "Quality Craftsmanship",
              description: "We take pride in our attention to detail and commitment to excellence in every project.",
              icon: <Star size={20} className="text-orange-500" />
            },
            {
              title: "Transparent Pricing",
              description: "No hidden costs - we provide clear, upfront estimates with detailed breakdowns.",
              icon: <CircleDollarSign size={20} className="text-orange-500" />
            },
            {
              title: "Timely Completion",
              description: "We respect your time and deliver projects on schedule without compromising quality.",
              icon: <Check size={20} className="text-orange-500" />
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-3 md:mb-4">
                <div className="bg-orange-500/10 p-2 md:p-3 rounded-full">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-center mb-2 md:mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base text-center">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background2.jpg')" }}>
        <div className="bg-black/60 py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6"
            >
              Ready to discuss <span className="text-orange-400">your project</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-xl text-white mb-6 md:mb-8"
            >
              Contact us today for a free consultation and detailed estimate.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg shadow-lg flex items-center gap-2 mx-auto"
              >
                <Phone size={18} />
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}