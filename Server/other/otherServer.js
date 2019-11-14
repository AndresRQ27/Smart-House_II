const express = require("express");
const app = express();

// include the module to send notification by auth
const firebase = require("firebase-admin");
const serviceAccount = require("./smarthouseii-firebase-adminsdk-k1smw-6286f9e398.json");

// var for the user
const hostname = "0.0.0.0";
const port = 9090;

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  rebounce(req, res);
});

//  create the http server accepting requests to port 8080
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function rebounce(req, res) {
  console.log("Rebounce");
  firebase.messaging().sendToDevice(firebaseToken, payload, options);
  res.status(200);
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smarthouseii.firebaseio.com"
});

// token const for auth
const firebaseToken =
  "e1ZPKhGkMLw:APA91bFmu-eCHFXk23pNbUdG2ocHKpbN9kAxaJOR3e95Js6YbPmqyBw8DdmS-v1X7rGJ1ejZDH-BxNNPLNTSGg8MqHAyy0ewEsdNsEhg-UiRGuxqG10T0phJWKSH6elnl941b1FDwfDI";

const payload = {
  notification: {
    title: "New guest",
    body: "Someone has arrive at your door."
  }
};

const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24 //1 day
};