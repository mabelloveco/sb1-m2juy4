import React from 'react';
import Stories from './Stories';
import Post from './Post';

const posts = [
  {
    id: 1,
    username: 'porsche_enthusiast',
    userAvatar: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150',
    carMake: 'Porsche',
    carModel: '911 GT3',
    imageUrl: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200',
    likes: 1234,
    caption: 'Nothing beats a Sunday drive in the GT3. The sound of that naturally aspirated flat-six is pure music! 🏁',
    comments: 89,
    location: 'Angeles Crest Highway',
    hashtags: ['porsche', 'gt3', 'flatsix', 'carlife'],
  },
  {
    id: 2,
    username: 'jdm_dreams',
    userAvatar: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=150',
    carMake: 'Nissan',
    carModel: 'Skyline GT-R R34',
    imageUrl: 'https://images.unsplash.com/photo-1607603750909-408e193868c7?w=1200',
    likes: 2651,
    caption: 'Finally got my dream car! R34 in Bayside Blue. Time for some modifications! 🔧',
    comments: 156,
    location: 'Tokyo, Japan',
    hashtags: ['jdm', 'gtr', 'r34', 'skyline', 'nissanpower'],
  },
];

export default function Feed() {
  return (
    <div>
      <Stories />
      <div className="mt-6">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}