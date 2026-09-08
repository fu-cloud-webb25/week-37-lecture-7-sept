import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeOwnership } from '../../../middlewares/authorize.mjs';
import { updateTodo } from '../../../services/todos.mjs';

export const handler = middy(async (event) => {
  const { listId, todoId } = event.pathParameters;
  const result = await updateTodo(listId, todoId);
  return sendResponse(200, { message : 'Todo updated successfully', result });
}).use(authenticateUser())
  .use(authorizeOwnership())
  .use(httpErrorHandler());
