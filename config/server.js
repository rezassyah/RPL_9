const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5500;
const cors = require('cors');
const { client } = require('../src/js/database.js');
const db = client.db("cashier");

let initialPath = path.join(__dirname, '../src/');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(initialPath, { index: 'login.html' }));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'secret',
        name: 'secretName',
        cookie: {
            sameSite: true,
            maxAge: 60000,
        },
    })
);

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(initialPath, 'login.html'));
});

app.get('/api/readData', (req, res) => {
    // Find all documents in the "users" collection
    db.collection('users')
        .find({})
        .toArray((err, result) => {
            if (err) {
                return res.json(err);
            }
            res.send(result);
            console.log(result);
        });
});

app.get('/api/readUser', (req, res) => {
    const userEmail = req.query.email;
    const userPassword = req.query.password;
    if (!userEmail && !userPassword) {
        return res.json('fill in all the fields');
    }
    // Find a user with the specified email and password in the "users" collection
    db.collection('users').findOne(
        { email: userEmail, password: userPassword },
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                if (res.length > 0) {
                }
                res.send(result);
                console.log(result);
            }
        }
    );
});


app.post('/api/createUser', (req, res) => {
    const { name, merchant, email, password, rptpassword } = req.body;
    // Insert the new user into the "users" collection
    if (!name.length || !email.length || !merchant.length || !password.length || !rptpassword.length) {
        return res.json('fill in all the fields');
    }
    if (!rptpassword.match(password)) {
        return res.json('password not match');
    }
    db.collection('users').insertOne(
        { name, merchant, email, password },
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.send(result);
                console.log(result);
            }
        }
    );
});

app.put('/api/updateUser', (req, res) => {
    const userName = req.body.nama;
    const userMerchant = req.body.namaMerchant;
    const userPassword = req.body.password;
    const userEmail = req.body.email;
    // Update the user with the specified email in the "users" collection
    db.collection('users').updateOne(
        { email: userEmail },
        {
            $set: {
                name: userName,
                password: userPassword,
                merchant: userMerchant,
            },
        },
        (err, result) => {
            if (err) {
                return res.json(err);
            }
            res.send(result);
            console.log(result);
        }
    );
});


app.delete('/api/deleteUser', (req, res) => {
    const userEmail = req.body.email;
    // Delete the user with the specified email from the "users" collection
    db.collection('users').deleteOne({ email: userEmail }, (err, result) => {
        if (err) {
            return res.json(err);
        }
        res.send(result);
        console.log(result);
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});