const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rpl9:cashier@cluster0.kcue3z5.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("cashier");

  try {
    // Check if the "users" collection exists
    db.listCollections({ name: "users" }).toArray((err, collections) => {
      if (err) {
        console.log("Error checking for the 'users' collection:", err);
        throw err;
      }

      if (collections.length === 0) {
        db.createCollection("users", function (err, res) {
          if (err) {
            console.log("Error creating the 'users' collection:", err);
            throw err;
          }

          console.log("users collection created");

          // Insert three dummy users into the "users" collection
          db.collection("users").insertMany([
            {
              name: "Naufal Adrian Hidayat",
              merchant: "Sempurna",
              email: "Naufal111@gmail.com",
              password: "KamuKepo.com"
            },
            {
              name: "Adrian Hidayat",
              merchant: "Hidayat Shop",
              email: "naufaladr@gmail.com",
              password: "naufal123"
            },
            {
              name: "John Doe",
              merchant: "Doe's Shop",
              email: "john@doe.com",
              password: "john123"
            }
          ], { upsert: true }, function (err, res) {
            if (err) {
              console.log("Error inserting dummy users:", err);
              throw err;
            }

            console.log("dummy users inserted");
          });
        });
      } else {
        console.log("users collection already exists");
      }
    });
  } catch (err) {
    // Do something with the error here, e.g. log it or send it to an error reporting service
    console.error(err);
    res.status(500).send("Something went wrong. Please try again later.");
  } finally {
    try {
      db.listCollections({ name: "items" }).toArray((err, collections) => {
        if (err) {
          console.log("Error checking for the 'items' collection:", err);
          throw err;
        }

        if (collections.length === 0) {
          db.createCollection("items", function (err, res) {
            if (err) {
              console.log("Error creating the 'items' collection:", err);
              throw err;
            }

            console.log("items collection created");

            // Insert three dummy items into the "items" collection
            db.collection("items").insertMany([
              {
                nama_item: "Sabun Mandi",
                deskripsi: "Sabun mandi keperluan rumah tangga",
                kode_item: "SM001",
                stok: 20,
                harga: 20000,
                kategori: "Peralatan Rumah Tangga",
                image: ""
              }, {
                nama_item: "Sabun Mandi",
                deskripsi: "Sabun mandi keperluan rumah tangga",
                kode_item: "SM001",
                stok: 20,
                harga: 20000,
                kategori: "Peralatan Rumah Tangga",
                image: ""
              }, {
                nama_item: "Sabun Mandi",
                deskripsi: "Sabun mandi keperluan rumah tangga",
                kode_item: "SM001",
                stok: 20,
                harga: 20000,
                kategori: "Peralatan Rumah Tangga",
                image: ""
              }, {
                nama_item: "Sabun Mandi",
                deskripsi: "Sabun mandi keperluan rumah tangga",
                kode_item: "SM001",
                stok: 20,
                harga: 20000,
                kategori: "Peralatan Rumah Tangga",
                image: ""
              }, {
                nama_item: "Sabun Mandi",
                deskripsi: "Sabun mandi keperluan rumah tangga",
                kode_item: "SM001",
                stok: 20,
                harga: 20000,
                kategori: "Peralatan Rumah Tangga",
                image: ""
              }, {
                nama_item: "Sabun Mandi",
                deskripsi: "Sabun mandi keperluan rumah tangga",
                kode_item: "SM001",
                stok: 20,
                harga: 20000,
                kategori: "Peralatan Rumah Tangga",
                image: ""
              }
            ], { upsert: true }, function (err, res) {
              if (err) {
                console.log("Error inserting dummy items:", err);
                throw err;
              }

              console.log("dummy items inserted");
            });
          });
        } else {
          console.log("items collection already exists");
        }
      });
    } catch (err) {

    } finally {

    }
  }

  // Close the connection to the MongoDB server
  //client.close();
});

module.exports.client = client;
