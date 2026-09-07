import createError from 'http-errors';
import { verifyToken } from '../utils/jwt.mjs';

export const authenticateUser = () => ({
    before : (handler) => {
        const { authorization } = handler.event.headers;

        if(!authorization) {
            throw new createError(401, 'Missing authorization header');
        }

        const token = authorization.split(' ')[1];
        
        const verified = verifyToken(token);
        handler.event.user = verified;
    }
})