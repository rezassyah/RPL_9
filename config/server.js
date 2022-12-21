const express = require('express') //express.js 
const path = require('path')
const session = require('express-session');
const bodyParser = require('body-parser') //parser
const app = express() //app using express
const port = process.env.PORT || 5500
const cors = require('cors')
const { db } = require('../src/js/database.js')

let initialPath = path.join(__dirname, '../src/') //path ke web

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(express.static(initialPath, { index: 'login.html' })) //default open login html
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 60000
    },
}))

app.get('/', (req, res) => { //default link
    res.status(200).sendFile(path.join(initialPath, 'login.html'));
}) 

app.get('/api/readData', (req,res)=>{
    const sqlQuery = "select * from db_user"
    db.query(sqlQuery, (err, result) =>{
        if (err) throw err

        res.send(result)
        console.log(result``)
    })
})

app.get('/api/readUser/', (req,res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    const sqlQuery = "select * from db_user where email = ? and password = ?"
    if (!userEmail && !userPassword) {
        res.json("fill in all the fields")
        res.end()
    }
    db.query(sqlQuery, [userEmail, userPassword], (err, result) => {
        if (err) {
            res.json(err)
        } else {
            if (res.length > 0) {
                
            }
            res.send(result)
            console.log(result)
        }
        
    })
})

app.post('/api/createUser', (req, res) => {
    const { name, merchant, email, password, rptpassword } = req.body
    if (!name.length || !email.length || !merchant.length || !password.length || !rptpassword.length) {
        res.json('fill all the fields')
    } else if (!rptpassword.match(password)) {
        res.json('password not match')
    } else {
        
        const sqlQuery = "insert ignore into db_user (nama, namaMerchant, email, password) value (?, ?, ?, ?)"
        db.query(sqlQuery, [name, merchant, email, password], (err, result) => {
            if (err) {
                res.json(err)
            } else {
                res.send(result)
                console.log(result)
            }
        })
    }
})

app.put('/api/updateUser', (req,res) => {
    const userName = req.body.nama
    const userMerchant = req.body.namaMerchant
    const userPassword = req.body.password
    const userEmail = req.body.email

    const sqlQuery = "update db_user set nama = ?, password = ?, namaMerchant = ? where email = ?"
    db.query(sqlQuery, [userName,userPassword, userMerchant,userEmail], (err, result) => {
        if (err) throw err

        res.send(result)
        console.log(result)
    })
})

app.delete('/api/deleteUser', (req,res) => {
    const userId = req.body.id_user

    const sqlQuery = "delete from db_user where id_user = ?"
    db.query(sqlQuery, userId, (err, result) => {
        if (err) throw err

        res.send(result)
        console.log(result)
    })
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
