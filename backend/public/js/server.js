import express from "express";
import MyInfoConnector from "myinfo-connector-nodejs";
import { APP_CONFIG, MYINFO_CONNECTOR_CONFIG } from "../../config/appConfig.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import colors from "colors";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
//var MyInfoConnector = require("myinfo-connector-nodejs"); //Call constructor to initialize library and pass in the configurations.

app.get("/home", (req, res) => {
  res.json({
    users: ["userone", "usertwo", "usethree", "userfour"],
  });
});

const port = 3001;
var state = Math.floor(Math.random() * 100000); // Identifier that represents the user's session with the client (for testing - andomly generated state)

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.get("/getEnv", (req, res) => {
  try {
    if (APP_CONFIG.YOUR_APP_CLIENT_ID == undefined || APP_CONFIG.YOUR_APP_CLIENT_ID == null) {
      console.log("process failed");
      res.status(500).send({
        error: "Missing Client ID",
      });
    } else {
      console.log("process success");
      res.status(200).send({
        clientId: APP_CONFIG.YOUR_APP_CLIENT_ID,
        redirectUrl: APP_CONFIG.YOUR_APP_CALLBACK_URL,
        attributes: APP_CONFIG.DEMO_APP_SCOPES,
        purpose: APP_CONFIG.DEMO_APP_PURPOSE,
        environment: "TEST",
        authApiUrl: APP_CONFIG.MYINFO_API_AUTHORISE["TEST"],
      });
    }
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({
      error: error,
    });
  }
});
console.log(typeof __dirname);
console.log("dirname is:", __dirname);
console.log("hello");

app.get("/callback", function (req, res) {
  res.sendFile("C:/Users/jason/Desktop/For github/Rent@SG/backend/public/html/index.html");
});

// getPersonData function - call MyInfo Token + Person API
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

let connector = new MyInfoConnector(MYINFO_CONNECTOR_CONFIG); // MYINFO_CONNECTOR_CONFIG is the Process Environment file (in JSON format), please refer to Process Environment file in 2.2

/**
 * Get MyInfo Person Data (MyInfo Token + Person API)
 *
 * This method takes in all the required variables, invoke the following APIs.
 * - Get Access Token (Token API) - to get Access Token by using the Auth Code
 * - Get Person Data (Person API) - to get Person Data by using the Access Token
 *
 * @param {string} authCode - Authorization Code from Authorise API
 * @param {string} state - Identifier that represents the user's session with the client, provided earlier during the authorise API call.
 * @param {string} txnNo - Transaction ID from requesting digital services for cross referencing.
 * @returns {Promise} - Returns the Person Data (Payload decrypted + Signature validated)
 */

// var authCode = req.body.authCode;
// var state = req.body.state;
// var txnNo = crypto.randomBytes(10).toString("hex");

// const respond = connector
//   .getMyInfoPersonData(authCode, state, txnNo)
//   .then((data) => {
//     return data; // Person Data
//   })
//   .catch((error) => {
//     throw error;
//   });

// console.log(respond);
