import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { sendResponse } from '../../../responses/index.mjs';
import { getUser } from '../../../services/users.mjs';
import { comparePassword } from '../../../utils/bcrypt.mjs';
import { signToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
  const { username, password} = event.body;
  const user = await getUser(username);
  if(!user || user.password !== password) {
    return sendResponse(400, {
      message : 'Username or password are incorrect'
    });
  }

  return sendResponse(200, {
    message : 'Login successfull',
    token : signToken({ username : user.username })
  });
}).use(httpJsonBodyParser())
  .use(httpErrorHandler());
