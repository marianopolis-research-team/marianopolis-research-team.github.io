import { getUpcomingEvents, getPastEvents } from '@/lib/events';
import ResearchClient from './ResearchClient';

export default function ResearchPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  
  return <ResearchClient upcomingEvents={upcomingEvents} pastEvents={pastEvents} />;
}
