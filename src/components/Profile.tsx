import React, { useState } from 'react';
import { Settings, MapPin, Calendar, Shield, Grid, Play, Tag } from 'lucide-react';
import TopFriends from './TopFriends';
import ProfilePicture from './ProfilePicture';
import EditProfileModal from './EditProfileModal';

const initialProfile = {
  name: 'Mike Anderson',
  username: '@car_enthusiast',
  avatar: null,
  bio: 'Passionate car photographer and automotive journalist. Always in search of the perfect shot and the perfect drive.',
  location: 'Los Angeles, CA',
  joined: 'January 2023',
  verified: true,
  stats: {
    posts: 342,
    followers: 15.8,
    following: 892,
  },
  posts: [
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
      likes: 1234,
      comments: 89,
    },
    {
      id: 2,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
      likes: 856,
      comments: 45,
    },
    {
      id: 3,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
      likes: 2341,
      comments: 156,
    },
  ],
  reels: [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800',
      views: '125K',
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=800',
      views: '89K',
    },
  ],
  tagged: [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800',
      likes: 567,
      comments: 34,
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800',
      likes: 890,
      comments: 67,
    },
  ],
};

type TabType = 'posts' | 'reels' | 'tagged';

export default function Profile() {
  const [userProfile, setUserProfile] = useState(initialProfile);
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProfileUpdate = (updatedProfile: {
    name: string;
    username: string;
    bio: string;
    location: string;
    avatar: string | null;
  }) => {
    setUserProfile({
      ...userProfile,
      ...updatedProfile,
    });
  };

  const renderTabContent = () => {
    const gridClasses = "grid grid-cols-3 gap-1";
    const itemClasses = "aspect-square relative group cursor-pointer";
    const overlayClasses = "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center";
    const statsClasses = "hidden group-hover:flex items-center space-x-4 text-white font-semibold";

    switch (activeTab) {
      case 'posts':
        return (
          <div className={gridClasses}>
            {userProfile.posts.map((post) => (
              <div key={post.id} className={itemClasses}>
                <img src={post.url} alt="" className="w-full h-full object-cover" />
                <div className={overlayClasses}>
                  <div className={statsClasses}>
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'reels':
        return (
          <div className={gridClasses}>
            {userProfile.reels.map((reel) => (
              <div key={reel.id} className={itemClasses}>
                <img src={reel.thumbnail} alt="" className="w-full h-full object-cover" />
                <div className={overlayClasses}>
                  <div className={statsClasses}>
                    <span>👁️ {reel.views}</span>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2">
                  <Play className="h-6 w-6 text-white fill-white" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'tagged':
        return (
          <div className={gridClasses}>
            {userProfile.tagged.map((photo) => (
              <div key={photo.id} className={itemClasses}>
                <img src={photo.url} alt="" className="w-full h-full object-cover" />
                <div className={overlayClasses}>
                  <div className={statsClasses}>
                    <span>❤️ {photo.likes}</span>
                    <span>💬 {photo.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-red-500 to-red-600"></div>
        <div className="px-6 pb-6">
          <div className="flex justify-between items-start -mt-12">
            <ProfilePicture
              currentImage={userProfile.avatar}
              onImageChange={(image) => handleProfileUpdate({ ...userProfile, avatar: image })}
              size="lg"
            />
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-12 flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Settings className="h-5 w-5" />
              <span>Edit Profile</span>
            </button>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              {userProfile.verified && (
                <Shield className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <p className="text-gray-600">{userProfile.username}</p>
          </div>

          <div className="mt-4 space-y-2 text-gray-600">
            <p>{userProfile.bio}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{userProfile.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {userProfile.joined}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-12">
            <div>
              <div className="text-2xl font-bold">{userProfile.stats.posts}</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userProfile.stats.followers}K</div>
              <div className="text-gray-600">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{userProfile.stats.following}</div>
              <div className="text-gray-600">Following</div>
            </div>
          </div>
        </div>
      </div>

      <TopFriends />

      <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${
              activeTab === 'posts' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'
            }`}
          >
            <Grid className="h-5 w-5" />
            <span>POSTS</span>
          </button>
          <button
            onClick={() => setActiveTab('reels')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${
              activeTab === 'reels' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'
            }`}
          >
            <Play className="h-5 w-5" />
            <span>REELS</span>
          </button>
          <button
            onClick={() => setActiveTab('tagged')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center space-x-2 ${
              activeTab === 'tagged' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'
            }`}
          >
            <Tag className="h-5 w-5" />
            <span>TAGGED</span>
          </button>
        </div>
        <div className="p-1">
          {renderTabContent()}
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={userProfile}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}