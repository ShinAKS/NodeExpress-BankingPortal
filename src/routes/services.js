const express = require("express");
const router = express.Router();

const { accounts, writeJSON } = require("../data");

router.get("/transfer", (req, res) => {
  res.render("transfer");
});

router.get("/payment", (req, res) => {
  res.render("payment", { account: accounts.credit });
});

router.post("/payment", (req, res) => {
  accounts.credit.balance -= parseInt(req.body.amount);
  accounts.credit.available += parseInt(req.body.amount);
  const accountsJSON = JSON.stringify(accounts, null, 4);
  writeJSON(accountsJSON);

  res.render("payment", {
    message: "Payment Successsful",
    account: accounts.credit,
  });
});

router.post("/transfer", (req, res) => {
  let request = req.body;

  accounts[request.from].balance -= parseInt(request.amount);
  accounts[request.to].balance += parseInt(request.amount);

  // console.log(accounts[request.from]);
  const accountsJSON = JSON.stringify(accounts, null, 4);

  writeJSON(accountsJSON);
  res.render("transfer", { message: "Transfer Completed" });
});

module.exports = router;
