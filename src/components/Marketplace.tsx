import React from 'react';
import { Filter, DollarSign } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: '2020 BMW M2 Competition',
    price: 58000,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800',
    location: 'Los Angeles, CA',
    mileage: '15,000',
    seller: 'bmw_enthusiast',
    condition: 'Excellent',
  },
  {
    id: 2,
    title: 'Authentic JDM Parts Bundle',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1600706432502-77a0e2e32795?w=800',
    location: 'Seattle, WA',
    condition: 'New',
    seller: 'jdm_parts_usa',
  },
];

export default function Marketplace() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Marketplace</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{listing.title}</h3>
                <div className="flex items-center text-green-600 font-bold">
                  <DollarSign className="h-5 w-5" />
                  {listing.price.toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                <p>{listing.location}</p>
                {listing.mileage && <p>Mileage: {listing.mileage}</p>}
                <p>Condition: {listing.condition}</p>
                <p>Seller: {listing.seller}</p>
              </div>
              <button className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                Contact Seller
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}