import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { createList } from '../../../services/lists.mjs';

export const handler = middy(async (event) => {
  const list = {
    username : event.user.username,
    listId : crypto.randomUUID().slice(0, 5),
    name : event.body.name
  }
  await createList(list);
  return sendResponse(201, { message : 'List created!' });
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(httpErrorHandler());
