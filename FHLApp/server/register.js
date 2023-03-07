// Importing required modules
const express = require("express");
const mongodb = require("mongodb");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://fhlapp:fhlapp@fhlappdb.dumuziw.mongodb.net/?retryWrites=true&w=majority";


let cors = require("cors");
app.use(cors());
// Use body-parser middleware to parse request body
app.use(bodyParser.json());

// Route to handle registration
app.post("/register", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log("Error connecting to the database");
      res.status(500).send("Error connecting to the database");
    } else {
      const db = client.db("test");
      const usersCollection = db.collection("users");

      // Check if email already exists
      usersCollection
        .find({ email: req.body.email })
        .toArray((err, results) => {
          if (err) {
            console.log("Error fetching users");
            res.status(500).send("Error fetching users");
          } else if (results.length > 0) {
            res.status(400).send("Email already exists");
          } else {
            // Insert new user into the database
            usersCollection.insertOne(
              {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              },
              (err, result) => {
                if (err) {
                  console.log("Error inserting user");
                  res.status(500).send("Error inserting user");
                } else {
                  res.send("User registered successfully");
                }
              }
            );
          }
        });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
