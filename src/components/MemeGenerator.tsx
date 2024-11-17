import React, { useState, useRef } from 'react';
import { Download, RefreshCw, Type } from 'lucide-react';
import { toPng } from 'html-to-image';

const memeTemplates = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800',
    name: 'Disappointed Mechanic',
    topText: 'When someone says',
    bottomText: '"It\'s just a car"',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800',
    name: 'Proud Car Owner',
    topText: 'Finally got my dream car',
    bottomText: '*Check engine light comes on*',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    name: 'Luxury Problems',
    topText: 'When someone asks',
    bottomText: '"But does it have cupholders?"',
  },
];

export default function MemeGenerator() {
  const [currentMeme, setCurrentMeme] = useState(memeTemplates[0]);
  const [topText, setTopText] = useState(currentMeme.topText);
  const [bottomText, setBottomText] = useState(currentMeme.bottomText);
  const memeRef = useRef<HTMLDivElement>(null);

  const getRandomMeme = () => {
    const randomIndex = Math.floor(Math.random() * memeTemplates.length);
    const newMeme = memeTemplates[randomIndex];
    setCurrentMeme(newMeme);
    setTopText(newMeme.topText);
    setBottomText(newMeme.bottomText);
  };

  const downloadMeme = async () => {
    if (memeRef.current) {
      try {
        const dataUrl = await toPng(memeRef.current, { quality: 0.95 });
        const link = document.createElement('a');
        link.download = 'car-meme.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Error generating meme:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Car Meme Generator</h2>
      </div>

      <div className="p-6">
        <div 
          ref={memeRef}
          className="relative w-full aspect-square max-w-2xl mx-auto overflow-hidden rounded-lg"
        >
          <img
            src={currentMeme.url}
            alt={currentMeme.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between p-6 text-white">
            <h2 className="text-4xl font-bold text-center uppercase text-stroke">
              {topText}
            </h2>
            <h2 className="text-4xl font-bold text-center uppercase text-stroke">
              {bottomText}
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top Text
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter top text"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bottom Text
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter bottom text"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={getRandomMeme}
              className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              <RefreshCw className="h-5 w-5" />
              <span>Random Template</span>
            </button>
            <button
              onClick={downloadMeme}
              className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              <Download className="h-5 w-5" />
              <span>Download Meme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}