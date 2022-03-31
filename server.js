const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const slug = require("slug");

const getUserData = require("./database");

const dbName = "tech-3-3";

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((err, req, res, next) => {
  res.status(404).send("404 not found");
});

app.get("/", (req, res) => {
  res.render("login", {
    pageTitle: `log-in`,
  });
});

app.get("/signup", (req, res) => {
  res.render("signup", {
    pageTitle: `sign-up`,
  });
});

app.get("/profile/:id", (req, res) => {
  getUserData(dbName)
    .then((user) =>
      user.findOne({
        username: req.params.id,
      })
    )
    .then((foundUser) =>
      res.render("profile", {
        data: foundUser,
        pageTitle: `profile`,
      })
    );
});

app.get("/error/:id", (req, res) => {
  req.params.id === "email"
    ? res.render("error", {
        data: "De gekozen e-mail adres is al in gebruik",
        pageTitle: `error`,
      })
    : res.render("error", {
        data: "Gebruiker niet gevonden",
        pageTitle: `error`,
      });
});

app.post("/", checkForUser);
app.post("/signup", createUser);

app.listen(port, function () {
  console.log(`Application started on port: ${port}`);
});

function createUser(req, res) {
  const username = slug(req.body.username).toLowerCase();

  let newUserData = {
    username: username,
    password: req.body.password,
    name: req.body.name,
    likes: req.body.interests,
    email: req.body.email,
  };

  getUserData(dbName).then(async (data) => {
    const emailCheck = await data.findOne({ email: req.body.email });

    if (emailCheck === null) {
      data.insertOne(newUserData);
      res.redirect("/profile/" + username);
    } else {
      res.redirect("/error/" + "email");
    }
  });
}

function checkForUser(req, res) {
  const username = slug(req.body.username).toLowerCase();

  getUserData(dbName)
    .then((data) =>
      data.findOne({
        username: req.body.username,
        password: req.body.password,
      })
    )
    .then((user) =>
      user
        ? res.redirect("/profile/" + username)
        : res.redirect("/error/" + "user")
    );
}
