const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.set("strictQuery", false);


const connectDB = require("./config/db");
const MongoURI = process.env.MONGO_URI;

// App variables
const app = express(); // Move this line to the top
const port = process.env.PORT || "8000";

app.use(express.json());

app.use(cors());

const {login }= require("./controllers/userController");
 app.post('/api/login', login);
 const userRoute = require("./Routes/userRoute");
// Importing the adRouter
const adRouter = require("./Routes/adRoutes");
app.use("/api/admin", adRouter);
const paRouter = require("./Routes/paRoutes");
app.use("/api/patient", paRouter);
const phRouter = require("./Routes/phRoutes");
app.use("/api/pharmacist", phRouter);

// configurations
// Mongo DB

// Rest of your code
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

connectDB()
  .then(() => {
    console.log("MongoDB is now connected!");

    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));

// Routing to userController here
