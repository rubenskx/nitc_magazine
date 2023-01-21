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


app.post('/article/create', async (req, res) => {
  
  let mm = new Date().toISOString().slice(0,10).replace('T',' ');
  

  pool.getConnection(function (err, connection) {
    connection.query(`INSERT INTO article(content,upload_date,author_name,title,status,avg_rating) VALUES ("${req.body.articleContent}","${mm}","${req.body.articleAuthor}","${req.body.articleHeading}","unrated",0)`, async (err, articles) => {
      connection.release();
      if (err) console.log(err);
      else {
         res.redirect('/article')
      }
    });
  });
 
});


app.get('/article/:id/show', async(req,res)=> {
          const { id }  = req.params;
          pool.getConnection(function (err, connection) {
            connection.query(
              `SELECT *, DATE_FORMAT(upload_date, '%d-%m-%Y') AS date from article where article_id=${id}`,
              async (err, data) => {
                connection.release();
                if (err) console.log(err);
                else {
                data = data[0];
                  res.render("routes/article_show", { data });
                }
              }
            );
          });
})
app.get('/article/edit/:id', async (req,res)=>{
  const {id}=req.params;
  
  pool.getConnection(function (err, connection) {
    connection.query(`Select * from article where article_id=${id}`, async (err, article) => {
      connection.release();
      if (err) console.log(err);
      else {
          
         res.render('./routes/article_edit.ejs',{article:article[0]})
      }
    });
  });


})

app.post('/article/edit/:id',async (req, res) => {
  const {id}=req.params;
  let {articleAuthor,articleContent,articleHeading}=req.body;
  pool.getConnection(function (err, connection) {
    connection.query(`UPDATE article SET author_name="${articleAuthor}",title="${articleHeading}",content="${articleContent}" WHERE article_id=${id}`, async (err, article) => {
      connection.release();
      if (err) console.log(err);
      else {
        res.redirect('/article')
      }
    });
  });
});



app.post('/article/delete/:id',async (req, res) => {
  const {id}=req.params;
  let {articleAuthor,articleContent,articleHeading}=req.body;
  pool.getConnection(function (err, connection) {
    connection.query(`DELETE FROM article  WHERE article_id=${id}`, async (err, article) => {
      connection.release();
      if (err) console.log(err);
      else {
        res.redirect('/article')
      }
    });
  });
});




app.post("/article/:id/comment", async (req, res) => {

  pool.getConnection(function (err, connection) {
    connection.query(
      `INSERT INTO article(content,upload_date,author_name,title,status,avg_rating) VALUES ("${req.body.articleContent}","${mm}","${req.body.articleAuthor}","${req.body.articleHeading}","unrated",0)`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect("/article");
        }
      }
    );
  });
});






app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
