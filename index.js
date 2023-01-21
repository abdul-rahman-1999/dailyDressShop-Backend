// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
const app = express();
import { MongoClient } from "mongodb";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import cors from 'cors';
import productRouter from './routes/products.route.js'
import userRouter from './routes/users.route.js'


app.use(express.json())
app.use(cors())
app.use("/dailyDress", productRouter)
app.use('/users', userRouter)

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("MongDB connected");


app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});


app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
export {client}
