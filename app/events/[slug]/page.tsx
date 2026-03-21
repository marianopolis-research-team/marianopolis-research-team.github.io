import { Calendar, MapPin, Clock, Users, ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { getEventBySlug, isEventPast, getAllEvents, Event } from '@/lib/events';
import { notFound } from 'next/navigation';
import ImageGallery from '@/app/_components/ImageGallery';
import { marked } from 'marked';

const typeConfig: Record<string, { label: string; color: string }> = {
  seminar: { label: 'Seminar', color: 'bg-[#588157]' },
  workshop: { label: 'Workshop', color: 'bg-[#A3B18A]' },
  social: { label: 'Social Event', color: 'bg-[#A3B18A]' },
  meeting: { label: 'Club Meeting', color: 'bg-[#344E41]' },
  project: { label: 'Lab Project', color: 'bg-[#344E41]' },
  paper: { label: 'Published Paper', color: 'bg-[#3A5A40]' },
};

export function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <EventDetailContent event={event} />;
}

function EventDetailContent({ event }: { event: Event }) {

  const typeInfo = typeConfig[event.type];
  const isPast = isEventPast(event.eventDate);
  const eventDateFormatted = new Date(event.eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
          <Link href="/research/" className="inline-flex items-center gap-2 text-secondary hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </Link>
          
          <div
            className="max-w-4xl"
          >
            <div className="flex gap-3 mb-4">
              <span className={`px-3 py-1 ${typeInfo.color} text-white rounded-full text-sm font-medium`}>
                {typeInfo.label}
              </span>
              {isPast && (
                <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-sm font-medium">
                  Past Event
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <p className="text-xl text-secondary">{event.description}</p>
            
            <div className="flex flex-wrap gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{eventDateFormatted}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Long Description */}
            {event.longDescription && (
              <section
                className="prose prose-lg max-w-none"
              >
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: marked.parse(event.longDescription) 
                  }} 
                />
              </section>
            )}

            {/* Images Gallery */}
            {event.images && event.images.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-primary mb-6">Event Photos</h2>
                <ImageGallery images={event.images} title={event.title} maxDisplay={4} />
              </section>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <section
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Event Agenda</h2>
                <div className="bg-surface rounded-xl p-6 space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="font-semibold text-primary min-w-24">{item.time}</div>
                      <div className="text-gray-700">{item.activity}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Key Takeaways */}
            {event.keyTakeaways && event.keyTakeaways.length > 0 && (
              <section
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Key Takeaways</h2>
                <ul className="space-y-3">
                  {event.keyTakeaways.map((takeaway, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <span className="text-gray-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Resources */}
            {event.resources && event.resources.length > 0 && (
              <section
              >
                <h2 className="text-3xl font-bold text-primary mb-6">Resources</h2>
                <div className="space-y-4">
                  {event.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-surface hover:bg-secondary transition-colors rounded-xl p-6 group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg text-primary mb-1">{resource.title}</h3>
                          {resource.description && (
                            <p className="text-gray-600">{resource.description}</p>
                          )}
                        </div>
                        <ExternalLink className="w-6 h-6 shrink-0 ml-4 text-primary" />
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div
                  className="bg-surface rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Speaker{event.speakers.length > 1 ? 's' : ''}
                  </h3>
                  <div className="space-y-4">
                    {event.speakers.map((speaker, index) => (
                      <div key={index}>
                        <div className="font-semibold text-gray-900">{speaker.name}</div>
                        {speaker.affiliation && (
                          <div className="text-sm text-gray-600">{speaker.affiliation}</div>
                        )}
                        {speaker.bio && (
                          <div className="text-sm text-gray-700 mt-2">{speaker.bio}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Info */}
              <div
                className="bg-surface rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-primary mb-4">Event Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-gray-700">Event Type</div>
                    <div className="text-gray-600">{typeInfo.label}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Date</div>
                    <div className="text-gray-600">{eventDateFormatted}</div>
                  </div>
                  {event.location && (
                    <div>
                      <div className="font-semibold text-gray-700">Location</div>
                      <div className="text-gray-600">{event.location}</div>
                    </div>
                  )}
                  {event.time && (
                    <div>
                      <div className="font-semibold text-gray-700">Time</div>
                      <div className="text-gray-600">{event.time}</div>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-700">Status</div>
                    <div className="text-gray-600">{isPast ? 'Past Event' : 'Upcoming Event'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
