const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");

const { allowedNodeEnvironmentFlags } = require("process");

app.engine("ejs", ejsMate);
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
    connection.query(
      `SELECT *, DATE_FORMAT(upload_date, '%d-%m-%Y') AS date from article`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.render("routes/article", { articles });
        }
      }
    );
  });
});




app.get("/article/create",(req,res)=>{

  res.render('routes/article_create');

})










app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
