'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Check, Phone, FileText, BookOpen, Video, Download } from 'lucide-react';
import {  useState } from 'react';


interface Resource {
  id: number;
  title: string;
  type: 'guide' | 'ebook' | 'video' | 'checklist';
  category: string;
  description: string;
  downloadUrl: string;
  image: string;
  pages?: number;
  duration?: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Homeowner's Construction Guide",
    type: 'guide',
    category: 'Residential',
    description: "Everything you need to know about planning, budgeting, and managing your home construction project.",
    downloadUrl: '#',
    image: 'book2.avif',
    pages: 42
  },
  {
    id: 2,
    title: "Sustainable Building Materials",
    type: 'ebook',
    category: 'Sustainability',
    description: "Comprehensive guide to eco-friendly materials for your next construction project.",
    downloadUrl: '#',
    image: 'book1.avif',
    pages: 68
  },
  {
    id: 3,
    title: "Pre-Construction Checklist",
    type: 'checklist',
    category: 'Planning',
    description: "Step-by-step checklist to ensure you're fully prepared before breaking ground.",
    downloadUrl: '#',
    image: 'book3.avif'
  },
  {
    id: 4,
    title: "Modern Kitchen Remodeling",
    type: 'video',
    category: 'Renovation',
    description: "Video series covering the latest trends and techniques in kitchen remodeling.",
    downloadUrl: '#',
    image: 'book5.0.avif',
    duration: '45 min'
  },
  {
    id: 5,
    title: "Commercial Construction Standards",
    type: 'guide',
    category: 'Commercial',
    description: "Industry standards and best practices for commercial construction projects.",
    downloadUrl: '#',
    image: 'book4.avif',
    pages: 56
  },
  {
    id: 6,
    title: "Foundation Waterproofing Techniques",
    type: 'video',
    category: 'Waterproofing',
    description: "Expert techniques for ensuring a dry and durable foundation.",
    downloadUrl: '#',
    image: 'book6.avif',
    duration: '32 min'
  }
];

const ResourceIcon = ({ type }: { type: Resource['type'] }) => {
  const icons = {
    guide: <FileText className="text-orange-500" />,
    ebook: <BookOpen className="text-orange-500" />,
    video: <Video className="text-orange-500" />,
    checklist: <Check className="text-orange-500" />
  };

  return icons[type];
};

export default function ResourcesPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = activeCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-64 sm:h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-90" style={{ backgroundImage: "url('/backgroun5.jpg')" }}>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            <span className="text-green-400">CONSTRUCTION</span>{' '}
            <span className="text-orange-400">RESOURCES</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white/90"
          >
            Expert guides, videos, and tools to help with your construction projects.
          </motion.p>
        </motion.div>
      </section>

      {/* Resources Section */}
      <section className="py-12 sm:py-20 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-green-600">LEARN</span>{' '}
            <span className="text-orange-500">MORE</span>
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-1 bg-orange-500 mx-auto mb-4 sm:mb-6"
          />
          <p className="text-base sm:text-lg max-w-3xl mx-auto">
            Browse our collection of free resources to help you plan and execute your construction projects.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {categories.map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-5 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium ${activeCategory === category ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ 
                opacity: 0, 
                y: 50,
                scale: 0.95
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                scale: 1
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div 
                className="relative h-40 sm:h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url('/${resource.image}')` }}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white p-1 sm:p-2 rounded-lg shadow-sm">
                  <ResourceIcon type={resource.type} />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <span className="text-xs sm:text-sm font-medium text-orange-500">{resource.category}</span>
                  {resource.pages && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{resource.pages} pages</span>
                  )}
                  {resource.duration && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{resource.duration}</span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{resource.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{resource.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm sm:text-base text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2"
                >
                  <Download size={16} /> Download Resource
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-green-600">FREQUENTLY</span>{' '}
              <span className="text-orange-500">ASKED QUESTIONS</span>
            </h2>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-1 bg-orange-500 mx-auto mb-4 sm:mb-6"
            />
          </motion.div>

          <div className="space-y-4 sm:space-y-6">
            {[
              {
                question: "Are these resources really free?",
                answer: "Yes! All of our resources are completely free to download and use. We believe in sharing knowledge to help everyone build better."
              },
              {
                question: "Can I share these resources with others?",
                answer: "Absolutely. We encourage you to share these resources with colleagues, friends, or anyone who might find them helpful."
              },
              {
                question: "How often do you add new resources?",
                answer: "We add new resources monthly. Subscribe to our newsletter to be notified when we release new materials."
              },
              {
                question: "Can I request a specific resource?",
                answer: "Yes! We welcome suggestions for new resources. Contact us with your ideas and we'll consider them for future development."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1
                }}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-bold text-green-600 mb-1 sm:mb-2">{faq.question}</h3>
                <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16 bg-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
          >
            Get Construction Insights Delivered to Your Inbox
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Subscribe to our newsletter for new resources, tips, and industry updates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 sm:py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold shadow-lg text-sm sm:text-base"
            >
              Subscribe
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-cover bg-center bg-fixed" style={{ backgroundImage: "url('/background4.webp')" }}>
        <div className="bg-black/60 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6"
            >
              Need <span className="text-orange-400">Personalized Advice</span>?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-white mb-6 sm:mb-8"
            >
              Our experts are ready to help with your specific construction questions and challenges.
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
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg flex items-center gap-2 mx-auto"
              >
                <Phone size={18} />
                Contact Our Experts
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}