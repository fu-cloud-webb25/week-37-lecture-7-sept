import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeOwnership } from '../../../middlewares/authorize.mjs';

export const handler = middy(async (event) => {
  return sendResponse(200, { message : 'Hello world!' });
}).use(authenticateUser())
  .use(authorizeOwnership())
  .use(httpErrorHandler());
