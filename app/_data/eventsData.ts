export type EventType = 'project' | 'paper' | 'seminar' | 'workshop' | 'social' | 'meeting';

export interface Event {
  slug: string;
  type: EventType;
  title: string;
  description: string;
  longDescription?: string;
  eventDate: string; // ISO format for sorting: YYYY-MM-DD
  authors?: string[];
  
  // Optional detailed information
  location?: string;
  time?: string;
  
  // Speakers (for seminars)
  speakers?: {
    name: string;
    bio?: string;
    affiliation?: string;
  }[];
  
  // Images
  images?: string[];
  
  // Agenda (for events/meetings)
  agenda?: {
    time: string;
    activity: string;
  }[];
  
  // Key takeaways
  keyTakeaways?: string[];
  
  // Timeline events (for projects)
  timeline?: {
    date: string;
    title: string;
    description: string;
  }[];
  
  // Resources (links, PDFs, slides, etc.)
  resources?: {
    title: string;
    description?: string;
    url: string;
    type: 'pdf' | 'slides' | 'article' | 'link' | 'drive';
  }[];
  
  // Key focus areas or methods (for projects)
  focusAreas?: {
    title: string;
    description: string;
  }[];
  
  // Project components
  components?: {
    title: string;
    description: string;
    icon?: string;
  }[];
  
  // Impact or learning outcomes
  impact?: {
    title: string;
    items: string[];
  }[];
  
  // Status for archived items
  status?: 'completed' | 'in-progress' | 'upcoming';
  archived?: boolean; // Optional: explicitly mark as archived
}

