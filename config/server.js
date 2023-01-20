const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = process.env.PORT || 5500;
const cors = require('cors');
const { client } = require('./database.js');
const db = client.db("cashier");
const validator = require('../src/js/validator');

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

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(initialPath, 'login'));
});

app.get('/dashboard', (req, res) => {
    res.render('../src/dashboard', { selected: 'dashboard', name: req.session.name, profession: req.session.merchant });
});

app.get('/kasir', (req, res) => {
    res.render('../src/kasir', { selected: 'kasir', name: req.session.name, profession: req.session.merchant });
});

app.get('/notif', (req, res) => {
    res.render('../src/notif', { selected: 'notif', name: req.session.name, profession: req.session.merchant });
});

app.get('/pendapatan', (req, res) => {
    res.render('../src/pendapatan', { selected: 'pendapatan', name: req.session.name, profession: req.session.merchant });
});

app.get('/stock', (req, res) => {
    res.render('../src/stock', { selected: 'stock', name: req.session.name, profession: req.session.merchant });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    //check fields 
    if (!email || !password) {
        return res.json('fill in all the fields');
    }
    //check email validity
    if (!validator.isValidEmail(email)) {
        return res.json('invalid email, insert real email address');
    }
    //check password validity
    if (!validator.isValidPassword(password)) {
        return res.json('invalid password');
    }
    // Find a user with the specified email and password in the "users" collection
    db.collection('users').findOne(
        { email, password },
        (err, result) => {
            if (err) {
                res.json(err);
            } else {
                if (result) {
                    // If a user is found, set a session variable with the user's email
                    req.session.email = email;
                    req.session.name = result.name;
                    req.session.merchant = result.merchant;
                    req.session.storeId = result.storeId;

                    // Save the session to a cookie
                    req.session.save((err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // If the session was saved successfully, return the user's data
                            res.send(result);
                        }
                    });
                } else {
                    // If no user is found, return an error message
                    res.json('Invalid email or password');
                }
            }
        }
    );
});

app.get('/api/checkSession', (req, res) => {
    if (req.session.email) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ loggedOut: true });
        }
    });
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
    // Find a user with the specified email and password in the "users" collection
    db.collection('users').findOne(
        { email: userEmail },
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
    // Check if any of the required fields are empty
    if (!name || !email || !merchant || !password || !rptpassword) {
        return res.json('fill in all the fields');
    }
    //check email validity
    if (!validator.isValidEmail(email)) {
        return res.json('invalid email, insert real email address');
    }
    //check password validity
    if (!validator.isValidPassword(password)) {
        return res.json('invalid password');
    }
    //check matching password
    if (!rptpassword.match(password)) {
        return res.json('password not match');
    }
    //check storeId
    const idRes = db.collection('users').findOne({}, { sort: { storeId: -1 } });
    const nextID = idRes ? idRes.storeId + 1 : 1;

    db.collection('users').insertOne(
        { name, nextID, merchant, email, password },
        (err, result) => {
            if (err) {
                if (err.code === 11000) {
                    return res.json("Duplicate email, please login")
                }
                res.json(err.message);
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

app.post('/api/items', (req, res) => {
    const item = req.body;
    item.storeId = req.session.storeId;
    db.collection('items').insertOne(item, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error inserting item into the collection' });
        } else {
            res.send(result);
        }
    });
});

app.get('/api/readAllItems/', (req, res) => {
    const storeId = req.session.storeId;
    db.collection('items').find({ storeId: storeId }).toArray((err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error finding items in the collection' });
        } else {
            res.send(result);
        }
    });
});

app.get('/api/items/:kode_item', (req, res) => {
    const kode_item = req.params.kode_item;
    const storeId = req.session.storeId;
    db.collection('items').findOne({ kode_item: kode_item, storeId: storeId }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error finding item in the collection' });
        } else {
            res.send(result);
        }
    });
});


app.put('/api/items/:kode_item', (req, res) => {
    const kode_item = req.params.kode_item;
    const updatedItem = req.body;
    updatedItem.storeId = req.session.storeId;
    const storeId = req.session.storeId;
    db.collection('items').updateOne({ kode_item: kode_item, storeId: storeId }, { $set: updatedItem }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error updating item in the collection' });
        } else {
            res.send(result);
        }
    });
});

app.delete('/api/deleteItems/:kode_item', (req, res) => {
    const kode_item = req.params.kode_item;
    const storeId = req.session.storeId;
    db.collection('items').deleteOne({ kode_item: kode_item, storeId: storeId }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error deleting item from the collection' });
        } else {
            res.send(result);
        }
    });
});

app.post('/api/sales', (req, res) => {
    const sale = req.body;
    sale.storeId = req.session.storeId;
    db.collection('sales').insertOne(sale, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error inserting sale into the collection' });
        } else {
            res.send(result);
        }
    });
});

app.get('/api/readAllSales/', (req, res) => {
    const storeId = req.session.storeId;
    db.collection('sales').find({ storeId: storeId }).sort({ tahun: 1, bulan:1 }).toArray((err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error finding sales in the collection' });
        } else {
            res.send(result);
        }
    });
});

app.get('/api/readSalesDates/', (req, res) => {
    const storeId = req.session.storeId;
    db.collection('sales').aggregate([
        { $match: { storeId: storeId } },
        { $group: { 
            _id: { bulan: "$bulan", tahun: "$tahun" },
            count: {$sum:1}
            }
        },
        { $sort: { "_id.tahun": 1, "_id.bulan": 1 } }
    ])
        .toArray((err, result) => {
            if (err) {
                res.status(500).send({ error: 'Error finding sales in the collection' });
            } else {
                res.send(result);
            } 
        });
});



app.get('/api/salesg/:kode_item', (req, res) => {
    const kode_item = req.params.kode_item;
    console.log("1");
    const storeId = req.session.storeId;
    console.log("2");
    let currentMonth = new Date().getMonth() + 1;
    console.log("3");
    let currentYear = new Date().getFullYear().toString();
    console.log("4");
    db.collection('sales').findOne({ kode_item: kode_item, storeId:storeId, bulan: currentMonth, tahun: currentYear }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error finding sale in the collection' });
        } else {
            res.send(result);
        }
    });
});

app.put('/api/sales/:kode_item', (req, res) => {
    const kode_item = req.params.kode_item;
    const updatedSale = req.body;
    body.storeId = req.session.storeId;
    const storeId = req.session.storeId;
    db.collection('sales').updateOne({ kode_item: kode_item, storeId: storeId }, { $set: updatedSale }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error updating sale in the collection' });
        } else {
            res.send(result);
        }
    });
});

app.delete('/api/sales/:id', (req, res) => {
    const id = req.params.id;
    db.collection('sales').deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error deleting sale from the collection' });
        } else {
            res.send(result);
        }
    });
});

app.listen(port, () => {
    console.log(`app listening on port ${port}!`);
});