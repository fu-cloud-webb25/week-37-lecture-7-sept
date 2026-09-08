import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { getLists } from '../../../services/lists.mjs';
import { getTodosByListId } from '../../../services/todos.mjs';

export const handler = middy(async (event) => {
  const lists = await getLists(event.user.username);
  if(lists.length > 0) {
    for(const list of lists) {
      list.todos = await getTodosByListId(list.listId);
    }
    return sendResponse(200, { lists });
  } else {
    return sendResponse(404, { message : 'No lists found!' });

  }
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(httpErrorHandler());
