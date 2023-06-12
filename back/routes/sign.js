const express=require('express')
const route=express();
const order=require('../payment/payment')
const signController=require('../controller/sign');
route.post('/signup',signController.signUpController);
route.post('/signin',signController.signinController);
route.get('/signin',signController.loginController);
route.post('/create/order',order.createOrder)
route.post("/api/payment/verify",order.orderVerify)
module.exports=route;