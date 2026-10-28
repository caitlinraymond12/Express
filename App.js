const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000; 

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res)=>{
    res.send("Hello from express");

});

app.get("/hello", (req, res)=>{
    res.send("hello wolrd");
});

app.get("/home", (req, res) => {
    res.render("home", {title: "My Page"});
});

app.get("/form", (req, res) => {
    res.render("survey", {title:"Survey"})
});

app.post("/form", (req, res) => {
    const animal = req.body.animal;

    //the cookie we will change in our program
    let votes = {
        narwhal: 0,
        seal: 0, 
        penguin: 0
    };

    //does cookie exist
    if(req.cookies.votes !== undefined){
        votes = req.cookies.votes;
    }

    if(votes[animal] === undefined){
        votes[animal] = 0;
    }

    votes[animal] += 1;

    //settingn expiration of cookies 
    res.cookie("votes", votes, {maxAge: 7 * 24 * 60 * 60 * 1000});

    res.render("response", {
        votes: votes
    });
});

app.delete("/clear", (req, res) => {
    res.clearCookie("votes");
    res.send("Votes cleared" + "<a href='/form'>Back to form</a>");
});

app.get("/:name", (req, res) => {
    res.send("My name is: " + req.params.name);
});

app.listen(port, ()=>{
    let message = "Server running at http://localhost:${port}"
    console.log(message);
})