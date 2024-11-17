import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';

interface ProfilePictureProps {
  currentImage: string | null;
  onImageChange: (image: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

const NFT_DEFAULTS = [
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150',
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=150',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=150',
];

export default function ProfilePicture({ currentImage, onImageChange, size = 'md' }: ProfilePictureProps) {
  const [showOptions, setShowOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setShowOptions(false);
  };

  const defaultImage = NFT_DEFAULTS[Math.floor(Math.random() * NFT_DEFAULTS.length)];
  const displayImage = currentImage || defaultImage;

  return (
    <div className="relative">
      <div 
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden cursor-pointer group`}
        onClick={() => setShowOptions(true)}
      >
        <img
          src={displayImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className="text-white h-6 w-6" />
        </div>
      </div>

      {showOptions && (
        <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg p-4 z-50 w-64">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Change Picture</h3>
            <button 
              onClick={() => setShowOptions(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Upload Photo
            </button>
            <button
              onClick={() => {
                onImageChange(NFT_DEFAULTS[Math.floor(Math.random() * NFT_DEFAULTS.length)]);
                setShowOptions(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg"
            >
              Generate Random NFT
            </button>
            {currentImage && (
              <button
                onClick={() => {
                  onImageChange('');
                  setShowOptions(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-lg text-red-600"
              >
                Remove Current Photo
              </button>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}