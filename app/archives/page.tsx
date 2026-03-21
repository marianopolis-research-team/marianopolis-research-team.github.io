import { getPastEvents } from '@/lib/events';
import ArchivesClient from './ArchivesClient';

export default function ArchivesPage() {
  const allItems = getPastEvents();
  
  return <ArchivesClient allItems={allItems} />;
}
