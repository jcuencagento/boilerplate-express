let express = require('express');
const bodyParser = require("body-parser");
let app = express();

app.use(bodyParser.urlencoded({extended: false}));

console.log("Hello World");

app.use((req, res, next) => {
  console.log(req.method+" "+req.path+" - "+req.ip);
  next();
});

app.use("/public", express.static(__dirname +"/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  response = "Hello json"
  if (process.env.MESSAGE_STYLE === "uppercase") response = response.toUpperCase(); 
  res.json({"message": response});
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.json({"time": req.time});
});

app.get("/:word/echo", (req, res) => {
  res.json({"echo": req.params.word})
});

app.post("/name", (req, res) => {
  let fullName = req.body.first + " " + req.body.last;
  res.json({ name: fullName });
});

//app.get("/name", (req,res) => {
  //let { first: firstName, last: lastName } = req.query;
  //res.json({name: `${firstName} ${lastName}`});
//});




























 module.exports = app;
