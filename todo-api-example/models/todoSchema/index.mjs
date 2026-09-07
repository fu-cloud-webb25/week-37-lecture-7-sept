import Joi from 'joi';

export const todoSchema = Joi.object({
    task : Joi.string().required()
});