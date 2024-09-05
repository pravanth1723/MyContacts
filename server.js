const express = require('express')
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const app = express();
app.use(cors());

const path = require('path');

const port = 5500;
connectDb();
console.log("This is express");
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(cors(
  {
    origin:['https://deploy-mern-lwhq.vercel.app'],
    methods:['POST','GET','PUT','DELETE'],
    credentials:true
  }
));
console.log('hi');
app.use("/api/contacts", require("./routes/contactRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:5500;");

  // If using nonce-based CSP:
  // const nonce = Buffer.from(Date.now().toString()).toString('base64');
  // res. etHeader("Content-Security-Policy", `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' http://localhost:5500;`);
  
  next();
});


app.use(errorHandler);

app.listen(port, () => {
  console.log(`server ruuning on ${port}`);
});