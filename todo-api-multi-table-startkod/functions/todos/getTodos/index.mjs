import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { getTodos } from '../../../services/todos.mjs';

export const handler = middy(async (event) => {
  const result = await getTodos();
  if(result.length > 0) {
    return sendResponse(200, { todos : result });
  } else {
    return sendResponse(404, { message : 'No todos found' });
  }
}).use(httpErrorHandler());
