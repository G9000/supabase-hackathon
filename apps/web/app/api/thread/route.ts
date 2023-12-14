import { NextResponse, NextRequest } from "next/server";
import { createThread, getThread, deleteThread } from "assistant";

//create new thread
export async function POST() {
  try {
    let newThread = await createThread();

    return NextResponse.json(newThread);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get thread
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return NextResponse.json(
        { message: "threadId is required" },
        { status: 400 }
      );
    }

    let thread = await getThread(threadId);

    return NextResponse.json(thread);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete thread
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const threadId = searchParams.get("threadId");

    if (!threadId) {
      return NextResponse.json(
        { message: "threadId is required" },
        { status: 400 }
      );
    }

    let delThread = await deleteThread(threadId);

    return NextResponse.json(delThread);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
