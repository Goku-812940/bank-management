// import cors
const cors=require('cors')

// import dataService

const dataService = require('./service/dataService')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// import express
const express = require('express')

// create app
const app = express()

// connect frontend
app.use(cors({origin:'http://localhost:4200'}))

// to convert json data to js
app.use(express.json())

// middleware creation for verify token

const jwtmiddleware = (req, res, next) => {
    console.log('router specific');
    try {
        const token = req.headers['access-token']
        const data = jwt.verify(token, "secretkey")
        console.log(data);
        next()
    }
    catch {
        res.status(422).json({
            statuscode: 422,
            status: false,
            massage: "please login"
        })
    }
}

// request

// register

app.post('/register' , (req , res)=>{

    dataService.register(req.body.acno , req.body.uname , req.body.psw).then(result=>{
     res.status(result.statusCode).json(result)
   })
    
    })
// login

app.post('/login', (req, res) => {

    dataService.login(req.body.acno, req.body.psw).then(result=>{
        res.status(result.statuscode).json(result)
    })
   
})
// deposite

app.post('/Deposit', jwtmiddleware, (req, res) => {

    dataService.Deposit(req.body.acno, req.body.psw, req.body.amount).then(result=>{
        res.status(result.statuscode).json(result)

    })

})
// withdraw

app.post('/Withdraw', jwtmiddleware, (req, res) => {

    dataService.Withdraw(req.body.acno, req.body.psw, req.body.amount).then(result=>{
        res.status(result.statuscode).json(result)

    })

})
// transaction
app.post('/gettransaction', jwtmiddleware, (req, res) => {

    dataService.gettransaction(req.body.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
   

})

// delete
app.delete('/deleteac/:acno',jwtmiddleware,(req,res)=>{
    dataService.acdelete(req.params.acno).then(result=>{
        res.status(result.statuscode).json(result)
    })
})

// // GET
// app.get('/',(req,res)=>{
//     res.send('Get Method checking.............')
// })

// // post
// app.post('/register',(req,res)=>{
//     res.send('post Method checking.............')
// })    

// // put
// app.put('/',(req,res)=>{
//     res.send('put Method checking.............')
// })  
// // patch
// app.patch('/',(req,res)=>{
//     res.send('patch Method checking.............')
// })  
//  // delete
//  app.delete('/',(req,res)=>{
//     res.send('delete Method checking.............')
// }) 

// set port
app.listen(3000, () => {
    console.log('server started at port number 3000');
})
