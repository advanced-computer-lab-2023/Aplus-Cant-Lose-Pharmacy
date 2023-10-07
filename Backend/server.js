const express = require("express");
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require("dotenv").config();

const connectDB = require('./config/db')

// App variables
const app = express(); // Move this line to the top
const port = process.env.PORT || "8000";

app.use(express.json());

const MongoURI = process.env.MONGO_URI ;

// Importing the adRouter
const adRouter = require('./Routes/adRoutes');
app.use('/api/admin', adRouter);
const paRouter = require('./Routes/paRoutes');
app.use('/api/patient', paRouter);
const phRouter = require('./Routes/phRoutes');
app.use('/api/pharmacist', phRouter);


// configurations
// Mongo DB
connectDB()
.then(() => {
  console.log("MongoDB is now connected!");

  // Starting server
  app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
})
.catch(err => console.log(err));

// Rest of your code
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// Routing to userController here
