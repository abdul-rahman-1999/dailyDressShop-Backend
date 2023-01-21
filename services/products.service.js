import { ObjectId} from 'bson';
import { client } from '../index.js';

export async function addProductbyId(data) {
    return await client.db('dailyDress').collection('products').insertMany(data);
}

export async function updateProductbyId(id, data) {
    return await client.db('dailyDress').collection('products').updateOne({ _id : ObjectId(id) }, { $set: data });
}

export async function getProductbyId(id) {
    return await client.db('dailyDress').collection('products').findOne({ _id : ObjectId(id) });
}

export async function DeleteProduct(id) {
    return await client
        .db("dailyDress")
        .collection("products")
        .deleteOne({ _id : ObjectId(id) });
}

export async function getProducts() {
    return await client.db('dailyDress').collection('products').find().toArray();
}