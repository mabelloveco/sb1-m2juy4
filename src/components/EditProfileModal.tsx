import React from 'react';
import { X } from 'lucide-react';
import ProfilePicture from './ProfilePicture';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    username: string;
    bio: string;
    location: string;
    avatar: string | null;
  };
  onSave: (profile: {
    name: string;
    username: string;
    bio: string;
    location: string;
    avatar: string | null;
  }) => void;
}

export default function EditProfileModal({ isOpen, onClose, profile, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = React.useState(profile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-center justify-center mb-6">
            <ProfilePicture
              currentImage={formData.avatar}
              onImageChange={(image) => setFormData({ ...formData, avatar: image })}
              size="lg"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="@username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={3}
                placeholder="Write a bio..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Your location"
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}