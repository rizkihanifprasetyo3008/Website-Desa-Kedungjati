const express = require("express");
const app = express();
const port = 3030;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const db_kedungjati = require("./server/database/connection");
const session = require("express-session");



// log requests
app.use(morgan("tiny"));

// database connection
db_kedungjati.connect((err) => {
  if (err) throw err;
  console.log("MySQL berhasil terkoneksi...");
});
// session store
app.use(
  session({
    secret: "kedungjati",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 3600000 // Set the session duration to 1 hour
    }
  })
);



// parse request body
app.use(bodyParser.urlencoded({ extended: true }));



// set view engine (views folder)
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
app.use(expressLayouts);

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use("/", require("./server/routes/router"));


app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
