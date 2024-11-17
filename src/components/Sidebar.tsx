import React from 'react';
import { Home, Search, ShoppingBag, Calendar, Users, MessageSquare, User, Smile } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const menuItems = [
  { id: 'feed', icon: Home, label: 'Feed' },
  { id: 'discover', icon: Search, label: 'Discover' },
  { id: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
  { id: 'events', icon: Calendar, label: 'Events' },
  { id: 'communities', icon: Users, label: 'Communities' },
  { id: 'messages', icon: MessageSquare, label: 'Messages' },
  { id: 'memes', icon: Smile, label: 'Meme Generator' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  return (
    <div className="w-64 h-[calc(100vh-4rem)] sticky top-16 bg-white border-r border-gray-200 py-6">
      <nav className="px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 ${
                currentView === item.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}