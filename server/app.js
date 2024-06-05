require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const app = express();

// Session middleware configuration
app.use(
  session({
    // secret: process.env.SESSION_SECRET,
    secret: "my_session_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// Setting up cors
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin
    // (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

// Loading Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");
const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");

// Auth middleware
const { requireAuth, requireAdminAuth } = require("./middleware/requireAuth");

// Mounting the routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/public", publicRoutes);

// Public Api for accessing images
app.use("/api/img", express.static(__dirname + "/public/products/"));
app.use("/api/off", express.static(__dirname + "/public/official/"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
