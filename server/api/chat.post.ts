import { createChatChain } from '~/utils/chat/chain';

export default defineEventHandler(async (event) => {
  const { message, history } = await readBody(event);
  
  const chain = createChatChain();
  const response = await chain.call({
    input: message,
    history: history || [],
  });

  return {
    raw: response.text,
    messages: parseResponse(response.text),
  };
});