var loggedIn = require("/.signIn");

if (loggedIn)
    console.log("Logged in");
else
    console.log("Bad request");

