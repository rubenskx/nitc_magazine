const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const { allowedNodeEnvironmentFlags, emitWarning } = require("process");
const bcrypt = require("bcrypt");
const jquery = require("jquery");
const router=express.Router();
const nodemailer = require('nodemailer');
const  seedPics  =  require('./utils/picHelpers');
const Math = require('mathjs')

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());

a=10;

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "magazine",
  multipleStatements: "true", //this is required for querying multiple statements in mysql

});

app.use(
  session({
    secret: "webslesson",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.session.username) res.locals.username = req.session.username;
  if (req.session.type) res.locals.admin = req.session.type;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const requireLoginReviewer = (req, res, next) => {
  if (!req.session.username) {
    return res.redirect("/login");
  }
  next();
};

const requireLoginAdmin = (req, res, next) => {
  if (req.session.type == "admin") {
    next();
  } else {
    return res.redirect("/login");
  }
};

app.get("/login", async (req, res) => {
   res.render("routes/login");
});
app.get("/forgotpassword", async (req, res) => {
  res.render("routes/forgotpassword");
});


app.post("/login", async (req, res) => {
  const { password, username } = req.body;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * FROM reviewer WHERE username="${username}";`,
      async (err, data) => {
        connection.release();
        if (err) console.log(err);
        else {
          if (username.includes("@nitc.ac.in") && data.length > 0) {
            console.log(password, data[0].login_password);
            const match = await bcrypt.compare(
              password,
              data[0].login_password
            );
            console.log(match);
            if (match) {
              console.log("this is correct!");
              req.session.username = data[0].username;
              req.session.userid = data[0].reviewer_id;
              req.session.type = data[0].post;
              req.flash("success", `Welcome back ${data[0].name}!`);
              if (data[0].post === "admin") res.redirect("/select");
              else res.redirect("/article");
            } else {
              req.flash("error", `Incorrect name or password!`);
              res.redirect("/login");
            }
          } else {
            if (data.length === 0) {
              req.flash("error", `Incorrect name or password!`);
              res.redirect("/login");
            } else {
              req.flash("error", `Please provide a valid NITC email id!`);
              res.redirect("/login");
            }
          }
        }
      }
    );
  });
});

app.post("/logout", (req, res) => {
  req.session.user_id = null;
  req.session.username = null;
  req.session.type = null;
  req.session.destroy();
  res.redirect("/login");
});

app.post("/forgotpassword",async(req,res)=>{
  const {username}=req.body;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * FROM reviewer WHERE username="${username}";`,
      async (err, data) => {
        connection.release();
        if (err) console.log(err);
        else {
          if (data.length===0){
            req.flash("error","Username does not exist!");
            res.redirect("/forgotpassword");
          }
          else{
            //generate 6 digit random number
            a = Math.floor((Math.random() * 1000000) );
            var code={a};
            //send email
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'abhay_b200732cs@nitc.ac.in',
                pass: '10-17-02'
              }
            });
            
            
            var mailOptions = {
              from: 'abhay_b200732cs@nitc.ac.in',
              to: `${username}`,
              subject: 'Sending Email using Node.js',
              text: `Hello ${username}, your code is ${a}`,
              // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
            };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
                req.flash("error","Email was not sent because of an error or busy servers");
                res.redirect("/forgotpassword");
              } else {
                console.log('Email sent: ' + info.response);
                req.flash("success","Email has been sent");
                res.redirect(`/entercode/${username}`);
              }
            });
          }
        }
      }
    );
  });
      
});

app.get("/entercode/:username", async(req,res)=>{
  const {username}=req.params;
  res.render("routes/entercode",{username});
});

app.post("/entercode/:username",async(req,res)=>{
  const {username}=req.params;
  const {rcode1}=req.body;
  const {rcode2}=req.body;
  const {rcode3}=req.body;
  const {rcode4}=req.body;
  const {rcode5}=req.body;
  const {rcode6}=req.body;
  var rcode=rcode1*100000+rcode2*10000+rcode3*1000+rcode4*100+rcode5*10+rcode6*1;
  if(a!=rcode){
    req.flash("error","Wrong Code!");
    console.log(`${a},${rcode},${rcode1},${rcode2},${rcode3},${rcode4},${rcode5},${rcode6}`);
    res.redirect(`/entercode/${username}`);
  }
  else{
    req.flash("success","Correct Code!");
    pool.getConnection(function (err, connection) {
      connection.query(
        `SELECT * FROM reviewer WHERE username="${username}";`,
        async (err, data) => {
          connection.release();
          if (err) console.log(err);
          else {
              console.log("this is correct!");
              req.session.username = data[0].username;
              req.session.userid = data[0].reviewer_id;
              req.session.type = data[0].post;
              req.flash("success", `Welcome back ${data[0].name}!`);
              if (data[0].post === "admin") res.redirect("/select");
              else res.redirect("/article");
            }
        }
      );
    });
  }
});

