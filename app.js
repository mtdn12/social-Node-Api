const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/index");
// Import routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("DB Connected");
});
mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }
});

const PORT = config.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App run on port ${PORT}`);
});
