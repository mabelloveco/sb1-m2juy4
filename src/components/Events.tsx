import React from 'react';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'SoCal Cars & Coffee',
    date: '2024-03-15T08:00:00',
    location: 'Huntington Beach, CA',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    attendees: 156,
    description: 'Join us for the biggest Cars & Coffee event in Southern California! All makes and models welcome.',
  },
  {
    id: 2,
    title: 'Track Day Experience',
    date: '2024-03-20T09:00:00',
    location: 'Laguna Seca Raceway',
    image: 'https://images.unsplash.com/photo-1590561603088-fb7642fc0eed?w=800',
    attendees: 45,
    description: 'Professional track day with instructors. Limited spots available!',
  },
];

export default function Events() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Events</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="md:flex">
              <img
                src={event.image}
                alt={event.title}
                className="w-full md:w-48 h-48 object-cover"
              />
              <div className="p-6 flex-1">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">{event.description}</p>
                <button className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  RSVP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}