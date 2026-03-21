'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Users, Award, Search, Beaker, BookOpen, Presentation, Coffee } from 'lucide-react';
import Link from 'next/link';
import type { Event } from '@/lib/events';

type ArchiveCategory = 'all' | 'project' | 'paper' | 'workshop' | 'seminar' | 'meeting';

const categoryConfig: Record<ArchiveCategory, { icon: any; label: string; color: string }> = {
  all: { icon: Award, label: 'All Archives', color: 'bg-[#588157]' },
  project: { icon: Beaker, label: 'Research Projects', color: 'bg-[#344E41]' },
  paper: { icon: BookOpen, label: 'Published Papers', color: 'bg-[#3A5A40]' },
  workshop: { icon: Users, label: 'Workshops', color: 'bg-[#A3B18A]' },
  seminar: { icon: Presentation, label: 'Seminars', color: 'bg-[#588157]' },
  meeting: { icon: Coffee, label: 'Meetings', color: 'bg-[#344E41]' },
};

export default function ArchivesClient({ allItems }: { allItems: Event[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ArchiveCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-linear-to-br from-primary to-accent text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Archives</h1>
            <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto">
              Explore our legacy of research, publications, workshops, and events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: allItems.filter(i => i.type === 'project').length, label: 'Research Projects' },
              { value: allItems.filter(i => i.type === 'paper').length, label: 'Published Papers' },
              { value: allItems.filter(i => i.type === 'workshop').length, label: 'Workshops' },
              { value: allItems.filter(i => i.type === 'seminar' || i.type === 'meeting').length, label: 'Events' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="py-12 bg-white sticky top-16 md:top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center">
            {(Object.keys(categoryConfig) as ArchiveCategory[]).map((category) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              return (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-surface text-gray-700 hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {config.label}
                </motion.button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search archives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Archive Items Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-gray-600">No items found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => {
                const config = categoryConfig[item.type as ArchiveCategory];
                const Icon = config.icon;
                const eventYear = new Date(item.eventDate).getFullYear();
                const linkPath = ['seminar', 'meeting', 'social', 'workshop'].includes(item.type) 
                  ? `/events/${item.slug}/` 
                  : `/archives/${item.slug}/`;
                
                return (
                  <Link key={item.slug} href={linkPath}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: (index % 6) * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className="bg-surface rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-primary">
                            {eventYear}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {item.description}
                        </p>

                        {item.authors && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-1">Authors:</p>
                            <p className="text-sm text-gray-700 line-clamp-2">
                              {item.authors.join(', ')}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 ${config.color} text-white rounded-full text-xs font-medium`}>
                            {config.label}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-primary to-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Want to be Part of Our Next Project?</h2>
            <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
              Join us in creating the research that will be featured here next year
            </p>
            <Link href="/research/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-secondary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg"
              >
                View Current Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
