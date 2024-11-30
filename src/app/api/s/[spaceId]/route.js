import dbConnect from '@/dbConnect';
import Space from '@/models/Space';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  return Response.json({ message: 'Hello World' });
}

export const DELETE = auth(async function DELETE(req, { params }) {
  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    const { spaceId } = await params;
    await dbConnect();
    const space = await Space.findByIdAndDelete(spaceId);
    return NextResponse.json({ success: true, space }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
});
