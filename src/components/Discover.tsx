import React, { useState } from 'react';
import { Search, TrendingUp, Users, Hash } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'user' | 'hashtag' | 'post';
  image?: string;
  title: string;
  subtitle?: string;
  stats?: string;
}

const trendingPosts = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800',
    likes: 15420,
    comments: 324,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=800',
    likes: 12350,
    comments: 256,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800',
    likes: 9870,
    comments: 189,
  },
];

const suggestedAccounts = [
  {
    id: '1',
    username: 'porsche_enthusiast',
    name: 'Alex Thompson',
    avatar: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150',
    followers: '15.2K',
  },
  {
    id: '2',
    username: 'jdm_culture',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=150',
    followers: '12.8K',
  },
];

const popularHashtags = [
  { id: '1', tag: 'carlife', posts: '1.2M' },
  { id: '2', tag: 'jdm', posts: '856K' },
  { id: '3', tag: 'supercar', posts: '654K' },
];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setIsSearching(true);
      // Simulate search results
      const results: SearchResult[] = [
        ...suggestedAccounts.map(account => ({
          id: account.id,
          type: 'user' as const,
          image: account.avatar,
          title: account.username,
          subtitle: account.name,
          stats: `${account.followers} followers`,
        })),
        ...popularHashtags.map(tag => ({
          id: tag.id,
          type: 'hashtag' as const,
          title: `#${tag.tag}`,
          stats: `${tag.posts} posts`,
        })),
      ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        (result.subtitle?.toLowerCase().includes(query.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {isSearching ? (
        // Search Results
        <div className="bg-white rounded-xl shadow-sm">
          {searchResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
            >
              {result.type === 'user' && (
                <>
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{result.title}</p>
                    <p className="text-sm text-gray-500">{result.subtitle}</p>
                    <p className="text-xs text-gray-400">{result.stats}</p>
                  </div>
                </>
              )}
              {result.type === 'hashtag' && (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Hash className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{result.title}</p>
                    <p className="text-sm text-gray-500">{result.stats}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Default Discover View
        <>
          {/* Trending Posts */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-bold">Trending Posts</h2>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {trendingPosts.map((post) => (
                <div key={post.id} className="aspect-square relative group cursor-pointer">
                  <img
                    src={post.image}
                    alt="Trending post"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <div className="hidden group-hover:flex items-center space-x-4 text-white font-semibold">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Suggested Accounts */}
          <section className="mb-8">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-bold">Suggested Accounts</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {suggestedAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <img
                      src={account.avatar}
                      alt={account.username}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="font-semibold">{account.username}</p>
                      <p className="text-sm text-gray-500">{account.name}</p>
                      <p className="text-xs text-gray-400">{account.followers} followers</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Hashtags */}
          <section>
            <div className="flex items-center mb-4">
              <Hash className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-bold">Popular Hashtags</h2>
            </div>
            <div className="bg-white rounded-xl shadow-sm divide-y">
              {popularHashtags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Hash className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">#{tag.tag}</p>
                      <p className="text-sm text-gray-500">{tag.posts} posts</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}