import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { hashPassword } from '../../../utils/bcrypt.mjs';
import { addUser } from '../../../services/users.mjs';

export const handler = middy(async (event) => {
  const newUser = {
    username : event.body.username,
    password : event.body.password
  }
  await addUser(newUser);
  return sendResponse(201, { message : 'User registered!' });
}).use(httpJsonBodyParser())
  .use(httpErrorHandler());
