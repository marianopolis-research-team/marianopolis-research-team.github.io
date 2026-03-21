'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, Beaker, MapPin, Clock, Presentation, Coffee } from 'lucide-react';
import Link from 'next/link';
import SectionToc from '../_components/SectionToc';
import type { Event } from '@/lib/events';

const researchSections = [
  { id: 'events-hero', label: 'Overview' },
  { id: 'events-upcoming', label: 'Upcoming Events' },
  { id: 'events-past', label: 'Past Events' },
];

const typeConfig: Record<string, { label: string; color: string; icon: any }> = {
  seminar: { label: 'Seminar', color: 'bg-[#588157]', icon: Presentation },
  workshop: { label: 'Workshop', color: 'bg-[#A3B18A]', icon: Beaker },
  social: { label: 'Social Event', color: 'bg-[#A3B18A]', icon: Users },
  meeting: { label: 'Club Meeting', color: 'bg-[#344E41]', icon: Coffee },
  project: { label: 'Lab Project', color: 'bg-[#344E41]', icon: Beaker },
  paper: { label: 'Published Paper', color: 'bg-[#3A5A40]', icon: Beaker },
};

export default function ResearchClient({ 
  upcomingEvents, 
  pastEvents 
}: { 
  upcomingEvents: Event[]; 
  pastEvents: Event[]; 
}) {

  return (
    <div className="min-h-screen bg-white">
      <SectionToc sections={researchSections} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24 py-16 lg:py-20">
        <div className="space-y-16">

          {/* Hero Section */}
          <section
            id="events-hero"
            className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary to-accent text-white py-16 md:py-20"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-4xl mx-auto text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Events & Activities</h1>
                <p className="text-xl md:text-2xl text-secondary">
                  Participate in enriching scientific activities including workshops, seminars, and roundtable discussions
                </p>
              </motion.div>
            </div>
          </section>

          {/* Upcoming Events Section */}
          <section id="events-upcoming">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-primary">Upcoming Events</h2>
              </div>

              {upcomingEvents.length === 0 ? (
                <div className="bg-surface rounded-xl p-12 text-center">
                  <p className="text-gray-600 text-lg">
                    No upcoming events scheduled at the moment. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingEvents.map((event, index) => {
                    const config = typeConfig[event.type];
                    const Icon = config.icon;
                    const eventDate = new Date(event.eventDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    });

                    return (
                      <Link key={event.slug} href={`/events/${event.slug}/`}>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="bg-surface p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 ${config.color} rounded-lg flex items-center justify-center shrink-0`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <span className={`px-3 py-1 ${config.color} text-white rounded-full text-sm font-medium`}>
                              {config.label}
                            </span>
                          </div>
                          <h3 className="font-bold text-xl text-primary mb-2">{event.title}</h3>
                          <p className="text-gray-700 mb-4">{event.description}</p>
                          <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{eventDate}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{event.time}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </section>

          {/* Past Events Section */}
          <section id="events-past">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-primary">Past Events</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pastEvents.slice(0, 3).map((event, index) => {
                  const config = typeConfig[event.type];
                  const Icon = config.icon;
                  const eventDate = new Date(event.eventDate).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  });

                  return (
                    <Link key={event.slug} href={`/events/${event.slug}/`}>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: (index % 9) * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="bg-surface rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                      >
                        {event.images && event.images.length > 0 && (
                          <div className="aspect-4/3 bg-gray-200 overflow-hidden">
                            <img
                              src={event.images[0]}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 ${config.color} text-white rounded-full text-xs font-medium`}>
                              {config.label}
                            </span>
                          </div>
                          <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{eventDate}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
}