app.get("/article", requireLoginReviewer, async (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT *, DATE_FORMAT(upload_date, '%d-%m-%Y') AS date from article where status<>"rated"`,
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

app.get(
  "/article/create",
  requireLoginReviewer,
  requireLoginAdmin,
  (req, res) => {
    res.render("routes/article_create");
  }
);

app.post(
  "/article/create",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    let mm = new Date().toISOString().slice(0, 10).replace("T", " ");
    const imgSrc = seedPics[Math.floor(Math.random()*8)];
    req.body.articleContent = req.body.articleContent.replace("\r\n", "</br></br>");
    pool.getConnection(function (err, connection) {
      connection.query(
        `INSERT INTO article(content,upload_date,author_name,title,status,avg_rating,img) VALUES ("${req.body.articleContent}","${mm}","${req.body.articleAuthor}","${req.body.articleHeading}","unrated",0,"${imgSrc}")`,
        async (err, articles) => {
          connection.release();
          if (err) console.log(err);
          else {
            res.redirect("/select");
          }
        }
      );
    });
  }
);

app.get("/article/:id/show", requireLoginReviewer, async (req, res) => {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * from article where article_id=${id}; SELECT * from comments where reviewer_id=${req.session.userid} AND article_id=${id} LIMIT 1`,
      async (err, data) => {
        connection.release();
        if (err) console.log(err);
        else {
          //console.log(data);
          comment = data[1][0];
          data = data[0][0];
          console.log(data, comment);
          res.render("routes/article_show", { data, comment });
        }
      }
    );
  });
});

app.get(
  "/article/:id/edit",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
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
  }
);

app.post(
  "/article/:id/edit",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    const { id } = req.params;
    let { articleAuthor, articleContent, articleHeading } = req.body;
    pool.getConnection(function (err, connection) {
      connection.query(
        `UPDATE article SET author_name="${articleAuthor}",title="${articleHeading}",content="${articleContent}" WHERE article_id=${id}`,
        async (err, article) => {
          connection.release();
          if (err) console.log(err);
          else {
            req.flash("success", "Edited article successfully!");
            res.redirect("/select");
          }
        }
      );
    });
  }
);

app.post(
  "/article/:id/delete",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    const { id } = req.params;
    pool.getConnection(function (err, connection) {
      connection.query(
        `DELETE FROM article  WHERE article_id=${id}`,
        async (err, article) => {
          connection.release();
          if (err) console.log(err);
          else {
            req.flash("success", "Deleted article successfully!");
            res.redirect("/select");
          }
        }
      );
    });
  }
);

app.post("/article/:id/comment", requireLoginReviewer, async (req, res) => {
  const { id } = req.params;
  const date = new Date().toISOString().slice(0, 10).replace("T", " ");
  pool.getConnection(function (err, connection) {
    connection.query(
      `INSERT INTO comments(content,rating,c_date,article_id,reviewer_id) VALUES("${req.body.content}", ${req.body.rating}, ${date}, ${id}, ${req.session.userid}); UPDATE article SET count=count+1; SELECT * FROM article`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
            const waitingUpdate = (articles[2][0].count > 5) ? `UPDATE article set status="waiting";` : ``;
            const conditional = `WHERE article_id=${id}`;
            const newRating =((articles[2][0].count - 1) * articles[2][0].avg_rating + parseInt(req.body.rating))/(articles[2][0].count);
              console.log(newRating,articles[2][0].count,articles[2][0].avg_rating,req.body.rating);
              pool.getConnection(function (err, connection) {
                connection.query(
                  `UPDATE article SET avg_rating=${newRating} ${conditional};${waitingUpdate} ${conditional}`,
                  async (err, data) => {
                    connection.release();
                    if (err) console.log(err);
                  }
                );
              });
                req.flash("success","Updated review successfully!");
                res.redirect(`/article`);
      }
    }
    );
  });
});

