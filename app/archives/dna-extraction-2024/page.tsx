'use client';

import { motion } from 'framer-motion';
import { Calendar, Users, FileText, ArrowLeft, Beaker, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DNAExtractionPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-linear-to-br from-primary to-accent text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/archives/" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Archives
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-secondary text-primary rounded-full text-sm font-semibold">
                2024-2025
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                Lab Project
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Fruit DNA Extraction and Analysis</h1>
            <p className="text-xl md:text-2xl text-secondary max-w-3xl">
              Fruit DNA extraction and analysis using various techniques
            </p>

            {/* View Article Button */}
            <div className="mt-8">
              <a
                href="/articles/Final Report_DNA Analysis Project.pdf"
                className="inline-flex items-center gap-3 bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg"
              >
                <FileText className="w-5 h-5" />
                View Published Article
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Overview */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                <Beaker className="w-8 h-8" />
                Project Overview
              </h2>
              <div className="bg-surface rounded-2xl p-8">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  This project aimed to determine the DNA yield of different fruit samples and investigate 
                  the influence of growing conditions on DNA concentration. Using ethanol precipitation 
                  and the Diphenylamine Method for quantitative DNA estimation, students gained hands-on 
                  experience in molecular biology techniques.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Calendar className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-primary mb-2">Timeline</h4>
                    <p className="text-gray-600 text-sm">
                      October 2024 - February 2025
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <Users className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-primary mb-2">Team</h4>
                    <p className="text-gray-600 text-sm">
                      MRT Research Team 2024-2025
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <FileText className="w-8 h-8 text-primary mb-3" />
                    <h4 className="font-semibold text-primary mb-2">Status</h4>
                    <p className="text-gray-600 text-sm">
                      Completed & Published
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Lab Events Timeline */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Lab Events Timeline</h2>
              <div className="space-y-4">
                {[
                  {
                    date: 'Thursday, October 10th',
                    title: 'Info Session',
                    description: 'Introduction to the project and methodology. Room A-369 during AP.',
                  },
                  {
                    date: 'Tuesday, October 15th',
                    title: 'Scientific Essay Writing Workshop',
                    description: 'With Professor Pierre-Alexandre Mailhot. Room D-120A. Introduction to writing scientific papers using Typst.',
                  },
                  {
                    date: 'November 14th, 2024',
                    title: 'Science Fair Prep Session',
                    description: 'Executives discussed research projects to help kickstart science fair projects.',
                  },
                  {
                    date: 'January 2025',
                    title: 'Research Challenge',
                    description: 'Students helped develop the lab protocol and prepared the standard curve of calf thymus DNA.',
                  },
                  {
                    date: 'February 18, 2025',
                    title: 'DNA Standard Curve and Preparing Chemicals',
                    description: 'Preparation of chemicals and establishing standard curves for DNA quantification.',
                  },
                  {
                    date: 'February 20, 2025',
                    title: 'DNA Extraction Lab Project',
                    description: 'Main experimental phase where students extracted and analyzed DNA from various fruit samples.',
                  },
                ].map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-surface rounded-xl p-6 hover:shadow-lg transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="shrink-0">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="text-sm text-gray-500">{event.date}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Project Components */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Project Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface rounded-xl p-8">
                  <Beaker className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-3">Experiment and Manipulations</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Students conducted the main experiments and manipulations to obtain results and data for analysis. 
                    Due to limited lab space and materials, participation was prioritized for active members.
                  </p>
                </div>
                <div className="bg-surface rounded-xl p-8">
                  <BookOpen className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-3">Writing the Article</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Participants analyzed experimental results and crafted various sections of the scientific article. 
                    All contributors had their names included in the final published article.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Main Methods */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Main Methods</h2>
              <div className="bg-linear-to-br from-primary/5 to-secondary/30 rounded-2xl p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">DNA Extraction Using Ethanol Precipitation</h4>
                      <p className="text-gray-600">Standard method for isolating DNA from fruit samples using ethanol-based precipitation techniques.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">Quantitative DNA Concentration Estimation</h4>
                      <p className="text-gray-600">Used the Diphenylamine Method to accurately measure DNA concentration in extracted samples.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </section>

          {/* Resources */}
          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-primary text-white rounded-2xl p-8"
            >
              <h2 className="text-3xl font-bold mb-6">Project Resources</h2>
              <div className="space-y-4">
                <a 
                  href="https://docs.google.com/document/d/1bJ9QyFKOUJ1LHnC7qCd515OtPryIZiGSNFgDFyB8w9I/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Research Challenge</h3>
                      <p className="text-secondary text-sm">Help us make the lab protocol and get a chance to help make the standard curve of calf thymus DNA</p>
                    </div>
                    <FileText className="w-6 h-6" />
                  </div>
                </a>
                <a 
                  href="https://docs.google.com/presentation/d/1y7OVCaaV8hAlWeaWw1zam4lXRqXUMmfH0Dp3h0WwKOI/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">DNA Lab Info Session Slides</h3>
                      <p className="text-secondary text-sm">October 2024 - Lab protocol briefing and project overview</p>
                    </div>
                    <FileText className="w-6 h-6" />
                  </div>
                </a>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1SsYNW1PCvA1ErrDCxatfG3jt8HyklQxtT9Dl82yc_eo/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Lab Project Participation Sheet</h3>
                      <p className="text-secondary text-sm">Choose what you want to work on for the DNA extraction lab project</p>
                    </div>
                    <FileText className="w-6 h-6" />
                  </div>
                </a>
                <a 
                  href="/articles/Final Report_DNA Analysis Project.pdf"
                  className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Final Report - DNA Analysis Project</h3>
                      <p className="text-secondary text-sm">Published research article (PDF)</p>
                    </div>
                    <FileText className="w-6 h-6" />
                  </div>
                </a>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
    </div>
  );
}
