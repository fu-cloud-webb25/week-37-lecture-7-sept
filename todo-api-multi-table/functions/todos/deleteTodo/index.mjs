import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeOwnership } from '../../../middlewares/authorize.mjs';
import { deleteTodo } from '../../../services/todos.mjs';

export const handler = middy(async (event) => {
  const { listId, todoId } = event.pathParameters;
  await deleteTodo(listId, todoId);
  return sendResponse(200, { message : 'Todo deleted successfully!' });
}).use(authenticateUser())
  .use(authorizeOwnership())
  .use(httpErrorHandler());
