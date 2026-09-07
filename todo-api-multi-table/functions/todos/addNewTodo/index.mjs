
import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeOwnership } from '../../../middlewares/authorize.mjs';
import { addTodo } from '../../../services/todos.mjs';

export const handler = middy(async (event) => {
  const { listId } = event.pathParameters;
  const todo = {
    listId : listId,
    todoId : crypto.randomUUID().slice(0, 5),
    task : event.body.task,
    done : false
  };

  await addTodo(todo);
  return sendResponse(200, {
    message : 'New todo created',
    todo
  });
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeOwnership())
  .use(httpErrorHandler());