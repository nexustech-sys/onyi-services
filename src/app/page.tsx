'use client';

import { motion, useScroll, useTransform, useAnimation, useInView } from 'framer-motion';
import { Wrench, ChevronDown, HardHat, Hammer, Droplet, CircleDollarSign, Quote, User, Star, Check, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';


interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
}

const Counter = ({ from = 0, to, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState<number>(from);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * (to - from) + from);
        setCount(currentCount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(to);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return (
    <motion.span 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-4xl font-bold text-orange-500 mb-2"
    >
      {count}{typeof to === 'number' ? '+' : ''}
    </motion.span>
  );
};

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
            className="flex justify-center mb-6"
          >
            <div className="bg-orange-500 p-4 rounded-full shadow-xl">
              <Wrench size={48} className="text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-green-400"
            >
              BUILDING
            </motion.span>{' '}
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-orange-400"
            >
              DREAMS
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 px-4"
          >
            Crafting exceptional spaces with precision and passion. Your vision, our expertise.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold text-base md:text-lg shadow-lg flex items-center gap-2 mx-auto"
          >
            <CircleDollarSign size={20} />
            Get Free Estimate
          </motion.button>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown size={32} className="text-orange-400 animate-bounce" />
        </motion.div>
      </section>

      {/* About Us Section */}
      <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">ABOUT</span>{' '}
            <span className="text-orange-500">US</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-orange-500 mx-auto mb-6"
          />
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            We are a team of dedicated professionals committed to delivering exceptional construction services with integrity and innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { img: 'about3.webp', rotate: -5, delay: 0 },
              { img: 'about4.webp', rotate: 5, delay: 0.1 },
              { img: 'fixing.webp', rotate: -3, delay: 0.2 },
              { img: 'plumbing.avif', rotate: 3, delay: 0.3 }
            ].map((item, index) => (
              <motion.div
                key={item.img}
                initial={{ opacity: 0, y: 30, rotate: item.rotate }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: item.delay,
                  ease: "backOut"
                }}
                className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-lg"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/${item.img}')` }}
                ></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 md:mt-0"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-green-600">Our Story</h3>
            <p className="mb-6 text-base md:text-inherit">
              Founded in 2010, we started as a small team with big dreams. Today, we're proud to be one of the most trusted construction companies in the region, having completed over 200 projects.
            </p>
            
            <div className="space-y-4">
              {[
                { title: "Quality Materials", description: "We use only the finest materials sourced from trusted suppliers." },
                { title: "Expert Team", description: "Our skilled professionals have decades of combined experience." },
                { title: "Timely Delivery", description: "We respect your time and complete projects as promised." }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  >
                    <Check className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-base md:text-inherit">{item.title}</h4>
                    <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center"
          >
            {[
              { number: 200, label: "Projects Completed" },
              { number: 50, label: "Happy Clients" },
              { number: 15, label: "Years Experience" },
              { number: "100", label: "Satisfaction Guarantee" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="p-4 md:p-6"
              >
                <div className="flex flex-col items-center">
                  {typeof stat.number === 'number' ? (
                    <Counter to={stat.number} duration={2} />
                  ) : (
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl font-bold text-orange-500 mb-2"
                    >
                      {stat.number}
                    </motion.span>
                  )}
                  <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">OUR</span>{' '}
            <span className="text-orange-500">SERVICES</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            Comprehensive construction services tailored to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "New Construction",
              description: "From ground-up projects to complete builds, we handle all aspects of new construction.",
              icon: <HardHat size={32} className="text-orange-500" />,
              image: "new construction.avif"
            },
            {
              title: "Renovation",
              description: "Transform your existing space with our expert renovation services.",
              icon: <Hammer size={32} className="text-orange-500" />,
              image: "renoviation.avif"
            },
            {
              title: "Plumbing",
              description: "Professional plumbing services for residential and commercial properties.",
              icon: <Droplet size={32} className="text-orange-500" />,
              image: "plumbing.avif"
            }
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -50 : 50,
                y: 30
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-40 md:h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('/${service.image}')` }}
                ></div>
              </div>
              <div className="p-5 md:p-6">
                <div className="flex justify-center mb-3 md:mb-4 -mt-10">
                  <div className="bg-white p-2 md:p-3 rounded-full shadow-lg">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-center mb-2 md:mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm md:text-base text-center">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-4 max-w-6xl mx-auto bg-gray-50 rounded-xl my-8 md:my-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-green-600">CLIENT</span>{' '}
            <span className="text-orange-500">TESTIMONIALS</span>
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-base md:text-lg max-w-3xl mx-auto">
            Hear what our clients say about our exceptional service and quality workmanship.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              quote: "The team delivered our dream home ahead of schedule and under budget. Exceptional craftsmanship!",
              name: "simi Ogunleye",
              role: "Homeowner",
              rating: 5,
              image: "client-1.avif"
            },
            {
              quote: "Professional from start to finish. Their attention to detail is unmatched in the industry.",
              name: "Onyedika Pascal",
              role: "Business Owner",
              rating: 5,
              image: "owner.jpg"
            },
            {
              quote: "We've worked with many contractors, but none compare to their reliability and quality.",
              name: "Smart Araromi",
              role: "Property Developer",
              rating: 5,
              image: "client-3.avif"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ 
                y: 50, 
                opacity: 0,
                rotate: index === 1 ? 0.5 : (index === 2 ? -0.5 : 0) 
              }}
              whileInView={{ 
                y: 0, 
                opacity: 1,
                rotate: 0
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <Quote className="text-orange-500/30 w-10 h-10 md:w-12 md:h-12 mb-4" />
              <p className="text-gray-700 text-sm md:text-base mb-4 md:mb-6">{testimonial.quote}</p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/${testimonial.image}')` }}
                  ></div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
              </div>
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
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to <span className="text-orange-400">Build Your Vision</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white mb-6 md:mb-8"
            >
              Contact us today for a free consultation and let's bring your project to life.
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
                Schedule Consultation
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}