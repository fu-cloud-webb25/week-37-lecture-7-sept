import { sendResponse } from '../../responses/index.mjs';
import { getTodos } from '../../services/todos.mjs';

export const handler = async (event) => {
  const result = await getTodos();
  return sendResponse(200, { todos : result });
};
