import { todos } from '../../data/index.mjs';
import { sendResponse } from '../../responses/index.mjs';
import { deleteTodo } from '../../services/todos.mjs';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  await deleteTodo(id);
  return sendResponse(200, { message : 'Todo deleted!'});
};
