import createError from 'http-errors';
import { getListById } from '../services/lists.mjs';

export const authorizeOwnership = () => ({
    // This function makes sure that event.body.username owns the list commected to event.pathParameters.listId,
    before : async (handler) => {
        const { listId } = handler.event.pathParameters;
        const { username } = handler.event.user;

        const list = await getListById(listId, username);

        if(!list) {
            throw new createError(404, 'List not found');
        }
        console.log('LIST & USERNAME', list);

        if(list.username !== username) {
            throw new createError(403, 'Unauthorized');
        }
    }
});