const express = require('express') //express.js 
const path = require('path')
const bodyParser = require ('body-parser') //parser
const app = express() //app using express
const port = process.env.PORT || 5000
const knex = require('./depan/js/database')
const db = knex

let initialPath = path.join(__dirname, './depan/') //path ke web

app.use(bodyParser.json())
app.use(express.static(initialPath, {index: 'login.html'})) //default open login html
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(initialPath, 'login.html'));

}) //default link
app.get('/login', (req, res) => {
    res.status(200).sendFile(path.join(initialPath, 'login.html'))
}) //link to login
app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(initialPath, 'signup.html'))
}) //link to signup
app.get('/dashboard', (req, res) => {
    res.status(200).sendFile(path.join(initialPath, 'dashboard.html'))
})
app.post('/register-user', (req,res) => {
    const {name, merchant, email, password, rptpassword} = req.body
    
    if(!name.length || !email.length || !merchant.length || !password.length || !rptpassword.length) {
        res.json('fill all the fields')
    } else if (!rptpassword.match(password) ){
        res.json('password not match')
    } else {
        db("users").insert({
            name: name,
            merchant: merchant,
            email: email,
            password: password
        })
        .returning(["name","merchant","email","password"])
        .then(data => {
            res.json(data[0])
        })
        .catch((err) => {
            if(err.detail != undefined && err.detail.includes('already exists')) {
                res.json('email already exists')
            }
        })
    }
})
app.post('/login-user', (req,res) => {
    const {email,password} = req.body
    db.select('email','password')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data => {
        if(data.length){
            res.json(data[0])
        } else {
            res.json('email or password incorrect')
        }
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
