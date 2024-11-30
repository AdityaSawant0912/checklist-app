import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import dbConnect from '@/dbConnect';
import Space from '@/models/Space';
export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    await dbConnect();
    const spaces = await Space.find({ userId: req.auth.id });
    return NextResponse.json({  spaces  }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server not responding.' },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(req) {
  console.log("Herere");
  
  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    await dbConnect();
    const body = await req.json()
    console.log(body);
    
    const space = await Space.create({
      ...body,
      userId: req.auth.id,
    });
    console.log(space);
    
    return NextResponse.json({ success: true, space }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
});
