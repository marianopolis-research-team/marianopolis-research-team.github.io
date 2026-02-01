import { Calendar, Users, FileText, ArrowLeft, Beaker, BookOpen, MapPin, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getEventBySlug, EventType, getPastEvents, Event } from '@/app/_data/eventsData';
import { notFound } from 'next/navigation';

const categoryConfig: Record<string, { label: string; color: string }> = {
  project: { label: 'Lab Project', color: 'bg-[#344E41]' },
  paper: { label: 'Published Paper', color: 'bg-[#3A5A40]' },
  workshop: { label: 'Workshop', color: 'bg-[#A3B18A]' },
  seminar: { label: 'Seminar', color: 'bg-[#588157]' },
  meeting: { label: 'Meeting', color: 'bg-[#344E41]' },
  social: { label: 'Social Event', color: 'bg-[#A3B18A]' },
};

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-gray-500' },
  'in-progress': { label: 'In Progress', color: 'bg-green-500' },
  upcoming: { label: 'Upcoming', color: 'bg-blue-500' },
};

export function generateStaticParams() {
  return getPastEvents().map((item) => ({
    slug: item.slug,
  }));
}

export default async function ArchiveDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getEventBySlug(slug);

  if (!item) {
    notFound();
  }

  return <ArchiveDetailContent item={item} />;
}

function ArchiveDetailContent({ item }: { item: Event }) {

  const config = categoryConfig[item.type];
  const statusBadge = item.status ? statusConfig[item.status] : null;
  const eventYear = new Date(item.eventDate).getFullYear();

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
          
          <div
          >
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-2 bg-secondary text-primary rounded-full text-sm font-semibold">
                {eventYear}
              </span>
              <span className={`px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold`}>
                {config.label}
              </span>
              {statusBadge && (
                <span className={`px-4 py-2 ${statusBadge.color} text-white rounded-full text-sm font-semibold`}>
                  {statusBadge.label}
                </span>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{item.title}</h1>
            <p className="text-xl md:text-2xl text-secondary max-w-3xl">
              {item.description}
            </p>

            {/* Location, Time, Date for events */}
            {(item.location || item.time) && (
              <div className="flex flex-wrap gap-4 mt-6">
                {item.location && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <MapPin className="w-5 h-5" />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.time && (
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <Clock className="w-5 h-5" />
                    <span>{item.time}</span>
                  </div>
                )}
              </div>
            )}

            {/* View Article Button for published papers/projects */}
            {item.resources && item.resources.some(r => (r.type === 'pdf' || r.type === 'drive') && (r.title.toLowerCase().includes('literature review') || r.title.toLowerCase().includes('covid') || r.title.toLowerCase().includes('report') || r.title.toLowerCase().includes('final report'))) && (
              <div className="mt-8">
                {item.resources.filter(r => (r.type === 'pdf' || r.type === 'drive') && (r.title.toLowerCase().includes('literature review') || r.title.toLowerCase().includes('covid') || r.title.toLowerCase().includes('report') || r.title.toLowerCase().includes('final report'))).slice(0, 1).map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    className="inline-flex items-center gap-3 bg-secondary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white transition-all duration-300 shadow-lg"
                  >
                    <FileText className="w-5 h-5" />
                    View Published Article
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          
          {/* Long Description / Overview */}
          {item.longDescription && (
            <section>
              <div
              >
                <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
                  <Beaker className="w-8 h-8" />
                  Overview
                </h2>
                <div className="bg-surface rounded-2xl p-8">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {item.longDescription}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <Calendar className="w-8 h-8 text-primary mb-3" />
                      <h4 className="font-semibold text-primary mb-2">Date</h4>
                      <p className="text-gray-600 text-sm">{new Date(item.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    {item.authors && (
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <Users className="w-8 h-8 text-primary mb-3" />
                        <h4 className="font-semibold text-primary mb-2">Team</h4>
                        <p className="text-gray-600 text-sm">
                          {item.authors.length > 3 
                            ? `${item.authors.length} contributors`
                            : item.authors[0]
                          }
                        </p>
                      </div>
                    )}
                    {item.status && (
                      <div className="bg-white p-6 rounded-xl shadow-sm">
                        <FileText className="w-8 h-8 text-primary mb-3" />
                        <h4 className="font-semibold text-primary mb-2">Status</h4>
                        <p className="text-gray-600 text-sm capitalize">{item.status.replace('-', ' ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Images Gallery */}
          {item.images && item.images.length > 0 && (
            <section>
              <div
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Event Photos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {item.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-4/3 bg-surface rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                    >
                      <img
                        src={image}
                        alt={`${item.title} photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Timeline */}
          {item.timeline && item.timeline.length > 0 && (
            <section>
              <div
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Timeline</h2>
                <div className="space-y-4">
                  {item.timeline.map((event, index) => (
                    <div
                      key={index}
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
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Focus Areas / Methods */}
          {item.focusAreas && item.focusAreas.length > 0 && (
            <section>
              <div
              >
                <h2 className="text-3xl font-bold text-primary mb-6">
                  {item.type === 'project' ? 'Key Methods' : 'Focus Areas'}
                </h2>
                <div className="bg-linear-to-br from-primary/5 to-secondary/30 rounded-2xl p-8">
                  <ul className="space-y-4">
                    {item.focusAreas.map((area, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1">{area.title}</h4>
                          <p className="text-gray-600">{area.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Components */}
          {item.components && item.components.length > 0 && (
            <section>
              <div
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Project Components</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.components.map((component, index) => (
                    <div key={index} className="bg-surface rounded-xl p-8">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                        {component.icon === 'beaker' ? <Beaker className="w-6 h-6 text-white" /> : <BookOpen className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3">{component.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{component.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Impact */}
          {item.impact && item.impact.length > 0 && (
            <section>
              <div
                className="bg-primary text-white rounded-2xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6">Impact & Outcomes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {item.impact.map((section, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-3">{section.title}</h3>
                      <ul className="text-secondary text-sm space-y-1">
                        {section.items.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Authors List (if many) */}
          {item.authors && item.authors.length > 3 && (
            <section>
              <div
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Contributors</h2>
                <div className="bg-surface rounded-2xl p-8">
                  <div className="flex flex-wrap gap-3">
                    {item.authors.map((author, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Resources */}
          {item.resources && item.resources.length > 0 && (
            <section>
              <div
                className="bg-primary text-white rounded-2xl p-8"
              >
                <h2 className="text-3xl font-bold mb-6">Resources</h2>
                <div className="space-y-4">
                  {item.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors rounded-xl p-6"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold uppercase">
                              {resource.type}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
                          {resource.description && (
                            <p className="text-secondary text-sm">{resource.description}</p>
                          )}
                        </div>
                        <ExternalLink className="w-6 h-6 shrink-0 ml-4" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
