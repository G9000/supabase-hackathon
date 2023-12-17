import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

const assistantID = "asst_Mcer6SJdRZ1vgC0kpGh4d0Rd";

export async function POST(req: Request) {
  console.log("are we here");
  //   const { prompt } = await req.json();

  try {
    console.log("are we here");
    const thread = await openai.beta.threads.create();

    const test =
      "This person enjoys curry rice, spring onion, and noodles but dislikes ginger and spicy food. They have allergies to peanuts and shellfish and prefer a kosher diet. They enjoy Asian, Mexican, and Italian cuisines and plan their meals for every 3 days with a budget of 200 MYR.";

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: test,
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
      return NextResponse.json(messages);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
