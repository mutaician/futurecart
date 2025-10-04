'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:-translate-y-1">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </div>
        )}

        {/* Image Container */}
        <Link href={`/product/${product._id}`}>
          <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden cursor-pointer">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
          </div>
        </Link>

        {/* Content */}
        <div className="p-6">
          <Link href={`/product/${product._id}`}>
            {/* Category */}
            <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
              {product.category}
            </p>

            {/* Product Name */}
            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
              {product.name}
            </h3>

            {/* Description */}
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Price and Stock */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  KSh {product.price.toLocaleString()}
                </span>
              </div>
              <div className="text-emerald-400 text-xs font-medium">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            </div>
          </Link>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
          </button>

          {/* Success Message */}
          {showSuccess && (
            <div className="mt-2 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-3 py-2 rounded text-center text-sm font-medium animate-pulse">
              ✓ Added to cart!
            </div>
          )}
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
        </div>
    </div>
  );
}

