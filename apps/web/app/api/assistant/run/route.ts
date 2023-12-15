import { NextResponse } from "next/server";

import { runAssistant } from "assistant";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let threadId = formData.get("threadId") as string;
    let assistantId = formData.get("assistantId") as string;
    let instructions = formData.get("instructions") as string;

    if (!assistantId || !threadId || !instructions) {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    let assistant = await runAssistant({
      assistantId,
      threadId,
      instructions,
    });

    return NextResponse.json(assistant);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
