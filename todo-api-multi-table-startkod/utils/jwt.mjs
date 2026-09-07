import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export const signToken = (payload) => {
    const token = jwt.sign(payload, 'jesper', { expiresIn: '1h' });
    return token;
}

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, 'jesper');
        return decoded;
    } catch (error) {
        throw createError(401, 'Invalid token');
    }
}