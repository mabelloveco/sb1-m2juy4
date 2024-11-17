import React, { useState } from 'react';
import { Users, MessageSquare, TrendingUp, Lock, Globe, Plus, X } from 'lucide-react';

interface Group {
  id: number;
  name: string;
  image: string;
  members: number;
  description: string;
  postsToday: number;
  trending: boolean;
  isPrivate: boolean;
  owner: string;
}

const initialGroups: Group[] = [
  {
    id: 1,
    name: 'JDM Enthusiasts',
    image: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=800',
    members: 15420,
    description: 'The largest community for Japanese car enthusiasts. Share your builds, get advice, and connect with fellow JDM lovers.',
    postsToday: 156,
    trending: true,
    isPrivate: false,
    owner: 'jdm_master'
  },
  {
    id: 2,
    name: 'Classic Muscle',
    image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800',
    members: 12350,
    description: 'Dedicated to American muscle cars from all eras. Restoration tips, shows, and meets.',
    postsToday: 89,
    trending: true,
    isPrivate: false,
    owner: 'muscle_king'
  },
  {
    id: 3,
    name: 'Elite Porsche Club',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    members: 324,
    description: 'Private group for verified Porsche owners. Exclusive events and discussions.',
    postsToday: 45,
    trending: false,
    isPrivate: true,
    owner: 'porsche_enthusiast'
  }
];

export default function Communities() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    isPrivate: false,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
  });

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.description) {
      const group: Group = {
        id: groups.length + 1,
        name: newGroup.name,
        image: newGroup.image,
        members: 1,
        description: newGroup.description,
        postsToday: 0,
        trending: false,
        isPrivate: newGroup.isPrivate,
        owner: 'current_user'
      };

      setGroups([...groups, group]);
      setShowCreateModal(false);
      setNewGroup({
        name: '',
        description: '',
        isPrivate: false,
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800'
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Communities</h2>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Plus className="h-5 w-5" />
          <span>Create Group</span>
        </button>
      </div>
      
      <div className="grid gap-6">
        {groups.map((group) => (
          <div key={group.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-40">
              <img
                src={group.image}
                alt={group.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                {group.isPrivate ? (
                  <div className="flex items-center space-x-1 bg-gray-900 text-white px-3 py-1 rounded-full">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm">Private</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-full">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">Public</span>
                  </div>
                )}
                {group.trending && (
                  <div className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">Trending</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{group.name}</h3>
              <p className="text-gray-600 mb-4">{group.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>{group.members.toLocaleString()} members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>{group.postsToday} posts today</span>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                  {group.isPrivate ? 'Request to Join' : 'Join Group'}
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                  View Posts
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Create New Group</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe your group"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={newGroup.isPrivate}
                  onChange={(e) => setNewGroup({ ...newGroup, isPrivate: e.target.checked })}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="private" className="text-sm text-gray-700">
                  Make this group private
                </label>
              </div>

              <button
                onClick={handleCreateGroup}
                disabled={!newGroup.name || !newGroup.description}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}