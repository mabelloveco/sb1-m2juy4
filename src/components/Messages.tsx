import React, { useState } from 'react';
import { Send, Phone, Video } from 'lucide-react';

const conversations = [
  {
    id: 1,
    user: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150',
      online: true,
    },
    lastMessage: 'Hey, interested in your R34 GT-R. Is it still available?',
    timestamp: '2:30 PM',
    unread: 2,
  },
  {
    id: 2,
    user: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=150',
      online: false,
    },
    lastMessage: 'Thanks for the advice on the suspension setup!',
    timestamp: 'Yesterday',
    unread: 0,
  },
];

export default function Messages() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);

  return (
    <div className="flex h-[calc(100vh-7rem)] bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Messages</h2>
        </div>
        <div className="overflow-y-auto h-full">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation)}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedChat.id === conversation.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.user.avatar}
                    alt={conversation.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.user.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{conversation.unread}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={selectedChat.user.avatar}
              alt={selectedChat.user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold">{selectedChat.user.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedChat.user.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Phone className="h-5 w-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Video className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Chat messages would go here */}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}