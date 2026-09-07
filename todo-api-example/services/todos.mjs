import { db } from './db.mjs';
import {
    ScanCommand,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors'; 

export const getTodos = async () => {
    try {
        const command = new ScanCommand({
            TableName : 'todo-todos'
        });

        const { Items } = await db.send(command);
        return Items;
    } catch(error) {
        throw createError(500, error.message);
    }
}

export const getTodoById = async (id) => {
    try {
        const command = new GetCommand({
            TableName : 'todo-todos',
            Key : {
                id : id
            }
        });

        const { Item } = await db.send(command);
        return Item;
    } catch(error) {
        throw createError(500, error.message);
    }
}

export const addTodo = async (todo) => {
    try {
        const command = new PutCommand({
            TableName : 'todo-todos',
            Item : todo
        });

        await db.send(command);
        return true;
    } catch(error) {
        throw createError(500, error.message);
    }
}

export const updateTodo = async (id) => {
    try {
        const todo = await getTodoById(id);
        const command = new UpdateCommand({
            TableName : 'todo-todos',
            Key : {
                id : id
            },
            UpdateExpression : 'SET done = :done',
            ExpressionAttributeValues : {
                ':done' : !todo.done
            },
            ReturnValues : 'ALL_NEW'
        });

        await db.send(command);
        return true;
    } catch(error) {
        throw createError(500, error.message);
    }
}

export const deleteTodo = async (id) => {
    try {
        const command = new DeleteCommand({
            TableName : 'todo-todos',
            Key : {
                id : id
            }
        });

        await db.send(command);
    } catch(error) {
        throw createError(500, error.message);
    }
}