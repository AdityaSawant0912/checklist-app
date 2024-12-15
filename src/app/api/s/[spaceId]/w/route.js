import dbConnect from '@/dbConnect';
import WorkflowTemplate from '@/models/WorkflowTemplate';
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
    if(spaceId == undefined) throw new Error("URL parameter spaceId was not provided");
    await dbConnect();
    const workflowTemplates = await WorkflowTemplate.find({
      spaceId,
      userId: req.auth.id,
    });
    return NextResponse.json({ success: true, workflowTemplates }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
});

export const POST = auth(async function POST(req,  { params }) {

  if (!req.auth)
    return NextResponse.json(
      { message: 'Not authenticated.' },
      { status: 401 }
    );
  try {
    const body = await req.json();
    const { spaceId } = await params;
    if(!spaceId) throw new Error("URL parameter spaceId was not provided");
    await dbConnect();
    
    console.log(body);
    const workflowTemplate = await WorkflowTemplate.create({
      ...body,
      spaceId,
      userId: req.auth.id,
    });
    console.log(workflowTemplate);

    return NextResponse.json({ success: true, workflowTemplate }, { status: 201 });
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
});
