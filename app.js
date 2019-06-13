const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressValidator = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");

const config = require("./config/index");
// Import routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
// apiDocs
app.get("/", (req, res) => {
  fs.readFile("./docs/apiDocs.json", (err, data) => {
    if (err) {
      return res.status(404).json({
        result: "fail",
        error: "Something went wrong!!"
      });
    }
    const docs = JSON.parse(data);
    return res.status(200).json({
      result: "success",
      docs
    });
  });
});

mongoose.connect(config.MONGO_URI, { useNewUrlParser: true }).then(() => {
  console.log("DB Connected");
});
mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(morgan("dev"));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
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
