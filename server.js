const express = require("express");
const next = require("next");
const server = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mongoose = require("mongoose");
mongoose.connect("mongodb://admin:admin1234@ds031845.mlab.com:31845/test-gn");

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//require
require("./modal/UserModal");
require("dotenv").config();

app
  .prepare()
  .then(() => {
    // server.get("/p/:id", (req, res) => {
    //   const actualPage = "/post";
    //   const queryParams = { title: req.params.id };
    //   app.render(req, res, actualPage, queryParams);
    // });

    require("./routes/Auth")(server);

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
