import { client } from '../index.js';


export async function CreateUser(data) {
    return await client.db('dailyDress').collection('users').insertOne(data);
}

export async function getUserByName(email) {
    return await client.db('dailyDress').collection('users').findOne({email:email});
}

export async function getUserByEmail(email) {
    return await client.db('b39wd').collection('user').findOne({email:email});
}
