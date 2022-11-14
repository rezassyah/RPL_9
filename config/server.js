const express = require('express') //express.js 
const path = require('path')
const bodyParser = require('body-parser') //parser
const app = express() //app using express
const port = process.env.PORT || 5500
const knex = require('../src/js/database.js')
const db = knex

let initialPath = path.join(__dirname, '../src/') //path ke web

app.use(bodyParser.json())
app.use(express.static(initialPath, { index: 'login.html' })) //default open login html

app.get('/', (req, res) => { //default link
    res.status(200).sendFile(path.join(initialPath, 'login.html'));
}) 

app.get('/changepw', (req, res) => { //link to changepw
    res.status(200).sendFile(path.join(initialPath, 'changepw.html'))
}) 

app.get('/dashboard', (req, res) => { //link to dashboard
    res.status(200).sendFile(path.join(initialPath, 'dashboard.html'))
}) 

app.get('/forgot-veryf', (req, res) => { //link to forgot-veryf
    res.status(200).sendFile(path.join(initialPath, 'forgot-veryf.html'))
}) 

app.get('/forgot', (req, res) => { //link to forgot
    res.status(200).sendFile(path.join(initialPath, 'forgot.html'))
}) 

app.get('/kasir', (req, res) => { //link to kasir
    res.status(200).sendFile(path.join(initialPath, 'kasir.html'))
}) 

app.get('/login', (req, res) => { //link to login
    res.status(200).sendFile(path.join(initialPath, 'login.html'))
}) 

app.get('/notif', (req, res) => { //link to notif

    res.status(200).sendFile(path.join(initialPath, 'notif.html'))
}) 
app.get('/pendapatan', (req, res) => { //link to pendapatan
    res.status(200).sendFile(path.join(initialPath, 'pendapatan.html'))
}) 

app.get('/signup', (req, res) => { //link to signup
    res.status(200).sendFile(path.join(initialPath, 'signup.html'))
}) 

app.get('/stock', (req, res) => { //link to stock
    res.status(200).sendFile(path.join(initialPath, 'stock.html'))
}) 

app.post('/register-user', (req, res) => {
    const { name, merchant, email, password, rptpassword } = req.body

    if (!name.length || !email.length || !merchant.length || !password.length || !rptpassword.length) {
        res.json('fill all the fields')
    } else if (!rptpassword.match(password)) {
        res.json('password not match')
    } else {
        db("db_user").insert({
            nama: name,
            namaMerchant: merchant,
            email: email,
            password: password
        })
            .returning(["name", "merchant", "email", "password"])
            .then(data => {
                res.json(data[0])
            })
            .catch((err) => {
                if (err.detail != undefined && err.detail.includes('already exists')) {
                    res.json('email already exists')
                }
            })
    }
})
app.post('/login-user', (req, res) => {
    const { email, password } = req.body
    db.select('email', 'password')
        .from('db_user')
        .where({
            email: email,
            password: password
        })
        .then(data => {
            if (data.length) {
                res.json(data[0])
            } else {
                res.json('email or password incorrect')
            }
        })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
