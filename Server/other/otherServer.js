const express = require("express");
const app = express();

// include the module to send notification by auth
const firebase = require("firebase-admin");
const serviceAccount = require("./smarthouseii-firebase-adminsdk-k1smw-6286f9e398.json");

// var for the user
const hostname = "0.0.0.0";
const port = 9090;

// token const for auth
const firebaseToken =
  "e1ZPKhGkMLw:APA91bFmu-eCHFXk23pNbUdG2ocHKpbN9kAxaJOR3e95Js6YbPmqyBw8DdmS-v1X7rGJ1ejZDH-BxNNPLNTSGg8MqHAyy0ewEsdNsEhg-UiRGuxqG10T0phJWKSH6elnl941b1FDwfDI";
  
// New guest message
const newGest = {
  notification: {
    title: "New guest",
    body: "Someone has arrive at your door."
  }
};

// Door unlocked message
const doorUnlocked = {
  notification: {
    title: "Door unlocked",
    body: "Someone has unlocked the door manually."
  }
};

// Lights on message
const lightsOn = {
  notification: {
    title: "Lights On",
    body: "You have left the light on during the day."
  }
};

const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24 //1 day
};

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

app.get("/unlock", (req, res) => {
  unlock(req, res);
});

app.get("/lights", (req, res) => {
  lights(req, res);
});

//  create the http server accepting requests to port 8080
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Basic functions that notifies when someone is close
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function rebounce(req, res) {
  console.log("Rebounce");
  firebase.messaging().sendToDevice(firebaseToken, newGest, options);
  res.status(200);
}

/**
 * Function that notifies if the door is unlocked manually
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function unlock(req, res) {
  console.log("Unlock");
  firebase.messaging().sendToDevice(firebaseToken, doorUnlocked, options);
  res.status(200);
}

/**
 * Function that notifies if the door is unlocked manually
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function lights(req, res) {
  let date = new Date();
  let current_hour = date.getHours();

  if (current_hour > 6 || current_hour < 18) {
    console.log("Lights during day");
    firebase.messaging().sendToDevice(firebaseToken, lightsOn, options);
  } else {
    console.log("Lights during night");
  }
  res.status(200);
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smarthouseii.firebaseio.com"
});