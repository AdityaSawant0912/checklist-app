import dbConnect from '@/dbConnect';
import Space from '@/models/Space';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    const { spaceId } = await params;
    await dbConnect();
    const space = await Space.find({ _id: spaceId, userId: req.auth.id });
    return NextResponse.json({ success: true, space }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
});
export const POST = auth(async function POST(req, { params }) {
  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    const { spaceId } = await params;
    const { _id, name, description, visibility } = await req.json();
    if (spaceId !== _id) {
      return NextResponse.json(
        { success: false, message: "Payload Id doesn't match with query Id" },
        { status: 304 }
      );
    }
    await dbConnect();
    const space = await Space.findOneAndUpdate(
      { _id, userId: req.auth.id },
      { name, description, visibility },
      { new: true }
    );
    console.log(space);
    return NextResponse.json({ success: true, space }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
});
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
