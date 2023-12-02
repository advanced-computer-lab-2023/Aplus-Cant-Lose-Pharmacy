const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); // This loads the variables from .env into process.env
const Medicine = require("./Models/medicine");

const messageRoutes = require("./Routes/messageRoutes");
const path = require("path");
mongoose.set("strictQuery", false);

const connectDB = require("./config/db");
const MongoURI = process.env.MONGO_URI;


// App variables
const app = express();
const port = process.env.PORT || "5000";

// Middleware
app.use(express.json());
app.use(cors());
connectDB()
  .then(() => {
    console.log("MongoDB is now connected!");

    // Starting server
  
  })
  .catch((err) => console.log(err));
const server=  app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
app.use('/public', express.static(path.join(__dirname, 'public')));
// Routes
const { login, sendResetEmail, changePassword, changePass, logout } = require("./controllers/userController");
app.post('/api/login', login);
app.get('/api/logout', logout);
app.post("/api/changePass/:username", changePass);
app.post("/api/sendResetEmail", sendResetEmail);
app.post("/api/changePassword/:id/:token", changePassword);

// User-related routes
const userRoute = require("./Routes/userRoute");

// Routes for different roles
const adRouter = require("./Routes/adRoutes");
app.use("/api/admin", adRouter);

const paRouter = require("./Routes/paRoutes");
app.use("/api/patient", paRouter);


const phRouter = require("./Routes/phRoutes");
app.use("/api/pharmacist", phRouter);

// Basic endpoint for testing
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// MongoDB connection and starting server

  app.use("/api/user", userRoute);
  const chatRoutes = require("./Routes/chatRoutes");

app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);



// --------------------------deployment------------------------------

// Error Handling middlewares


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData);
    socket.join(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

