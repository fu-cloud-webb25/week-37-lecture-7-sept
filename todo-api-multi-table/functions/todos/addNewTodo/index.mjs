
import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeOwnership } from '../../../middlewares/authorize.mjs';

export const handler = middy(async (event) => {
  return sendResponse(200, { message : 'Hello world!' });
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeOwnership())
  .use(httpErrorHandler());