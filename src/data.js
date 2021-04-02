const fs = require("fs");
const path = require("path");

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

const writeJSON = (accountsJSON) => {
  fs.writeFileSync(
    path.join(__dirname, "json", "accounts.json"),
    String(accountsJSON),
    "utf8"
  );
};

module.exports.accounts = accounts;
module.exports.users = users;
module.exports.writeJSON = writeJSON;
