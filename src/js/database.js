const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rpl9:cashier@cluster0.kcue3z5.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const db = client.db("cashier");

  // Check if the "users" collection exists
  db.listCollections().toArray(function(err, collections) {
    if (err) {
      console.log("Error checking for the 'users' collection:", err);
      return;
    }

    if (collections.some(coll => coll.name === "users")) {
      console.log("users collection already exists");
    } else {
      // Create the "users" collection if it does not exist
      db.createCollection("users", function(err, res) {
        if (err) {
          console.log("Error creating the 'users' collection:", err);
          return;
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
        ], { upsert: true }, function(err, res) {
          if (err) {
            console.log("Error inserting dummy users:", err);
            return;
          }

          console.log("dummy users inserted");
        });
      });
    }
  });

  // Close the connection to the MongoDB server
  //client.close();
});

module.exports.client = client
