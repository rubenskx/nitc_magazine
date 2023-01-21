const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const flash = require("connect-flash");

const { allowedNodeEnvironmentFlags } = require("process");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "magazine",
  multipleStatements: true,
});

app.use(
  session({
    secret: "webslesson",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.session) res.locals.currentUser = req.session.userid;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/article", async (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(`SELECT * from article`, async (err, data) => {
      connection.release();
      if (err) console.log(err);
      else {
        console.log(data);
      }
    });
  });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
