import { db } from "./db.mjs";
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const getUser = async (username) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const addUser = async (user) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}