

const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require('path');
const app = express();
mongoose.connect("mongodb://localhost:27017/GYMdb", { useNewUrlParser: true });


app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

const GymSchema = new mongoose.Schema({
    email: String,
    phone_number: Number
});
const GYM = mongoose.model("GYM", GymSchema);



app.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'public' });
});
app.get('/about', function (req, res) {

    res.sendFile('about.html', { root: 'public' });
});
app.get('/joining', function (req, res) {
    res.sendFile('joining.html', { root: 'public' });
});


app.post("/", function (req, res) {
    const mail = req.body.email;
    const num = req.body.number;

    const gym = new GYM({
        email: mail,
        phone_number: num
    });
    gym.save();
    console.log(mail + "    " + num);

    res.sendFile('successful.html', { root: 'public' });


});
app.listen(3000, function () {
    console.log("Server started on port 3000");
});