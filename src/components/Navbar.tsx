import React from 'react';
import { Car, Search, Bell, MessageSquare, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Car className="h-8 w-8 text-red-600" />
            <span className="text-xl font-bold">Secret Auto Society</span>
          </div>
          
          <div className="flex-1 max-w-xl px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search cars, parts, or people..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-600" />
            <MessageSquare className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-600" />
            <User className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}