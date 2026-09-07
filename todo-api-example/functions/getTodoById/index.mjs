import { sendResponse } from '../../responses/index.mjs';
import { getTodoById } from '../../services/todos.mjs';

export const handler = async (event) => {
  const { id } = event.pathParameters;
  const todo = await getTodoById(id);

  if(todo) {
    return sendResponse(200, {
      success : true,
      todo
    });
    
  } else {
    return sendResponse(404, { 
      success : false,
      message : 'No todo with corresponding id found!'
    });
  }
};
