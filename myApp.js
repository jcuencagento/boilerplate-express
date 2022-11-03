let express = require('express');
let app = express();

console.log("Hello World")

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




























 module.exports = app;
