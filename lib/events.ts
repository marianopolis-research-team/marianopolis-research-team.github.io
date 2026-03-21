import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Re-export types from original file
export type EventType = 'project' | 'paper' | 'seminar' | 'workshop' | 'social' | 'meeting';

export interface Event {
  slug: string;
  type: EventType;
  title: string;
  description: string;
  longDescription?: string;
  content?: string;
  eventDate: string; // ISO format YYYY-MM-DD
  authors?: string[];
  location?: string;
  time?: string;
  speakers?: {
    name: string;
    bio?: string;
    affiliation?: string;
  }[];
  images?: string[];
  agenda?: {
    time: string;
    activity: string;
  }[];
  keyTakeaways?: string[];
  timeline?: {
    date: string;
    title: string;
    description: string;
  }[];
  resources?: {
    title: string;
    description?: string;
    url: string;
    type: 'pdf' | 'slides' | 'article' | 'link' | 'drive';
  }[];
  focusAreas?: {
    title: string;
    description: string;
  }[];
  components?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  impact?: {
    title: string;
    items: string[];
  }[];
  status?: 'completed' | 'in-progress' | 'upcoming';
  archived?: boolean;
  [key: string]: any;
}

const eventsDirectory = path.join(process.cwd(), 'content/events');

/**
 * Get all events from markdown files
 */
export function getAllEvents(): Event[] {
  // If directory doesn't exist, return empty array to prevent build errors
  if (!fs.existsSync(eventsDirectory)) {
    console.warn(`Events directory not found: ${eventsDirectory}`);
    return [];
  }

  const fileNames = fs.readdirSync(eventsDirectory);
  const allEvents = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(eventsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...data,
        longDescription: content, // Map body content to longDescription for compatibility
        content,
      } as Event;
    });

  // Sort events by date (most recent first)
  return allEvents.sort((a, b) => {
    return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
  });
}

/**
 * Get a single event by its slug
 */
export function getEventBySlug(slug: string): Event | undefined {
  const events = getAllEvents();
  return events.find((event) => event.slug === slug);
}

/**
 * Check if an event is in the past
 */
export function isEventPast(eventDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDateObj = new Date(eventDate);
  eventDateObj.setHours(0, 0, 0, 0);
  return eventDateObj < today;
}

/**
 * Get upcoming events only (sorted chronologically)
 */
export function getUpcomingEvents(): Event[] {
  const events = getAllEvents();
  return events
    .filter(event => !isEventPast(event.eventDate))
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
}

/**
 * Get past events only (sorted by most recent first)
 */
export function getPastEvents(): Event[] {
  const events = getAllEvents();
  return events
    .filter(event => isEventPast(event.eventDate))
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
}

/**
 * Get events sorted by date (most recent first)
 */
export function getEventsSorted(): Event[] {
  return getAllEvents();
}

/**
 * Get events by type
 */
export function getEventsByType(type: EventType): Event[] {
  const events = getAllEvents();
  return events.filter(event => event.type === type);
}

// Re-export events for backwards compatibility (though this defeats the purpose of file-based CMS)
// This can be removed once all imports are updated
export const events = getAllEvents();
