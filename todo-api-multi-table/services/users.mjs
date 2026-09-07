import { db } from "./db.mjs";
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const getUser = async (username) => {
    try {
        const command = new GetCommand({
            TableName : 'todo-users',
            Key : {
                username : username
            }
        });

        const { Item } = await db.send(command);
        return Item;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const addUser = async (user) => {
    try {
        const command = new PutCommand({
            TableName : 'todo-users',
            Item : user
        });

        await db.send(command);
        return true;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}