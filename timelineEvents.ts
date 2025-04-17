import {TimelineEventProps, CalendarUtils} from 'react-native-calendars';

const EVENT_COLOR = '#e6add8';
const today = new Date();
export const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));

export const timelineEvents: TimelineEventProps[] = [
  {
    // date format is year-month-day 2025-01-22
    start: `${getDate(-1)} 09:20:00`,
    end: `${getDate(-1)} 12:00:00`,
    title: 'Petter App Feature Submission',
    summary: 'Submit new pet tracking features to development team',
    
  },
  {
    start: `${getDate()} 01:15:00`,
    end: `${getDate()} 02:30:00`,
    title: 'Dog Park Meetup',
    summary: 'Weekly playdate at Central Dog Park',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 01:30:00`,
    end: `${getDate()} 02:30:00`,
    title: 'Puppy Training Class',
    summary: 'Basic commands and socialization training',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 01:45:00`,
    end: `${getDate()} 02:45:00`,
    title: 'Cat Grooming Appointment',
    summary: 'Fur trimming and nail clipping session',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 02:40:00`,
    end: `${getDate()} 03:10:00`,
    title: 'Pet Store Supply Run',
    summary: 'Pick up food, treats and new toys',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 02:50:00`,
    end: `${getDate()} 03:20:00`,
    title: 'Reptile Terrarium Cleaning',
    summary: 'Monthly habitat maintenance for lizards',
    color: EVENT_COLOR
  },
  {
    start: `${getDate()} 04:30:00`,
    end: `${getDate()} 05:30:00`,
    title: 'Volunteer at Animal Shelter',
    summary: 'Dog walking and socialization time',
    color: EVENT_COLOR
  },
  {
    start: `${getDate(1)} 00:30:00`,
    end: `${getDate(1)} 01:30:00`,
    title: 'Visit Friend\'s New Kitten',
    summary: 'Meet the new addition and bring cat toys',
    color: 'lightblue'
  },
  {
    start: `${getDate(1)} 02:30:00`,
    end: `${getDate(1)} 03:20:00`,
    title: 'Veterinarian Checkup',
    summary: 'Annual wellness exam with Dr. Behjet',
    color: EVENT_COLOR
  },
  {
    start: `${getDate(1)} 04:10:00`,
    end: `${getDate(1)} 04:40:00`,
    title: 'Pet Photography Session',
    summary: 'Professional photos with Dr. Hasan\'s pets'
  },
  {
    start: `${getDate(1)} 01:05:00`,
    end: `${getDate(1)} 01:35:00`,
    title: 'Mobile Pet Grooming',
    summary: 'In-home service at 3412 Piedmont Rd NE'
  },
  {
    start: `${getDate(1)} 14:30:00`,
    end: `${getDate(1)} 16:30:00`,
    title: 'Pet Owners Meetup Group',
    summary: 'Monthly gathering with fellow pet enthusiasts',
    color: 'pink'
  },
  {
    start: `${getDate(2)} 01:40:00`,
    end: `${getDate(2)} 02:25:00`,
    title: 'Exotic Bird Workshop',
    summary: 'Learning about parrot care with Prof. Khurram',
    color: 'orange'
  },
  {
    start: `${getDate(2)} 04:10:00`,
    end: `${getDate(2)} 04:40:00`,
    title: 'Pet-Friendly Cafe Visit',
    summary: 'Coffee with pets at WeRplay Cafe'
  },
  {
    start: `${getDate(2)} 00:45:00`,
    end: `${getDate(2)} 01:45:00`,
    title: 'Virtual Pet Meetup Game',
    summary: 'Online gaming with other pet owners'
  },
  {
    start: `${getDate(2)} 11:30:00`,
    end: `${getDate(2)} 12:30:00`,
    title: 'Pet Therapy Certification',
    summary: 'Training session at 3412 Piedmont Rd NE'
  },
  {
    start: `${getDate(4)} 12:10:00`,
    end: `${getDate(4)} 13:45:00`,
    title: 'Petter App Update Release',
    summary: 'Launch new pet scheduling features in app'
  }
];

export const addTimelineEvent = (newEvent: TimelineEventProps) => {
  timelineEvents.push(newEvent);
};