app.put("/article/:id/comment/:cid", requireLoginReviewer, async (req, res) => {
  const { id, cid } = req.params;
  const { content, rating } = req.body;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT rating FROM comments WHERE comment_id=${cid}; UPDATE comments SET content="${content}",rating=${rating} WHERE comment_id=${cid}; SELECT * from article WHERE article_id=${id};`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
              const conditional = `WHERE article_id=${id}`;
              const newRating = (articles[2][0].avg_rating*articles[2][0].count  - articles[0][0].rating + parseInt(rating))/articles[2][0].count;
              console.log(newRating,articles[2][0].count,articles[2][0].avg_rating,parseInt(rating));
              pool.getConnection(function (err, connection) {
                connection.query(
                  `UPDATE article SET avg_rating=${newRating} ${conditional};`,
                  async (err, data) => {
                    connection.release();
                    if (err) console.log(err);
                  }
                );
              });
          req.flash("success", "Updated review successfully!");
          res.redirect(`/article`);
        }
      }
    );
  });
});

app.get(
  "/reviewer/create",
  requireLoginReviewer,
  requireLoginAdmin,
  (req, res) => {
    res.render("routes/reviewer_create");
  }
);

app.post(
  "/reviewer/create",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    const { rName, rUsername, rPassword, rDob } = req.body;
    if (rUsername.includes("@nitc.ac.in")) {
      const hash = await bcrypt.hash(rPassword, 10);
      console.log(hash);
      pool.getConnection(function (err, connection) {
        connection.query(
          `INSERT INTO reviewer(username,login_password,name,dob,post) VALUES ("${rUsername}","${hash}","${rName}","${rDob}","reviewer")`,
          async (err, articles) => {
            connection.release();
            if (err) {
              req.flash("error","This email already exists, please enter different email")
              res.redirect("/reviewer/create");
            }
            else {
              req.flash("success", "Created reviewer successfully!");
              res.redirect("/reviewer");
            }
          }
        );
      });
    } else {
      req.flash("error", "Please enter a valid NITC email id!");
      res.redirect("/reviewer/create");
    }
  }
);

app.get(
  "/reviewer",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    pool.getConnection(function (err, connection) {
      connection.query(
        `SELECT * from reviewer where post <> "admin" `,
        async (err, reviewers) => {
          connection.release();
          if (err) console.log(err);
          else {
            console.log(reviewers);
            res.render("routes/reviewer", { reviewers });
          }
        }
      );
    });
  }
);

app.get(
  "/reviewer/:id/edit",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    const { id } = req.params;
    pool.getConnection(function (err, connection) {
      connection.query(
        `SELECT * from reviewer WHERE reviewer_id=${id}`,
        async (err, reviewers) => {
          connection.release();
          if (err) console.log(err);
          else {
            res.render("routes/reviewer_edit", { rev: reviewers[0] });
          }
        }
      );
    });
  }
);

app.post(
  "/reviewer/:id/edit",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    const { id } = req.params;
    const { rName, rUsername, rDob, rPassword } = req.body;
    const hash = await bcrypt.hash(rPassword, 12);
    pool.getConnection(function (err, connection) {
      connection.query(
        `UPDATE reviewer SET username="${rUsername}",login_password="${hash}",dob="${rDob}",name="${rName}" WHERE reviewer_id=${id}`,
        async (err, reviewers) => {
          connection.release();
          if (err) {
            req.flash("error","This email already exists, please enter different email")
            res.redirect("/reviewer/${id}/edit");
          }
          else {
            req.flash("success", "Updated reviewer details successfully!");
            res.redirect("/reviewer");
          }
        }
      );
    });
  }
);

app.post(
  "/reviewer/:id/delete",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    const { id } = req.params;
    pool.getConnection(function (err, connection) {
      connection.query(
        `Delete FROM reviewer  WHERE reviewer_id=${id}`,
        async (err, reviewers) => {
          connection.release();
          if (err) console.log(err);
          else {
            req.flash("success", "Deleted reviewer successfully!");
            res.redirect("/reviewer");
          }
        }
      );
    });
  }
);

app.get(
  "/select",
  requireLoginReviewer,
  requireLoginAdmin,
  async (req, res) => {
    pool.getConnection(function (err, connection) {
      connection.query(
        `SELECT * FROM article WHERE status="waiting" ORDER BY avg_rating DESC`,
        async (err, articles) => {
          connection.release();
          if (err) console.log(err);
          else {
            console.log(articles);
            res.render("routes/select", { articles });
          }
        }
      );
    });
  }
);

app.get("/select/:id/show", requireLoginReviewer, async (req, res) => {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `SELECT * from article where article_id=${id}; SELECT *, reviewer.username from comments,reviewer where article_id=${id} and reviewer.reviewer_id=comments.reviewer_id; SELECT AVG(comments.rating) AS avg FROM comments, article where article.article_id=comments.article_id AND article.article_id=${id};`,
      async (err, data) => {
        connection.release();
        if (err) console.log(err);
        else {
          //console.log(data);
          comments = data[1];
          avg = data[2][0];
          data = data[0][0];
          console.log(data, comments, avg);
          res.render("routes/admin_show", { data, comments, avg });
        }
      }
    );
  });
});

app.post("/select/:id", async (req, res) => {
  const { id } = req.params;
  pool.getConnection(function (err, connection) {
    connection.query(
      `UPDATE article set status="rated" WHERE article_id=${id};`,
      async (err, articles) => {
        connection.release();
        if (err) console.log(err);
        else {
          req.flash("success", "Selected article successfully!");
          res.redirect("/select");
        }
      }
    );
  });
});

app.get('/register', async(req,res)=> {
  res.render("routes/sign_up.ejs");
})



app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000!");
});
