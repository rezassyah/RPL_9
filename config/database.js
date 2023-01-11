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

          db.collection('users').createIndex({ storeId: 1 }, { unique: true }, (err, result) => {
            if (err) {
              console.log('Error creating unique index on  storeId field:', err);
            } else {
              console.log('Unique index on  storeId field created:', result);
            }
          });

          db.collection('users').createIndex({ email: 1 }, { unique: true }, (err, result) => {
            if (err) {
              console.log('Error creating unique index on email  field:', err);
            } else {
              console.log('Unique index on email  field created:', result);
            }
          });

          // Insert three dummy users into the "users" collection
          db.collection("users").insertMany([
            {
              name: "Naufal Adrian Hidayat",
              storeId: 1,
              merchant: "Sempurna",
              email: "Naufal111@gmail.com",
              password: "KamuKepo.com"
            },
            {
              name: "Adrian Hidayat",
              storeId: 2,
              merchant: "Hidayat Shop",
              email: "naufaladr@gmail.com",
              password: "naufal123"
            },
            {
              name: "John Doe",
              storeId: 3,
              merchant: "Doe's Shop",
              email: "john@doe.com",
              password: "john12345"
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
  }

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

          db.collection('items').createIndex({ kode_item: 1 }, { unique: true }, (err, result) => {
            if (err) {
              console.log('Error creating unique index on kode_item field:', err);
            } else {
              console.log('Unique index on kode_item field created:', result);
            }
          });

          db.collection('items').createIndex({ storeId: 1 }, { unique: false }, (err, result) => {
            if (err) {
              console.log('Error creating unique index on storeId field:', err);
            } else {
              console.log('Unique index on storeId field created:', result);
            }
          });

          // Insert three dummy items into the "items" collection
          db.collection("items").insertMany([
            {
              nama_item: "Lifebuoy (Batang)",
              deskripsi: "Sabun mandi keperluan rumah tangga",
              kode_item: "SM001",
              stok: 50,
              harga: 3500,
              harga_dasar: 3000,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 1
            }, {
              nama_item: "Lux (Batang)",
              deskripsi: "Sabun mandi keperluan rumah tangga",
              kode_item: "SM002",
              stok: 43,
              harga: 3500,
              harga_dasar: 3000,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 1
            }, {
              nama_item: "Head & Shoulders",
              deskripsi: "Shampoo untuk rambutmu yang ingin panjang dan lebat",
              kode_item: "SH001",
              stok: 65,
              harga: 55000,
              harga_dasar: 45000,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 1
            }, {
              nama_item: "Lifebuoy Shampoo",
              deskripsi: "Shampoo untuk kesehatan rambutmu yang lebat",
              kode_item: "SH002",
              stok: 69,
              harga: 20000,
              harga_dasar: 15000,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 1
            }, {
              nama_item: "Pepsodent",
              deskripsi: "Pasta Gigi ekonomis dan higenis agar tetap membuat gigimu putih dan mencegah berlubang",
              kode_item: "PG001",
              stok: 56,
              harga: 5000,
              harga_dasar: 4000,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 1
            }, {
              nama_item: "Aqua (1500 ml)",
              deskripsi: "Air mineral yang berasal dari pegunungan asli, sehat untuk dikonsumsi",
              kode_item: "MNM001",
              stok: 45,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Aqua (750 ml)",
              deskripsi: "Air mineral yang berasal dari pegunungan asli, sehat untuk dikonsumsi",
              kode_item: "MNM002",
              stok: 110,
              harga: 5000,
              harga_dasar: 4000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Aqua (500 ml)",
              deskripsi: "Air mineral yang berasal dari pegunungan asli, sehat untuk dikonsumsi",
              kode_item: "MNM003",
              stok: 150,
              harga: 3500,
              harga_dasar: 3000,
              kategori: "Minuman",
              image: "",
              storeId: 2
            }, {
              nama_item: "Gery Chocolatos",
              deskripsi: "Coklat wafer yang renyah serta coklat yang lembut membuat kamu lebih ingin memakannya",
              kode_item: "SN001",
              stok: 130,
              harga: 2000,
              harga_dasar: 1500,
              kategori: "Snack",
              image: "",
              storeId: 2
            }, {
              nama_item: "Super Pel (780 ml)",
              deskripsi: "Pel lantai yang super bersih, membersihkan 99% kuman di lantai",
              kode_item: "PL001",
              stok: 80,
              harga: 10000,
              harga_dasar: 7500,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 2
            }, {
              nama_item: "Super Pel (250 ml)",
              deskripsi: "Pel lantai yang super bersih, membersihkan 99% kuman di lantai",
              kode_item: "PL002",
              stok: 150,
              harga: 2500,
              harga_dasar: 1700,
              kategori: "Peralatan Rumah Tangga",
              image: "",
              storeId: 2
            }, {
              nama_item: "Richeese Nabati",
              deskripsi: "Wafer keju yang renyah, rasa kejunya bikin kamu ga nahan dan mau lagi!",
              kode_item: "SN002",
              stok: 130,
              harga: 2000,
              harga_dasar: 1700,
              kategori: "Snack",
              image: "",
              storeId: 2
            }, {
              nama_item: "Richeese Ahh",
              deskripsi: "Wafer keju yang renyah, rasa kejunya bikin kamu meleleh dan ketagihan setiap saat",
              kode_item: "SN003",
              stok: 100,
              harga: 2000,
              harga_dasar: 1700,
              kategori: "Snack",
              image: "",
              storeId: 2
            }, {
              nama_item: "Qtela (185 g)",
              deskripsi: "Makanan ringan yang enak dan renyah",
              kode_item: "SN004",
              stok: 120,
              harga: 15000,
              harga_dasar: 12500,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "Qtela (55 g)",
              deskripsi: "Makanan ringan yang enak dan renyah",
              kode_item: "SN005",
              stok: 110,
              harga: 7500,
              harga_dasar: 5000,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "Chitato(120 g)",
              deskripsi: "Keripik yang renyah, membuat lidahmu terasa menggigit dan haus akan rasa yang nikmat",
              kode_item: "SN006",
              stok: 180,
              harga: 17000,
              harga_dasar: 15000,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "Chitato(70 g)",
              deskripsi: "Keripik yang renyah, membuat lidahmu terasa menggigit dan haus akan rasa yang nikmat",
              kode_item: "SN007",
              stok: 170,
              harga: 6000,
              harga_dasar: 5000,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "Choki-Choki",
              deskripsi: "Coklat yang lumer dan nikmat, bikin mulut kita kepengen terus merasakannya.",
              kode_item: "SN008",
              stok: 290,
              harga: 1000,
              harga_dasar: 800,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "Sunlight (500 ml)",
              deskripsi: "Sabun cuci piring ekonomis terbaik",
              kode_item: "SCM001",
              stok: 180,
              harga: 17000,
              harga_dasar: 15000,
              kategori: "SPeralatan Rumah Tangga",
              image: "",
              storeId: 3
            }, {
              nama_item: "Milku",
              deskripsi: "Minuman susu dengan rasa yang bisa diingat oleh semua orang",
              kode_item: "MNM004",
              stok: 200,
              harga: 3500,
              harga_dasar: 3000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Teh Zegar",
              deskripsi: "Minuman teh yang segar dan nikmat di tenggorokan",
              kode_item: "MNM005",
              stok: 210,
              harga: 2000,
              harga_dasar: 1500,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Sprite (250 ml)",
              deskripsi: "Minuman soda yang segar",
              kode_item: "MNM006",
              stok: 300,
              harga: 5000,
              harga_dasar: 4000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Sprite (500 ml)",
              deskripsi: "Minuman soda yang segar",
              kode_item: "MNM007",
              stok: 310,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Sprite (1200 ml)",
              deskripsi: "Minuman soda yang segar",
              kode_item: "MNM008",
              stok: 200,
              harga: 12000,
              harga_dasar: 10000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Coca Cola (250 ml)",
              deskripsi: "Minuman soda yang akan terasa baik saat kamu meminumnya bersama teman-temanmu",
              kode_item: "MNM009",
              stok: 270,
              harga: 5000,
              harga_dasar: 4000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Coca Cola (500 ml)",
              deskripsi: "Minuman soda yang akan terasa baik saat kamu meminumnya bersama teman-temanmu",
              kode_item: "MNM010",
              stok: 300,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Minuman",
              image: "",
              storeId: 1
            }, {
              nama_item: "Coca Cola (1200 ml)",
              deskripsi: "Minuman soda yang akan terasa baik saat kamu meminumnya bersama teman-temanmu",
              kode_item: "MNM011",
              stok: 300,
              harga: 12000,
              harga_dasar: 10000,
              kategori: "Minuman",
              image: "",
              storeId: 3
            }, {
              nama_item: "Beng-beng",
              deskripsi: "Coklat wafer nikmat yang bisa kamu rasakan tiap waktu",
              kode_item: "SN009",
              stok: 100,
              harga: 2000,
              harga_dasar: 1500,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "Fanta (250 ml)",
              deskripsi: "Soda minuman yang membuatmu ingin mencapai tujuanmu dengan semangat lebih",
              kode_item: "MNM012",
              stok: 300,
              harga: 5000,
              harga_dasar: 4000,
              kategori: "Minuman",
              image: "",
              storeId: 3
            }, {
              nama_item: "Fanta (500 ml)",
              deskripsi: "Soda minuman yang membuatmu ingin mencapai tujuanmu dengan semangat lebih",
              kode_item: "MNM013",
              stok: 240,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Minuman",
              image: "",
              storeId: 3
            }, {
              nama_item: "Fanta (1200 ml)",
              deskripsi: "Soda minuman yang membuatmu ingin mencapai tujuanmu dengan semangat lebih",
              kode_item: "MNM014",
              stok: 220,
              harga: 12000,
              harga_dasar: 10000,
              kategori: "Minuman",
              image: "",
              storeId: 3
            }, {
              nama_item: "Komo",
              deskripsi: "Chiki rasa keju yang renyah dan lembuh di mulut",
              kode_item: "SN010",
              stok: 300,
              harga: 1000,
              harga_dasar: 500,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "JetZ",
              deskripsi: "Chiki enak yang bisa dirasakan dengan nikmat bersama temanmu",
              kode_item: "SN011",
              stok: 300,
              harga: 1000,
              harga_dasar: 500,
              kategori: "Snack",
              image: "",
              storeId: 3
            }, {
              nama_item: "AICE Goal!!!",
              deskripsi: "Es krim berbentuk bola yang bisa menemanimu saat menonton bola bersama lingkungan terdekatmu",
              kode_item: "ES001",
              stok: 100,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Blueberry Mania",
              deskripsi: "Es Krim rasa blueberry yang lumer di mulut",
              kode_item: "ES002",
              stok: 80,
              harga: 7000,
              harga_dasar: 6000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Chocolate Crispy",
              deskripsi: "Es Krim rasa coklat yang memiliki 2 lapisan coklat yang renyah",
              kode_item: "ES003",
              stok: 180,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Sweet Corn",
              deskripsi: "Es Krim rasa jagung di setiap gigitannya renyah di mulut",
              kode_item: "ES004",
              stok: 165,
              harga: 5000,
              harga_dasar: 3000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Mango Slush",
              deskripsi: "Es Krim rasa mangga yang segar di mulut",
              kode_item: "ES005",
              stok: 165,
              harga: 7000,
              harga_dasar: 5000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Mango Less Sugar",
              deskripsi: "Es Krim rasa mangga yang manis di dalam mulut",
              kode_item: "ES006",
              stok: 165,
              harga: 5000,
              harga_dasar: 3000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Mochi Chocolate",
              deskripsi: "Es Krim mochi rasa coklat yang lumer coklatnya di dalam mulut",
              kode_item: "ES007",
              stok: 195,
              harga: 5000,
              harga_dasar: 3500,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Mochi Vanilla",
              deskripsi: "Es Krim mochi rasa vanilla yang lumer vanilla di dalam mulut",
              kode_item: "ES008",
              stok: 195,
              harga: 5000,
              harga_dasar: 3500,
              kategori: "Ice Cream",
              image: "",
              storeId: 1
            }, {
              nama_item: "AICE Chocolate Sundae Cup",
              deskripsi: "Es Krim Cup rasa coklat yang rasa coklatnya menggelegar di dalam mulut",
              kode_item: "ES009",
              stok: 190,
              harga: 7000,
              harga_dasar: 5800,
              kategori: "Ice Cream",
              image: "",
              storeId: 1
            }, {
              nama_item: "AICE Strawberry Sundae Cup",
              deskripsi: "Es Krim Cup rasa strawberry yang rasa strawberry menggelegar di dalam mulut",
              kode_item: "ES010",
              stok: 190,
              harga: 7000,
              harga_dasar: 5800,
              kategori: "Ice Cream",
              image: "",
              storeId: 1
            }, {
              nama_item: "AICE Durian Cup",
              deskripsi: "Es Krim Cup rasa durian yang rasa durian khas dan ingin mencoba lagi dan lagi.",
              kode_item: "ES011",
              stok: 100,
              harga: 15000,
              harga_dasar: 12500,
              kategori: "Ice Cream",
              image: "",
              storeId: 1
            }, {
              nama_item: "AICE Coffe Crispy",
              deskripsi: "Es Krim stik rasa coffe dan dilapisi coklat yang renyah.",
              kode_item: "ES012",
              stok: 100,
              harga: 6000,
              harga_dasar: 4500,
              kategori: "Ice Cream",
              image: "",
              storeId: 3
            }, {
              nama_item: "AICE Strawberry Crispy",
              deskripsi: "Es Krim strawbeery dengan dilapisi vanilla yang renyah.",
              kode_item: "ES013",
              stok: 100,
              harga: 6000,
              harga_dasar: 4500,
              kategori: "Ice Cream",
              image: "",
              storeId: 3
            }, {
              nama_item: "AICE Semangka Stick",
              deskripsi: "Es Krim berbentuk semangka yang manis dan segar.",
              kode_item: "ES014",
              stok: 100,
              harga: 5000,
              harga_dasar: 3000,
              kategori: "Ice Cream",
              image: "",
              storeId: 3
            }, {
              nama_item: "AICE Nanas Stick",
              deskripsi: "Es Krim rasa nanas yang segar dan bikin kamu fresh lagi saat kegiatan",
              kode_item: "ES015",
              stok: 100,
              harga: 5000,
              harga_dasar: 3000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE Chocolate Almond",
              deskripsi: "Es Krim rasa coklat yang dilapisi coklat luar dengan perpaduan kacang almond yang siap melahap mulutmu dalam sekejap",
              kode_item: "ES016",
              stok: 100,
              harga: 12000,
              harga_dasar: 10000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
            }, {
              nama_item: "AICE 2 Colors Stick",
              deskripsi: "Es Krim dua rasa yang bersatu padu antara coklat dan vanilla",
              kode_item: "ES017",
              stok: 100,
              harga: 6000,
              harga_dasar: 5000,
              kategori: "Ice Cream",
              image: "",
              storeId: 2
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
    console.error(err);
    res.status(500).send("Something went wrong. Please try again later.");
  }

  try {
    // Check if the "users" collection exists
    db.listCollections({ name: "sales" }).toArray((err, collections) => {
      if (err) {
        console.log("Error checking for the 'sales' collection:", err);
        throw err;
      }

      if (collections.length === 0) {
        db.createCollection("sales", function (err, res) {
          if (err) {
            console.log("Error creating the 'sales' collection:", err);
            throw err;
          }

          console.log("sales collection created");

          db.collection('sales').createIndex({ kode_item: 1 }, { unique: false }, (err, result) => {
            if (err) {
              console.log('Error creating unique index on kode_item field:', err);
            } else {
              console.log('Unique index on kode_item field created:', result);
            }
          });

          db.collection('sales').createIndex({ storeId: 1 }, { unique: false }, (err, result) => {
            if (err) {
              console.log('Error creating unique index on storeId field:', err);
            } else {
              console.log('Unique index on storeId field created:', result);
            }
          });

          db.collection('sales').createIndex([{ tahun: 1 }, { bulan: 1 }], { unique: false }, (err, result) => {
            if (err) {
              console.log('Error creating unique compound index on tahun & bulan field:', err);
            } else {
              console.log('Unique compound index on tahun & bulan field created:', result);
            }
          });

          // Insert three dummy users into the "users" collection
          db.collection("sales").insertMany([
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "SM001",
              terjual: 5
            },
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "SM002",
              terjual: 3
            },
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "SH001",
              terjual: 8
            },
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "SH002",
              terjual: 20
            },
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "PG001",
              terjual: 6
            },
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "MNM001",
              terjual: 4
            },
            {
              bulan: "Januari",
              tahun: "2022",
              storeId: 1,
              kode_item: "MNM002",
              terjual: 15
            }
          ], { upsert: true }, function (err, res) {
            if (err) {
              console.log("Error inserting dummy sales:", err);
              throw err;
            }

            console.log("dummy sales inserted");
          });
        });
      } else {
        console.log("sales collection already exists");
      }
    });
  } catch (err) {
    // Do something with the error here, e.g. log it or send it to an error reporting service
    console.error(err);
    res.status(500).send("Something went wrong. Please try again later.");
  }

  // Close the connection to the MongoDB server
  //client.close();
});



module.exports.client = client;
