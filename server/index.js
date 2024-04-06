require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/api/books");
const cors = require("cors");
const bodyParser = require("body-parser");
const userroute = require("./routes/api/auth");

const app = express();

// use the cors middleware with the
// origin and credentials options
app.use(cors(
  {
    origin : "https://book-insights.netlify.app",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
  }
));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use the routes module as a middleware
// for the /api/books path
app.use("/api/books", routes);
app.use("/api/auth", userroute);

// Connect Database
mongoose
  .connect(process.env.URL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello world!"));
const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on port ${port}`));
