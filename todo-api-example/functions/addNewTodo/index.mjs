import { todos } from '../../data/index.mjs';
import { sendResponse } from '../../responses/index.mjs';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpErrorHandler from '@middy/http-error-handler';
import { validateTodoBody } from '../../middlewares/validateTodo/index.mjs';
import { addTodo } from '../../services/todos.mjs';


export const handler = middy(async (event) => {
  const todo = event.body;
  const newTodo = {
    id :crypto.randomUUID().slice(0, 5),
    task : todo.task,
    done : false
  };

  await addTodo(newTodo);

  return sendResponse(200, {
    success : true,
    message : 'New todo added successfully',
    todo : newTodo
  });
}).use(httpJsonBodyParser())
  .use(validateTodoBody())
  .use(httpErrorHandler());