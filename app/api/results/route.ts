import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const results = await db.getResults();
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Simple Grade Calculation Logic based on Marks
    let grade = 'F';
    if (body.marks >= 90) grade = 'A+';
    else if (body.marks >= 80) grade = 'A';
    else if (body.marks >= 70) grade = 'B';
    else if (body.marks >= 60) grade = 'C';
    else if (body.marks >= 50) grade = 'D';

    const newResult = await db.createResult({ ...body, grade });
    return NextResponse.json(newResult, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record result' }, { status: 500 });
  }
}
