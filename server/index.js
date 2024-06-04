const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors({
    //origin: ["https://workout-website-eight.vercel.app"],
    origin: true,
    methods: ["POST", "GET"],
    credentials: true
}));
app.options('/*', (_, res) => {
    res.sendStatus(200);
});
app.use(express.json());

mongoose.connect("mongodb+srv://colindude4355:WoQue1OzH10JX8cW@cluster0.wozz0qt.mongodb.net/workout?retryWrites=true&w=majority")

app.get('/', (req, res) => {
    res.json("Server Home");
})

//individual get api
app.get("/getUser/:id", (req, res) => {

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }

    const id = req.params.id;

    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//put api
app.put("/updateUser/:id", (req, res) => {

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }

    const id = req.params.id;

    UserModel.findByIdAndUpdate({_id:id}, {username: req.body.username, email: req.body.email, password: req.body.password})
    .then(users => res.json(res))
    .catch(err => res.json(err))
})

//register api
app.post("/createUser", (req, res) => {

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }

    const {username, email, password} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("That email already has an account")
        }
        else{
            UserModel.create({username: username, email: email, password: password})
            .then(result => res.json("Account created"))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})

//login api
app.post("/login", (req, res) => {

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }

    const {email, password} = req.body
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("Incorrect Password");
            }
        }
        else{
            res.json("No account registered with that email")
        }
    })
})

//delete api
app.delete("/deleteUser/:id", (req, res) => {

    if(req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }

    const id = req.params.id;

    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})
