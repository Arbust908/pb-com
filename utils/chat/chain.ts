import { chatPrompt } from "./prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
// Or for local models:
// import { ChatAnthropic } from "langchain/chat_models/anthropic";

export const createChatChain = () => {
  const llm = new ChatOpenAI({
    temperature: 0.7,
    streaming: true, // For real-time updates
  });

  return new LLMChain({
    llm,
    prompt: chatPrompt,
    memory: new BufferMemory({
      returnMessages: true,
      memoryKey: "history",
      inputKey: "input",
    }),
  });
};