import express from 'express'
import {auth} from "../middleware/auth.js"
import nodemailer from "nodemailer"
import {
    getProducts,
    getProductbyId,
    updateProductbyId,
    addProductbyId,
    DeleteProduct,
} from '../services/products.service.js'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const router = express.Router()


const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
    pass:process.env.PASSWORD,
  }
})


router.get('/products', auth, async function(request,response){
    const result = await getProducts()
     response.send(result);
   })

   router.get('/products/:id', auth, async function(request,response){
    const {id} = request.params;
    const result = await getProductbyId(id)
     response.send(result);
   })

   router.put('/products/:id', async function(request,response){
    const {id} = request.params;
    const data = request.body;
    const result = await updateProductbyId(id, data)
     response.send(result);
   })

router.post("/add/products", async function(request,response){
const data = request.body
const result = await addProductbyId(data)
response.send(result)
})

router.post("/products/send/", auth, async function(request,response){
  const { email, name, quantity, total} = request.body
  const mailOptions = {
    from:process.env.EMAIL,
    to:email,
    subject:"Sending Mail Regarding Tickets",
    text:`
    Hi ${name},
    You Ordered Some Items from Our Shop and Your Quantity is ${quantity} and the Total is ${total} Payment is Successfull and Your Delivery expected in 03/03/2023`
   }
   
   transporter.sendMail(mailOptions,(error,info) => {
    if(error){
      console.log("error",error)
    }else{
      console.log('Email Sent Successfully', info.response)
      response.status(201).json({status:201,info})
    }
   })

  })

router.delete("/products/:id", async function (request, response) {
  const { id } = request.params;
  const result = await DeleteProduct(id);
  console.log(result);
  result.deletedCount > 0 ? response.send({msg:'Movie was deleted successfully'}) : response.status(404).send({ msg: "MovieNot Found" });
});


export default router