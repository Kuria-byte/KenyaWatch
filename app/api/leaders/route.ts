import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Leader } from '@/types/leaders';

export async function GET() {
  try {
    // Get the absolute path to the JSON file
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'leaders', 'leaders.json');
    
    // Read the JSON file
    const jsonData = await fs.readFile(jsonPath, 'utf-8');
    const leaders: Leader[] = JSON.parse(jsonData);

    return NextResponse.json({ leaders });
  } catch (error) {
    console.error('Error reading leaders data:', error);
    return NextResponse.json(
      { error: 'Failed to load leaders data' },
      { status: 500 }
    );
  }
}
