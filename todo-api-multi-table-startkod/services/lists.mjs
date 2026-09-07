import { db } from './db.mjs';
import { QueryCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const createList = async (list) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const getLists = async (username) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}

export const getListById = async (listId, username) => {
    try {
        
    } catch(error) {
        console.log('ERROR:', error);
        throw createError(500, error.message);
    }
}