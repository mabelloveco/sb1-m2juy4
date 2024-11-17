import React from 'react';
import { Plus } from 'lucide-react';

const stories = [
  {
    id: 1,
    username: 'your_story',
    avatar: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=150',
    isUser: true,
  },
  {
    id: 2,
    username: 'porsche_lover',
    avatar: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=150',
  },
  {
    id: 3,
    username: 'jdm_culture',
    avatar: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=150',
  },
  {
    id: 4,
    username: 'muscle_cars',
    avatar: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=150',
  },
];

export default function Stories() {
  return (
    <div className="flex space-x-4 p-4 bg-white rounded-xl shadow-sm overflow-x-auto">
      {stories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col items-center space-y-1 min-w-[72px]"
        >
          <div className={`relative ${story.isUser ? '' : 'ring-2 ring-red-500 p-[2px]'} rounded-full`}>
            <img
              src={story.avatar}
              alt={story.username}
              className="w-16 h-16 rounded-full object-cover"
            />
            {story.isUser && (
              <div className="absolute bottom-0 right-0 bg-red-500 rounded-full p-1">
                <Plus className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          <span className="text-xs truncate w-16 text-center">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
}