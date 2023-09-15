const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const crypto = require("crypto");
const colors = require("colors");
var MyInfoConnector = require("myinfo-connector-nodejs");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userModel = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const listingRoutes = require("./routes/listingRoutes");
const commentRoutes = require("./routes/commentRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// Database connection START//
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB).then((con) => {
  console.log("db connection successful");
});
// Database connection END//

const app = express();
const port = 3001;
const config = require("./config/config.js");

// all the middleware that gets executed before the API endpoint gets executed
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.set("views", path.join(__dirname, "public/views"));
app.set("view engine", "pug");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));
// end of all middleware

// all configured routes for server
app.use("/users", userRoutes);
app.use("/listings", listingRoutes);
app.use("/comments", commentRoutes);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use("/public", express.static("public"));

// get the environment variables (app info) from the config
app.get("/getEnv", function (req, res) {
  try {
    var environment = process.argv[2].toUpperCase(); // get from package.json process argument
    console.log("Environment:".yellow, environment);
    console.log("coming from server side");
    if (environment == "SANDBOX") {
      // overwrite the Environment, Token URL and Person URL if Environemnt is 'Sandbox'.
      // 'Sandbox' environment doesn't have Payload Encryption & PKI Digital Signature
      config.MYINFO_CONNECTOR_CONFIG.ENVIRONMENT = environment;
      config.MYINFO_CONNECTOR_CONFIG.TOKEN_URL = config.APP_CONFIG.MYINFO_API_TOKEN[environment];
      config.MYINFO_CONNECTOR_CONFIG.PERSON_URL = config.APP_CONFIG.MYINFO_API_PERSON[environment];
      console.log(
        "Payload Encryption & PKI Digital Signature:".yellow,
        "Disabled".grey,
        "(Sandbox Env)"
      );
    } else {
      console.log(
        "Payload Encryption & PKI Digital Signature:".yellow,
        "Enabled".green,
        "(Test Env)"
      );
    }

    if (
      config.APP_CONFIG.DEMO_APP_CLIENT_ID == undefined ||
      config.APP_CONFIG.DEMO_APP_CLIENT_ID == null
    ) {
      res.status(500).send({
        error: "Missing Client ID",
      });
    } else {
      res.status(200).send({
        clientId: config.APP_CONFIG.DEMO_APP_CLIENT_ID,
        redirectUrl: config.APP_CONFIG.DEMO_APP_CALLBACK_URL,
        attributes: config.APP_CONFIG.DEMO_APP_SCOPES,
        purpose: config.APP_CONFIG.DEMO_APP_PURPOSE,
        environment: environment,
        authApiUrl: config.APP_CONFIG.MYINFO_API_AUTHORISE[environment],
      });
    }
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send({
      error: error,
    });
  }
});

// callback function - directs back to home page
app.get("/callback", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// getPersonData function - call MyInfo Token + Person API
app.post("/getPersonData", function (req, res, next) {
  try {
    // get variables from frontend
    var authCode = req.body.authCode;
    var state = req.body.state;
    var txnNo = crypto.randomBytes(10).toString("hex");

    // console.log("> AuthCode   : ", authCode);
    // console.log("> State      : ", state);
    // console.log("> txnNo      : ", txnNo);

    let connector = new MyInfoConnector(config.MYINFO_CONNECTOR_CONFIG);
    console.log("Calling MyInfo NodeJs Library...".green);

    connector
      .getMyInfoPersonData(authCode, state, txnNo)
      .then((personData) => {
        /* 
        P/s: Your logic to handle the person data ...
        */
        console.log("This is your personData");
        console.log("this is the name of the user: ", personData.name.value);
        console.log(personData);

        console.log(
          "--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:".green
        );
        console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
        res.status(200).send(personData); //return personData
      })
      .catch((error) => {
        console.log("---MyInfo NodeJs Library Error---".red);
        console.log(error);
        res.status(500).send({
          error: error,
        });
      });
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).send({
      error: error,
    });
  }
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// // error handlers
// // print stacktrace on error
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render("error", {
//     message: err.message,
//     error: err,
//   });
// });

// if no such route exist, the server will send this response
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

//error handling middleware
app.use(globalErrorHandler);

app.listen(port, () => console.log(`Demo App Client listening on port ${port}!`));
