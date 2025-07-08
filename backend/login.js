const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require("./db.js");
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const cookieParser = require('cookie-parser')
const key = 'ashishisgreat@#1234'

const app = express();
const PORT = 3500;

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

let db;

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, key);
}

connectToDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log("✅ Server is listening on port 3500");
    });
    db = getDb();
  } else {
    console.log("❌ Error connecting to database:", err);
  }
});

app.post('/signup', (req,res)=>{
    const user = {Firstname: req.body.firstName, Lastname: req.body.lastName, Username: req.body.username, Password:req.body.password};
    db.collection("User").insertOne(user)
    .then((result) => {
      console.log("User created:", result.insertedId);
      res.status(201).send({ success: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ success: false, error: err });
    });
})


app.post('/login',async (req,res)=>{
    const user = {Username: req.body.username, Password: req.body.password};
    const result = await db.collection('User').findOne(user);
    if (result) {
    console.log("User Found", result);
    const sessionId = uuidv4();
    res.cookie("uid", jwt.sign({ _id: sessionId, Username: req.body.username }, key), {
      httpOnly: true,
      sameSite: 'lax', 
      secure: false   
    });
    res.send(true);
  } else {
    console.log('Not found')
    res.send(0);
  }
})

app.listen(3500,()=>{
    console.log(`Server Listening on ${PORT}`);
})