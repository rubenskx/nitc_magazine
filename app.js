const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { allowedNodeEnvironmentFlags } = require("process");
const bcrypt=require('bcrypt');
const jquery=require('jquery');

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "magazine",
  multipleStatements: "true" ,//this is required for querying multiple statements in mysql
  port:8111
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

app.get("/article/create", (req, res) => {
  res.render("routes/article_create");
});

app.post("/article/create", async (req, res) => {
  let mm = new Date().toISOString().slice(0, 10).replace("T", " ");

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

app.get("/article/:id/show", async (req, res) => {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * from article where article_id=${id}; SELECT * from comments where reviewer_id=1 AND article_id=${id} LIMIT 1`,
      async (err, data) => {
        connection.release();
        if (err) console.log(err);
        else {
          //console.log(data);
          comment = data[1][0];
          data = data[0][0];
          console.log(data,comment);
          res.render("routes/article_show", { data, comment});
        }
      }
    );
  });
});

app.get("/article/:id/edit", async (req, res) => {
  const { id } = req.params;

  pool.getConnection(function (err, connection) {
    connection.query(
      `Select * from article where article_id=${id}`,
      async (err, article) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.render("routes/article_edit.ejs", { article: article[0] });
        }
      }
    );
  });
});

app.post("/article/:id/edit", async (req, res) => {
  const { id } = req.params;
  let { articleAuthor, articleContent, articleHeading } = req.body;
  pool.getConnection(function (err, connection) {
    connection.query(
      `UPDATE article SET author_name="${articleAuthor}",title="${articleHeading}",content="${articleContent}" WHERE article_id=${id}`,
      async (err, article) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect("/article");
        }
      }
    );
  });
});

app.post("/article/:id/delete", async (req, res) => {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `DELETE FROM article  WHERE article_id=${id}`,
      async (err, article) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect("/article");
        }
      }
    );
  });
});

app.post("/article/:id/comment", async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().slice(0, 10).replace("T", " ");
  pool.getConnection(function (err, connection) {
    connection.query(
      `INSERT INTO comments(content,rating,c_date,article_id,reviewer_id) VALUES("${req.body.content}", ${req.body.rating}, ${date}, ${id}, 1)`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect(`/article/${id}/show`);
        }
      }
    );
  });
});


app.put("/article/:id/comment/:cid", async(req,res)=> {
    const { id } = req.params;
    const { content, rating} = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(
        `UPDATE comments SET content="${content}",rating=${rating} WHERE comment_id=${id}`,
        async (err, data) => {
          connection.release();
          if (err) console.log(err);
          else {
            res.redirect(`/article/${id}/show`);
          }
        }
      );
    });
})

app.get('/reviewer/create', (req, res) => {

    res.render('routes/reviewer_create');
  
});

app.post('/reviewer/create',async (req ,res)=>{
  const {rName,rUsername,rPassword,rDob}=req.body;
  const hash=await bcrypt.hash(rPassword,12)
  console.log(hash);
  pool.getConnection(function (err, connection) {
    connection.query(
      `INSERT INTO reviewer(username,login_password,name,dob) VALUES ("${rUsername}","${hash}","${rName}","${rDob}")`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect("/reviewer");
        }
      }
    );
  });
})

app.get('/reviewer',async (req,res)=>{
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * from reviewer`,
      async (err, reviewers) => {
        connection.release();
        if (err) console.log(err);
        else {
          console.log(reviewers);
          res.render("routes/reviewer", { reviewers } );
        }
      }
    );
  });

})

app.get('/reviewer/:id/edit',async (req,res)=>{
  const {id}=req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * from reviewer WHERE reviewer_id=${id}`,
      async (err, reviewers) => {
        connection.release();
        if (err) console.log(err);
        else {
          
          res.render("routes/reviewer_edit", { rev:reviewers[0] } );
        }
      }
    );
  });

})

app.post('/reviewer/:id/edit',async (req, res) => {
  const {id}=req.params;
  const {rName,rUsername,rDob,rPassword}=req.body;
  const hash=await bcrypt.hash(rPassword,12);
  pool.getConnection(function (err, connection) {
    connection.query(
      `UPDATE reviewer SET username="${rUsername}",login_password="${hash}",dob="${rDob}",name="${rName}" WHERE reviewer_id=${id}`,
      async (err, reviewers) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect("/reviewer");
        }
      }
    );
  });
});

app.post('/reviewer/:id/delete',async (req, res) => {
  const {id}=req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `Delete FROM reviewer  WHERE reviewer_id=${id}`,
      async (err, reviewers) => {
        connection.release();
        if (err) console.log(err);
        else {
          res.redirect("/reviewer");
        }
      }
    );
  });
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
