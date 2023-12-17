import OpenAI from "openai";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

const assistantID = "asst_Mcer6SJdRZ1vgC0kpGh4d0Rd";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: prompt,
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantID,
    });

    let checkStatus;
    do {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Polling interval
      checkStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    } while (checkStatus.status !== "completed");

    if (checkStatus.status === "completed") {
      const messages = await openai.beta.threads.messages.list(thread.id);
      return NextResponse.json(messages.data[0].content[0].text.value);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
