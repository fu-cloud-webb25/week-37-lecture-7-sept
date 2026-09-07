import { 
    QueryCommand,
    ScanCommand, 
    GetCommand, 
    PutCommand, 
    UpdateCommand, 
    DeleteCommand 
} from '@aws-sdk/lib-dynamodb';
import { db } from './db.mjs';
import createError from 'http-errors';

export const getTodos = async () => {
    try {
        const command = new ScanCommand({ TableName : 'todo-todos' });
        const { Items } = await db.send(command);
        return Items;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const getTodosByListId = async (listId) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const getTodo = async (listId, id) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const addTodo = async (todo) => {
    try {
        const command = new PutCommand({ 
            TableName : 'todo-todos', 
            Item : todo 
        });
        console.log(todo);

        await db.send(command);
        return true;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const updateTodo = async (listId, id) => {
    try {
        const todo = await getTodo(listId, id);
        if(!todo) {
            return false;
        }
        const command = new UpdateCommand({
            TableName : 'todo-todos',
            Key : { 
                listId : listId, 
                id : id 
            },
            UpdateExpression : 'SET done = :done',
            ExpressionAttributeValues : {
                ':done' : !todo.done
            },
            ReturnValues : 'ALL_NEW'
        });
        const result = await db.send(command);
        return result.Attributes;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const deleteTodo = async (listId, id) => {
    try {
        const command = new DeleteCommand({
            TableName : 'todo-todos',
            Key : { 
                listId : listId, 
                id : id 
            }
        });
        await db.send(command);
        return true;
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}