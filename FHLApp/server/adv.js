const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const MongoClient = mongodb.MongoClient;
const url =
  "mongodb+srv://fhlapp:fhlapp@fhlappdb.dumuziw.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006'); // replace with your frontend domain
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log("Error connecting to the database");
  } else {
    console.log("Database connected successfully");
    const db = client.db("test");

    // Route to handle registration
    app.post("/register", (req, res) => {
      const usersCollection = db.collection("users");
      usersCollection
        .find({ email: req.body.email })
        .toArray((err, results) => {
          if (err) {
            console.log("Error fetching users");
            res.status(500).send("Error fetching users");
          } else if (results.length > 0) {
            res.status(400).send("Email already exists");
          } else {
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
    });

    // Route to handle login
    app.post("/login", (req, res) => {
      const usersCollection = db.collection("users");
      usersCollection
        .find({ email: req.body.email, password: req.body.password })
        .toArray((err, results) => {
          if (err) {
            console.log("Error fetching users");
            res.status(500).send("Error fetching users");
          } else if (results.length > 0) {
            res.send("Login successful");
          } else {
            res.status(400).send("Email or password is incorrect");
          }
        });
    });

    // Route to handle saving patterns to database
    app.post("/save-patterns", (req, res) => {
      const patternsCollection = db.collection("patterns_2");
      const {
        destinationName,
        duplicate,
        payloadBytes,
        payloadString,
        qos,
        retained,
        topic,
      } = req.body.newMessageObj;
      // console.log(req.body.newMessageObj, "req.body.messageObj");
      patternsCollection.insertOne(
        {
          name: req.body.name,
          // messageObj: req.body.newMessageObj,
          destinationName,
          duplicate,
          payloadBytes,
          payloadString,
          qos,
          retained,
          topic,
          //description: req.body.description,
          //pattern: req.body.pattern,
        },
        (err, result) => {
          if (err) {
            console.log("Error inserting patterns");
            res.status(500).send("Error inserting patterns");
          } else {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send("Patterns saved successfully");
          }
        }
      );
    });

    // Route to handle fetching patterns from database
    app.get("/patterns", (req, res) => {
      const patternsCollection = db.collection("patterns_2");
      patternsCollection.find().toArray((err, results) => {
        if (err) {
          console.log("Error fetching patterns");
          res.status(500).send("Error fetching patterns");
        } else {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.send(results);
        }
      });
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