export const events: Event[] = [
  // Fall 2025 Events
  {
    slug: 'seminar-lia-formenti-2025',
    type: 'seminar',
    title: 'Seminar with Lia Formenti',
    description: 'Introduction to particle physics and Lia Formenti\'s experience working at CERN.',
    longDescription: 'Join us for an exciting seminar with Lia Formenti as she shares her experience working at CERN and provides an introduction to the fascinating world of particle physics.',
    eventDate: '2025-09-23',
    images: [
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/IMG_0778.jpg',
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/IMG_0784.jpg',
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/IMG_0785.jpg',
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/PXL_20250923_172655958.jpg',
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/PXL_20250923_172658457.jpg',
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/PXL_20250923_172805501.MP.jpg',
      '/images/events/seminars/Lia Formenti (September 23rd, 2025)/group photo MES-MRT.png',
    ],
    speakers: [
      {
        name: 'Lia Formenti',
        affiliation: 'CERN',
      },
    ],
    keyTakeaways: [
      'Introduction to particle physics fundamentals',
      'Insights into research at CERN',
      'Career pathways in physics research',
    ],
  },
  {
    slug: 'welcome-session-fall-2025',
    type: 'meeting',
    title: 'Welcome Session Fall 2025',
    description: 'Introduction to club members, annual lab project and a fun game!',
    longDescription: 'Welcome to the Marianopolis Research Team! Join us for our fall welcome session where we\'ll introduce new members to the club, present our annual lab project, and play some fun icebreaker games.',
    eventDate: '2025-09-15',
    images: [
      '/images/events/club-meeting-2025/Dofoto_20250918_165156272.jpg',
      '/images/events/club-meeting-2025/IMG_0710.jpg',
      '/images/events/club-meeting-2025/IMG_0713.jpg',
      '/images/events/club-meeting-2025/PXL_20250916_171349363.jpg',
      '/images/events/club-meeting-2025/PXL_20250916_171409162.jpg',
      '/images/events/club-meeting-2025/PXL_20250916_171435450.jpg',
      '/images/events/club-meeting-2025/PXL_20250916_171445505.MP.jpg',
      '/images/events/club-meeting-2025/PXL_20250916_172626869.MP.jpg',
    ],
    agenda: [
      { time: '12:15 PM', activity: 'Welcome & Introductions' },
      { time: '12:25 PM', activity: 'Lab Project Presentation' },
      { time: '12:40 PM', activity: 'Icebreaker Games' },
    ],
  },
  {
    slug: 'orientation-fall-2025',
    type: 'workshop',
    title: 'Orientation Day Fall 2025',
    description: 'Flame Test Demo and Introduction to MRT and to the chemistry lab!',
    longDescription: 'New to Marianopolis and interested in research? Join us at orientation day for an exciting flame test demonstration and learn all about MRT and how to use the chemistry lab!',
    eventDate: '2025-08-28',
    location: 'Chemistry Lab',
    images: [
      '/images/events/orientation-2025/PXL_20250814_130945395.MP.jpg',
      '/images/events/orientation-2025/PXL_20250814_131000932.jpg',
      '/images/events/orientation-2025/PXL_20250814_131028438.MP.jpg',
      '/images/events/orientation-2025/PXL_20250814_131037804.jpg',
    ],
    agenda: [
      { time: '10:00 AM', activity: 'Introduction to MRT' },
      { time: '10:20 AM', activity: 'Flame Test Demo' },
      { time: '10:40 AM', activity: 'Lab Tour & Safety' },
    ],
  },
  {
    slug: 'seminar-nivatha-balendra-2025',
    type: 'seminar',
    title: 'Seminar with Nivatha Balendra',
    description: 'Guest speaker seminar on scientific research and career pathways.',
    longDescription: 'Join us for a seminar with Nivatha Balendra discussing scientific research methodologies and various career pathways in science and research.',
    eventDate: '2025-10-16',
    images: [
      '/images/events/seminars/Nivatha Balendra (October 16th, 2025)/IMG_0987.jpg',
      '/images/events/seminars/Nivatha Balendra (October 16th, 2025)/IMG_0992.jpg',
    ],
    speakers: [
      {
        name: 'Nivatha Balendra',
      },
    ],
  },
  {
    slug: 'seminar-jb-lalanne-2025',
    type: 'seminar',
    title: 'Seminar with JB Lalanne',
    description: 'Guest speaker discussing cutting-edge research and insights.',
    longDescription: 'Don\'t miss this opportunity to hear from JB Lalanne as he shares his cutting-edge research and insights from the field.',
    eventDate: '2025-11-11',
    images: [
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/IMG_1401 (1).jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/IMG_1406 (1).jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_174535007.MP.jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_174748723.jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_174749342.jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_174751913.jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_174754350.jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_190125919.MP.jpg',
      '/images/events/seminars/JB Lalanne (Nov 11th, 2025)/PXL_20251111_190128695.jpg',
    ],
    speakers: [
      {
        name: 'JB Lalanne',
      },
    ],
  },
  
  // Fall 2024 Events
  {
    slug: 'scientific-essay-writing-2024',
    type: 'workshop',
    title: 'Scientific Essay Writing Workshop',
    description: 'Introduction to Scientific Writing Using Typst with Professor Pierre-Alexandre Mailhot.',
    longDescription: 'Learn how to write scientific papers more efficiently using Typst, an open-source software for composing academic documents. Professor Pierre-Alexandre Mailhot will guide you through the fundamentals of scientific writing and the Typst platform.',
    eventDate: '2024-10-15',
    speakers: [
      {
        name: 'Professor Pierre-Alexandre Mailhot',
        affiliation: 'Marianopolis College',
      },
    ],
    resources: [
      {
        title: 'Typst Template',
        description: 'Access the scientific writing template',
        url: 'https://typst.app/project/rjL45H9suJ0ok36YU7VWUI',
        type: 'link',
      },
    ],
    keyTakeaways: [
      'Scientific paper structure and formatting',
      'Using Typst for academic writing',
      'Best practices for scientific communication',
    ],
  },
  
  // Current Lab Projects
  {
    slug: 'supercooling-2026',
    type: 'project',
    title: 'Supercooling Fruits: Effects on Food Preservation',
    description: 'Our lab project this year is on supercooling!',
    longDescription: 'Our 2026 research project investigates the fascinating phenomenon of supercooling and its practical applications in food preservation. This experiment explores how controlled supercooling affects the cellular structure, nutritional content, and longevity of various fruits, potentially revolutionizing food storage methods.',
    eventDate: '2026-03-01', // Set to future date since it's current/ongoing
    authors: ['MRT Research Team 2025-2026'],
    status: 'in-progress',
    timeline: [
      {
        date: 'Fall 2025',
        title: 'Experimental Design',
        description: 'Collaborate on developing the lab procedure and methodology',
      },
      {
        date: 'Winter 2026',
        title: 'Hands-On Experimentation',
        description: 'Participate in the supercooling experiment during activity period',
      },
      {
        date: 'Spring 2026',
        title: 'Analysis & Writing',
        description: 'Contribute to data analysis and write sections of the final research paper',
      },
    ],
    focusAreas: [
      {
        title: 'Cellular Structure Analysis',
        description: 'How does supercooling affect the cellular structure of different fruit types?',
      },
      {
        title: 'Nutritional Content Preservation',
        description: 'What is the impact of supercooling on nutritional content preservation compared to traditional freezing?',
      },
      {
        title: 'Shelf Life Extension',
        description: 'Can supercooling extend the shelf life of fruits without compromising texture and flavor?',
      },
      {
        title: 'Optimal Conditions',
        description: 'What are the optimal supercooling conditions for different fruit species?',
      },
    ],
    resources: [
      {
        title: 'Application Form',
        description: 'Apply to join the supercooling research project',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSeCi9QrOVWp9tC5Gy3y2mw621uwWzfuUr3HEAW2lFXtQSMzNQ/viewform?usp=dialog',
        type: 'link',
      },
    ],
  },
  
  // Past Lab Projects
  {
    slug: 'dna-extraction-2024',
    type: 'project',
    title: 'Fruit DNA Extraction and Analysis',
    description: 'Fruit DNA extraction and analysis using various techniques including ethanol precipitation and the Diphenylamine Method.',
    longDescription: 'This project aimed to determine the DNA yield of different fruit samples and investigate the influence of growing conditions on DNA concentration. Using ethanol precipitation and the Diphenylamine Method for quantitative DNA estimation, students gained hands-on experience in molecular biology techniques.',
    eventDate: '2025-02-20',
    authors: ['MRT Research Team 2024-2025'],
    status: 'completed',
    timeline: [
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
    ],
    focusAreas: [
      {
        title: 'DNA Extraction Using Ethanol Precipitation',
        description: 'Standard method for isolating DNA from fruit samples using ethanol-based precipitation techniques.',
      },
      {
        title: 'Quantitative DNA Concentration Estimation',
        description: 'Used the Diphenylamine Method to accurately measure DNA concentration in extracted samples.',
      },
    ],
    components: [
      {
        title: 'Experiment and Manipulations',
        description: 'Students conducted the main experiments and manipulations to obtain results and data for analysis. Due to limited lab space and materials, participation was prioritized for active members.',
      },
      {
        title: 'Writing the Article',
        description: 'Participants analyzed experimental results and crafted various sections of the scientific article. All contributors had their names included in the final published article.',
      },
    ],
    resources: [
      {
        title: 'Research Challenge',
        description: 'Help us make the lab protocol and get a chance to help make the standard curve of calf thymus DNA',
        url: 'https://docs.google.com/document/d/1bJ9QyFKOUJ1LHnC7qCd515OtPryIZiGSNFgDFyB8w9I/edit?usp=sharing',
        type: 'link',
      },
      {
        title: 'DNA Lab Info Session Slides',
        description: 'October 2024 - Lab protocol briefing and project overview',
        url: 'https://docs.google.com/presentation/d/1y7OVCaaV8hAlWeaWw1zam4lXRqXUMmfH0Dp3h0WwKOI/edit?usp=sharing',
        type: 'slides',
      },
      {
        title: 'Lab Project Participation Sheet',
        description: 'Choose what you want to work on for the DNA extraction lab project',
        url: 'https://docs.google.com/spreadsheets/d/1SsYNW1PCvA1ErrDCxatfG3jt8HyklQxtT9Dl82yc_eo/edit?usp=sharing',
        type: 'link',
      },
      {
        title: 'Final Report - DNA Analysis Project (PDF)',
        description: 'Published research article',
        url: '/articles/Final Report_DNA Analysis Project.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'wastewater-analysis-2023',
    type: 'project',
    eventDate: '2024-04-01',
    title: 'Wastewater Analysis Project',
    description: 'Analysing wastewater through biofluorescence techniques to monitor water quality and detect contaminants.',
    longDescription: 'This project explored innovative methods for wastewater analysis using biofluorescence techniques. Students investigated how fluorescent properties could be used to detect and analyze various components in wastewater samples, contributing to environmental monitoring and public health research.',
    authors: ['MRT Research Team 2023-2024'],
    status: 'completed',
    focusAreas: [
      {
        title: 'Biofluorescence Techniques',
        description: 'Utilized fluorescent microscopy and spectroscopy to identify biological markers in wastewater.',
      },
      {
        title: 'Environmental Monitoring',
        description: 'Developed methods for assessing water quality and detecting contaminants.',
      },
      {
        title: 'Data Analysis',
        description: 'Applied statistical methods to interpret fluorescence data and draw meaningful conclusions.',
      },
    ],
    impact: [
      {
        title: 'Skills Developed',
        items: [
          'Fluorescence microscopy',
          'Spectroscopic analysis',
          'Water quality testing',
          'Data visualization',
        ],
      },
      {
        title: 'Learning Outcomes',
        items: [
          'Environmental biotechnology',
          'Analytical chemistry methods',
          'Scientific methodology',
          'Collaborative research',
        ],
      },
    ],
  },
  
  // Published Papers
  {
    slug: 'biotech-literature-review-2024',
    type: 'paper',
    eventDate: '2024-05-01',
    title: 'Biotechnology Literature Review',
    description: 'Comprehensive literature review on nanotechnology in medicine. Thank you to all members who participated.',
    longDescription: 'A collaborative literature review exploring the applications, challenges, and future directions of nanotechnology in medicine. This comprehensive analysis covered drug delivery systems, diagnostic tools, and therapeutic interventions at the nanoscale.',
    authors: ['Elizabeth Andriopoulos', 'Yiluo Fan', 'Zhi Jun Liu', 'Jabin Lim', 'Youssef Shalaby', 'Aly Shalaby', 'Huu Thien Tran', 'Nathan Vong'],
    status: 'completed',
    resources: [
      {
        title: 'Literature Review (PDF)',
        description: 'Complete nanotechnology in medicine review article',
        url: '/articles/MRT literature review_Nanotechnologies in Medicine - Copy.pdf',
        type: 'pdf',
      },
      {
        title: 'Full Literature Review (Google Drive)',
        description: 'Complete nanotechnology in medicine review',
        url: 'https://drive.google.com/file/d/1_RDk9MzQJx9BAbstjx90JqHOaUor4GLH/view',
        type: 'drive',
      },
    ],
  },
  {
    slug: 'covid-research-report-2020',
    type: 'paper',
    eventDate: '2020-05-01',
    title: 'COVID-19 Research Report',
    description: 'This project started during the pandemic, where our club members compiled information on Covid in its earlier stages.',
    longDescription: 'During the early stages of the COVID-19 pandemic, MRT members came together to compile and analyze emerging research on SARS-CoV-2. This report synthesized information on virus transmission, symptoms, prevention strategies, and early treatment approaches.',
    authors: ['MRT COVID-19 Research Committee'],
    status: 'completed',
    resources: [
      {
        title: 'COVID-19 Research Report (PDF)',
        description: 'May 2020 compiled research article',
        url: '/articles/MRT Covid-19 Research Committee.pdf',
        type: 'pdf',
      },
      {
        title: 'COVID-19 Research Report (Google Drive)',
        description: 'May 2020 compiled research',
        url: 'https://drive.google.com/file/d/11TalbqyTHyJvDh-PzdRH1gr8VwUTDpJ3/view',
        type: 'drive',
      },
    ],
  },
  
  // Workshops and Other Events
  {
    slug: 'science-fair-prep-2024',
    type: 'workshop',
    eventDate: '2024-11-14',
    title: 'Science Fair Prep Session',
    description: 'Our execs discussed our research projects to help kickstart science fair projects for students.',
  },
  {
    slug: 'academic-writing-workshop-2023',
    type: 'workshop',
    eventDate: '2023-10-15',
    title: 'Academic Writing Workshop',
    description: 'Guidelines on how to write scientific academic papers. Academic paper structure, how to read research, how to come up with a research topic.',
    resources: [
      {
        title: 'Workshop Slides',
        description: 'Academic writing guidelines and structure',
        url: 'https://docs.google.com/presentation/d/10uN0dzC9XYiNHpEy8opDjgyBek4obdr1/edit?usp=sharing&ouid=114641253321317277215&rtpof=true&sd=true',
        type: 'slides',
      },
    ],
  },
  {
    slug: 'bioethics-roundtable-2023',
    type: 'workshop',
    eventDate: '2023-11-20',
    title: 'Bioethics Roundtable',
    description: 'Discussion on Hwang Woo-suk, cloning and using human embryos in research. Exploring ethical implications in biotechnology.',
    resources: [
      {
        title: 'Bioethics Roundtable Slides (PDF)',
        description: 'Discussion materials and case studies',
        url: '/articles/Fall2023_MRT_Bioethics_Roundtable.pdf',
        type: 'pdf',
      },
    ],
  },
  {
    slug: 'science-resources-2021',
    type: 'workshop',
    eventDate: '2021-09-01',
    title: 'Science Resources Compilation',
    description: 'A list of science journals, science festivals, podcasts, seminars and student opportunities. Compiled by 2021 execs.',
  },
];

// Helper function to check if an event is in the past
export function isEventPast(eventDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset to start of day
  const eventDateObj = new Date(eventDate);
  eventDateObj.setHours(0, 0, 0, 0);
  return eventDateObj < today;
}

// Get events sorted by date (most recent first)
export function getEventsSorted(): Event[] {
  return [...events].sort((a, b) => {
    return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
  });
}

// Get upcoming events only
export function getUpcomingEvents(): Event[] {
  return events.filter(event => !isEventPast(event.eventDate))
    .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
}

// Get past events only
export function getPastEvents(): Event[] {
  return events.filter(event => isEventPast(event.eventDate))
    .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
}

// Get event by slug
export function getEventBySlug(slug: string): Event | undefined {
  return events.find(event => event.slug === slug);
}

// Get events by type
export function getEventsByType(type: EventType): Event[] {
  return events.filter(event => event.type === type);
}
