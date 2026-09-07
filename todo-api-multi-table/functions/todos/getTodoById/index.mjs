import { sendResponse } from '../../../responses/index.mjs';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';

export const handler = middy(async (event) => {
  return sendResponse(200, { message : 'Hello world!' });
}).use(httpErrorHandler());
