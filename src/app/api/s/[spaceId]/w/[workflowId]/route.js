import dbConnect from '@/dbConnect';
import WorkflowTemplate from '@/models/WorkflowTemplate';
import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  return Response.json({ message: 'Hello World' });
}

export const POST = auth(async function POST(req, { params }) {
  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    const { spaceId, workflowId } = await params;
    const {
      _id,
      spaceId: workflowSpaceId,
      name,
      description,
      favorite,
    } = await req.json();
    if (spaceId !== workflowSpaceId || _id !== workflowId) {
      return NextResponse.json(
        { success: false, message: "Payload Ids doesn't match with query Ids" },
        { status: 304 }
      );
    }
    await dbConnect();
    const workflowTemplate = await WorkflowTemplate.findOneAndUpdate(
      { _id, userId: req.auth.id, spaceId: workflowSpaceId },
      { name, description, favorite },
      { new: true }
    );
    console.log(workflowTemplate);
    return NextResponse.json(
      { success: true, workflowTemplate },
      { status: 201 }
    );
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
    const awaitedParams = await params;
    const { spaceId, workflowId } = await params;

    await dbConnect();
    const workflowTemplate = await WorkflowTemplate.findOneAndDelete({
      _id: workflowId,
      userId: req.auth.id,
      spaceId,
    });
    console.log(workflowTemplate);
    return NextResponse.json(
      { success: true, workflowTemplate },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
});
