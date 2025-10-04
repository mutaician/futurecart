import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { seedProducts } from '@/lib/seed-data';

export async function POST() {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert seed products
    const products = await Product.insertMany(seedProducts);
    console.log(`✅ Seeded ${products.length} products`);

    return NextResponse.json({
      success: true,
      message: `✅ Successfully seeded ${products.length} products!`,
      products: products.map(p => ({ id: p._id, name: p.name })),
    });
  } catch (error) {
    console.error('❌ Seed error:', error);
    return NextResponse.json(
      {
        success: false,
        message: '❌ Failed to seed database',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const count = await Product.countDocuments();
    const products = await Product.find({}).select('name category price');

    return NextResponse.json({
      success: true,
      count,
      products,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: '❌ Failed to fetch products',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

