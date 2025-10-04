import Link from 'next/link';
import Image from 'next/image';

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
  return (
    <Link href={`/product/${product._id}`}>
      <div className="group relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,217,255,0.3)] hover:-translate-y-1">
        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6">
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
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ${product.price.toLocaleString()}
              </span>
            </div>
            <div className="text-emerald-400 text-xs font-medium">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
        </div>
      </div>
    </Link>
  );
}

