import { NextResponse, NextRequest } from "next/server";
import { createMessage, getMessages } from "assistant";

//create new messag
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    let threadId = formData.get("threadId") as string;
    let content = formData.get("content") as string;

    if (!threadId || !content) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    let newMessage = await createMessage({ threadId, content });

    return NextResponse.json({ message: newMessage });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

//get all message using thread id
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("threadId");

    //error if missing
    if (!query) {
      return NextResponse.json({ error: "Missing Query" }, { status: 400 });
    }

    let messages = await getMessages(query);

    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
