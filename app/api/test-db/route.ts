import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ 
      success: true, 
      message: '✅ MongoDB connection successful!' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: '❌ MongoDB connection failed', 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

