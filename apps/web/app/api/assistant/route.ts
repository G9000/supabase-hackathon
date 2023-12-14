import { type NextRequest, NextResponse } from "next/server";
import {
  createAssistant,
  getAssistant,
  deleteAssistant,
} from "assistant/assistant";

// Hanlde creation of assistant or assistnt with files id
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const instructions = formData.get("instructions") as string;

    if (!name || !instructions) {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    const newAssistant = await createAssistant({ name, instructions });

    return NextResponse.json({ newAssistant });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Get assistant
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const assistantId = request.nextUrl.searchParams.get("assistantId");

    console.log("assistantId", assistantId);
    if (!assistantId) {
      return NextResponse.json({ error: "Missing Query" }, { status: 400 });
    }

    const assistant = await getAssistant(assistantId);

    return NextResponse.json({ assistant });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// Delete assistant
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const assistantId = searchParams.get("assistantId");

    if (!assistantId) {
      return NextResponse.json({ error: "Missing Query" }, { status: 400 });
    }
    const delAssistant = await deleteAssistant(assistantId);

    return NextResponse.json({ delAssistant });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
