var http = require("http");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var MongoStore = require("connect-mongo")(session);

var app = express();

app.locals.pretty = true;
app.set("port", process.env.PORT || 3000);
app.set("views", __dirname + "/app/server/views");
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("stylus").middleware({ src: __dirname + "/app/public" }));
app.use(express.static(__dirname + "/app/public"));

// build mongo database connection url //

console.log("process.env:");
console.log(process.env);

if (process.env.NODE_ENV != "production") {
  process.env.DB_HOST = process.env.DB_HOST || "localhost";
  process.env.DB_PORT = process.env.DB_PORT || 27017;
  console.log("NOT production! " + process.env.NODE_ENV);
  process.env.DB_URL =
    "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT;
  process.env.DB_NAME = process.env.DB_NAME || "node-login";
} else {
  console.log("In production! " + app.get("NODE_ENV"));
  console.log("process.env.MONGODB_URI " + process.env.MONGODB_URI);
  process.env.DB_URL = process.env.MONGODB_URI;
  process.env.DB_NAME = "heroku_f9580pm6";
  console.log("process.env.DB_URL " + process.env.DB_URL);
}

process.env.DB_URL =
  "mongodb://heroku_f9580pm6:u6s48ot6lrqcp7q8vfavm7ei8h@ds139949.mlab.com:39949/heroku_f9580pm6";
process.env.DB_NAME = "heroku_f9580pm6";

app.use(
  session({
    secret: "faeb4453e5d14fe6f6d04637f78077c76c73d1b4",
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.DB_URL })
  })
);

require("./app/server/routes")(app);

http.createServer(app).listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});
