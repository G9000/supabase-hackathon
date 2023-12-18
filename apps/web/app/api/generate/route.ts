import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("propmpt", prompt);

  // const response = await openai.chat.completions.create({
  //   model: "gpt-3.5-turbo-0613",
  //   stream: true,
  //   messages: [
  //     {
  //       role: "user",
  //       content: `${prompt}. Given this information, can you write a short paragraph user profile summary for this person? You are not required to give any explanatino or whatsoever. Avoid writting too much.`,
  //     },
  //   ],
  // });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const stream = OpenAIStream(response);
  console.log(response);

  return new StreamingTextResponse(stream);
}
