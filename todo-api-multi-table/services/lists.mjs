import { db } from './db.mjs';
import { QueryCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const createList = async (list) => {
    try {
        const command = new PutCommand({
            TableName : 'todo-lists',
            Item : list
        }); 
        await db.send(command);

    return true;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const getLists = async (username) => {
    try {
        const command = new QueryCommand({
            TableName : 'todo-lists',
            KeyConditionExpression : 'username'
        });
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const getListById = async (listId, username) => {
    try {
        const command = new GetCommand({
            TableName : 'todo-lists',
            Key : {
                username : username,
                listId : listId
            }
        });

        const {Item} = await db.send(command);
        return Item;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}