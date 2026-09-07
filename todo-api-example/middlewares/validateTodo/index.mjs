import createError from 'http-errors';
import { todoSchema } from '../../models/todoSchema/index.mjs';

export const validateTodoBody = () => ({
    before: handler => {
        const body = handler.event.body;
        const { error, value } = todoSchema.validate(body);
        
        if (error) {
            throw createError(400, error.details[0].message);
        }

        handler.event.body = value;
    } 
});