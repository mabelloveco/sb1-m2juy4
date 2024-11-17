import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';

interface PostProps {
  username: string;
  userAvatar: string;
  carMake: string;
  carModel: string;
  imageUrl: string;
  likes: number;
  caption: string;
  comments: number;
  location?: string;
  hashtags: string[];
}

export default function Post({
  username,
  userAvatar,
  carMake,
  carModel,
  imageUrl,
  likes,
  caption,
  comments,
  location,
  hashtags
}: PostProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={userAvatar}
            alt={username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{username}</p>
            {location && (
              <p className="text-sm text-gray-500">{location}</p>
            )}
          </div>
        </div>
        <div className="text-sm font-medium text-gray-900">
          {carMake} {carModel}
        </div>
      </div>

      <img
        src={imageUrl}
        alt={`${carMake} ${carModel}`}
        className="w-full aspect-video object-cover"
      />

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1">
              <Heart className="h-6 w-6 text-gray-600 hover:text-red-600" />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-1">
              <MessageCircle className="h-6 w-6 text-gray-600" />
              <span>{comments}</span>
            </button>
            <Share2 className="h-6 w-6 text-gray-600" />
          </div>
          <Bookmark className="h-6 w-6 text-gray-600" />
        </div>

        <p className="mb-2">
          <span className="font-semibold">{username}</span> {caption}
        </p>

        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-red-600 text-sm hover:underline cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}