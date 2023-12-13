import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Creat assistant
export const createAssistant = async ({
  name,
  instructions,
  model,
}: {
  name: string;
  instructions: string;
  model?: string;
}) => {
  const assistant = await openai.beta.assistants.create({
    name: name,
    instructions: instructions,
    model: model || "gpt-3.5-turbo",
  });

  return assistant;
};

// Run assistant
export const runAssistant = async ({
  assistantId,
  threadId,
  instructions,
}: {
  assistantId: string;
  threadId: string;
  instructions: string;
}) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions: instructions,
  });
  return run;
};

// Get assistant
export const getAssistant = async (assistantId: string) => {
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  return assistant;
};

// Delete assistant
export const deleteAssistant = async (assistantId: string) => {
  const response = await openai.beta.assistants.del(assistantId);
  return response;
};

// Check run thread
export const runCheck = async ({
  threadId,
  runId,
}: {
  threadId: string;
  runId: string;
}) => {
  const check = await openai.beta.threads.runs.retrieve(threadId, runId);
  return check;
};

// Create thread
export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

// Get thread
export const getThread = async (threadId: string) => {
  const thread = await openai.beta.threads.retrieve(threadId);
  return thread;
};

// Delete thread
export const deleteThread = async (threadId: string) => {
  const response = await openai.beta.threads.del(threadId);
  return response;
};

// Create message
export const createMessage = async ({
  threadId,
  content,
}: {
  threadId: string;
  content: string;
}) => {
  const messages = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });
  return messages;
};

// Get message
export const getMessages = async (threadId: string) => {
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages;
};
