// load express package 
let express = require("express");
let parser = require("body-parser");

// init firebase package
let admin = require("firebase-admin");
let serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lesson3-b425f.firebaseio.com"
});

// Estbalish connection with database
let database = admin.database();

// create applicatoin object
let app = express();
// create static website
app.use(express.static("www"));

// establish 接受 post 方法參數的能力
app.use(parser.urlencoded({
    extended: true
}));

app.post("/signup", function (req, res) {
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let time = (new Date()).getTime(); // 1970/1/1 到現在過了幾個毫秒
    // put user info into database
    // Get the parent only
    let ref = database.ref("/users");
    ref.push({
        name: name,
        username: username,
        password: password
    }, function (error) {
        if (error) {
            res.send("Error");
        } else {
            res.send("Ok");
        }
    });
});

app.listen(3000, function () {
    console.log("Server Started");
});