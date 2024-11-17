import React, { useState } from 'react';
import { Search as SearchIcon, TrendingUp, Trophy, ThumbsUp, Users, Calendar, MapPin } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  image: string;
  votes: number;
  rank: number;
  date: string;
  location: string;
  attendees: number;
  hashtags: string[];
  hasVoted?: boolean;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "SuperCar Sunday Meetup",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800",
    votes: 1250,
    rank: 1,
    date: "2024-03-20",
    location: "Los Angeles, CA",
    attendees: 500,
    hashtags: ["supercar", "meetup", "carshow"],
  },
  {
    id: 2,
    title: "JDM Night Racing",
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?w=800",
    votes: 980,
    rank: 2,
    date: "2024-03-22",
    location: "Tokyo, Japan",
    attendees: 300,
    hashtags: ["jdm", "racing", "nightrace"],
  },
  {
    id: 3,
    title: "Classic Car Exhibition",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800",
    votes: 850,
    rank: 3,
    date: "2024-03-25",
    location: "Miami, FL",
    attendees: 1000,
    hashtags: ["classic", "vintage", "exhibition"],
  },
  {
    id: 4,
    title: "European Auto Festival",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800",
    votes: 720,
    rank: 4,
    date: "2024-03-28",
    location: "Berlin, Germany",
    attendees: 800,
    hashtags: ["european", "festival", "luxury"],
  },
  {
    id: 5,
    title: "Muscle Car Showdown",
    image: "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800",
    votes: 650,
    rank: 5,
    date: "2024-03-30",
    location: "Detroit, MI",
    attendees: 600,
    hashtags: ["muscle", "american", "showdown"],
  },
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState(initialEvents);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);

  const handleVote = (eventId: number) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        const newVotes = event.hasVoted ? event.votes - 1 : event.votes + 1;
        return {
          ...event,
          votes: newVotes,
          hasVoted: !event.hasVoted,
        };
      }
      return event;
    }));
  };

  const getRankBadge = (rank: number) => {
    const badges = {
      1: "bg-yellow-500 text-white",
      2: "bg-gray-400 text-white",
      3: "bg-amber-600 text-white",
      4: "bg-blue-500 text-white",
      5: "bg-green-500 text-white"
    };
    
    return (
      <div className={`absolute top-4 left-4 ${badges[rank as keyof typeof badges]} px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg`}>
        <Trophy className="h-5 w-5" />
        <span className="font-bold">#{rank}</span>
      </div>
    );
  };

  const filteredEvents = events
    .sort((a, b) => b.votes - a.votes)
    .map((event, index) => ({ ...event, rank: index + 1 }));

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search events, hashtags, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
            <div className="relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              {getRankBadge(event.rank)}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleVote(event.id)}
                  className={`px-6 py-3 rounded-full flex items-center space-x-2 ${
                    event.hasVoted 
                      ? 'bg-red-600 text-white' 
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <ThumbsUp className={`h-5 w-5 ${event.hasVoted ? 'fill-current' : ''}`} />
                  <span className="font-semibold">{event.votes}</span>
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {event.hashtags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedHashtag(selectedHashtag === tag ? null : tag)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedHashtag === tag
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}