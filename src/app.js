const fs = require("fs");
const path = require("path");
const express = require("express");
const { applySpec } = require("ramda");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  express.static(path.join(__dirname, "public")),
  express.urlencoded({ extended: false })
);

//Read the account Data from accounts file
const accountData = fs.readFileSync("src/json/accounts.json", {
  encoding: "utf8",
  flag: "r",
});

const accounts = JSON.parse(accountData);

//Read the users data from users file
const userData = fs.readFileSync("src/json/users.json", {
  encoding: "utf8",
  flag: "r",
});

const users = JSON.parse(userData);

app.get("/", (req, res) => {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

app.get("/savings", (req, res) => {
  res.render("account", { account: accounts.savings });
});
app.get("/checking", (req, res) => {
  res.render("account", { account: accounts.checking });
});
app.get("/credit", (req, res) => {
  res.render("account", { account: accounts.credit });
});

app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

app.get("/transfer", (req, res) => {
  res.render("transfer");
});

app.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

app.post("/payment", (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);
  let accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, {
    encoding: "utf8",
    flag: "w",
  });
  res.render("payment", {
    message: "Payment Successsful",
    account: accounts.credit,
  });
});

app.post("/transfer", (req, res) => {
  let request = req.body;

  accounts[request.from].balance -= parseInt(request.amount);
  accounts[request.to].balance += parseInt(request.amount);

  // console.log(accounts[request.from]);
  let accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, "json/accounts.json"), accountsJSON, {
    encoding: "utf8",
    flag: "w",
  });
  res.render("transfer", { message: "Transfer Completed" });
});
app.listen(3000, () => {
  console.log("PS Project Running on port 3000!");
});
