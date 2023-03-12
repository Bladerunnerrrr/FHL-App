// // Importing required modules
// const express = require("express");
// const mongodb = require("mongodb");
// const app = express();
// const bodyParser = require("body-parser");
// const MongoClient = mongodb.MongoClient;
// const url = "mongodb+srv://fhlapp:fhlapp@fhlappdb.dumuziw.mongodb.net/?retryWrites=true&w=majority";


// let cors = require("cors");
// app.use(cors());
// // Use body-parser middleware to parse request body
// app.use(bodyParser.json());


// // Route to handle registration
// app.post("/register", (req, res) => {
//   MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//       console.log("Error connecting to the database");
//       res.status(500).send("Error connecting to the database");
//     } else {
//       const db = client.db("test");
//       const usersCollection = db.collection("users");

//       // Check if email already exists
//       usersCollection
//         .find({ email: req.body.email })
//         .toArray((err, results) => {
//           if (err) {
//             console.log("Error fetching users");
//             res.status(500).send("Error fetching users");
//           } else if (results.length > 0) {
//             res.status(400).send("Email already exists");
//           } else {
//             // Insert new user into the database
//             usersCollection.insertOne(
//               {
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: req.body.password,
//               },
//               (err, result) => {
//                 if (err) {
//                   console.log("Error inserting user");
//                   res.status(500).send("Error inserting user");
//                 } else {
//                   res.send("User registered successfully");
//                 }
//               }
//             );
//           }
//         });
//     }
//   });
// });

// // Route to handle login
// app.post("/login", (req, res) => {
//   MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//       console.log("Error connecting to the database");
//       res.status(500).send("Error connecting to the database");
//     } else {
//       const db = client.db("test");
//       const usersCollection = db.collection("users");

//       // Check if user exists
//       usersCollection
//         .find({ email: req.body.email, password: req.body.password })
//         .toArray((err, results) => {
//           if (err) {
//             console.log("Error fetching users");
//             res.status(500).send("Error fetching users");
//           } else if (results.length > 0) {
//             res.send("Login successful");
//           } else {
//             res.status(400).send("Email or password is incorrect");
//           }
//         });
//     }
//   });
// });




// // Route to handle saving patterns to database
// app.post("/save-patterns", (req, res) => {
//   MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//       console.log("Error connecting to the database");
//       res.status(500).send("Error connecting to the database");
//     } else {
//       const db = client.db("test");
//       const patternsCollection = db.collection("patterns");

//       // Insert new patterns into the database
//       patternsCollection.insertOne(
//         {
//           name: req.body.name,
//           description: req.body.description,
//           pattern: req.body.pattern,
//         },
//         (err, result) => {
//           if (err) {
//             console.log("Error inserting patterns");
//             res.status(500).send("Error inserting patterns");
//           } else {
//             res.send("Patterns saved successfully");
//           }
//         }
//       );
//     }
//   });
// });

// // Route to handle fetching patterns from database
// app.get("/patterns", (req, res) => {
//   MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//       console.log("Error connecting to the database");
//       res.status(500).send("Error connecting to the database");
//     } else {
//       const db = client.db("test");
//       const patternsCollection = db.collection("patterns");

//       // Fetch all patterns from the database
//       patternsCollection.find().toArray((err, results) => {
//         if (err) {
//           console.log("Error fetching patterns");
//           res.status(500).send("Error fetching patterns");
//         } else {
//           res.send(results);
//         }
//       });
//     }
//   });
// });

// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });


const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://fhlapp:fhlapp@fhlappdb.dumuziw.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log('Error connecting to the database');
  } else {
    console.log('Database connected successfully');
    const db = client.db('test');

    // Route to handle registration
    app.post('/register', (req, res) => {
      const usersCollection = db.collection('users');
      usersCollection.find({ email: req.body.email }).toArray((err, results) => {
        if (err) {
          console.log('Error fetching users');
          res.status(500).send('Error fetching users');
        } else if (results.length > 0) {
          res.status(400).send('Email already exists');
        } else {
          usersCollection.insertOne({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }, (err, result) => {
            if (err) {
              console.log('Error inserting user');
              res.status(500).send('Error inserting user');
            } else {
              res.send('User registered successfully');
            }
          });
        }
      });
    });

    // Route to handle login
    app.post('/login', (req, res) => {
      const usersCollection = db.collection('users');
      usersCollection.find({ email: req.body.email, password: req.body.password }).toArray((err, results) => {
        if (err) {
          console.log('Error fetching users');
          res.status(500).send('Error fetching users');
        } else if (results.length > 0) {
          res.send('Login successful');
        } else {
          res.status(400).send('Email or password is incorrect');
        }
      });
    });

    // Route to handle saving patterns to database
    app.post('/save-patterns', (req, res) => {
      const patternsCollection = db.collection('patterns');
      patternsCollection.insertOne({
        name: req.body.name,
        description: req.body.description,
        pattern: req.body.pattern,
      }, (err, result) => {
        if (err) {
          console.log('Error inserting patterns');
          res.status(500).send('Error inserting patterns');
        } else {
          res.send('Patterns saved successfully');
        }
      });
    });

    // Route to handle fetching patterns from database
    app.get('/patterns', (req, res) => {
      const patternsCollection = db.collection('patterns');
      patternsCollection.find().toArray((err, results) => {
        if (err) {
          console.log('Error fetching patterns');
          res.status(500).send('Error fetching patterns');
        } else {
          res.send(results);
        }
      });
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
