'use client';

import Image from 'next/image';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="max-w-[1280px] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow-sm">
              <Image src={item.image} alt={item.name} width={200} height={200} className="object-cover" />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-700">${item.price.toFixed(2)}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="mt-2 text-sm text-red-600 underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
