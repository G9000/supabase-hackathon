import { NextResponse } from "next/server";
import { runCheck } from "assistant";

//run the assistant
export async function POST(request: Request) {
  try {
    let { runId, threadId } = await request.json();
    console.log("threadId", threadId);
    if (!runId || !threadId) {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    let assistant = await runCheck({
      runId,
      threadId,
    });

    return NextResponse.json(assistant);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
