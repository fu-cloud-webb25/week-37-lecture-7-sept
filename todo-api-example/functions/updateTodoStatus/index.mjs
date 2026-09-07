import { todos } from '../../data/index.mjs';
import { sendResponse } from '../../responses/index.mjs';
import { updateTodo } from '../../services/todos.mjs';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  await updateTodo(id);

  return sendResponse(200, {
    message : 'Todo status updated!'
  });
};
