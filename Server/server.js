/* eslint-disable max-len */
//  include the http and url module
const url = require("url");
const express = require("express");
const app = express();
const path = require("path");
const exec = require("child_process").exec;
const http = require("http");

// var for the user
const hostname = "0.0.0.0";
const port = 8080;
const sensorController = "distance"; // Executable for the GPIO

// Login parameters
const admin = "admin";
const adminPassword = "21232f297a57a5a743894a0e4a801fc3"; // MD5('admin')

// Toggle parameters
let alarmBool = false;
let lockBool = false;
let sensorLastState = true;
let lightColor = 0;

app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  param(req, res);
});

app.get("/image", (req, res) => {
  takePhoto(req, res);
});

//  create the http server accepting requests to port 8080
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Function that returns the param
 * It can also toggle the param values by using:
 * http://0.0.0.0:8080/?user=admin&&password=admin
 * http://0.0.0.0:8080/image
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function param(req, res) {
  //  use the url to parse the requested url and get the param number
  const query = url.parse(req.url, true).query;
  const light = query.light;
  const lock = query.lock;
  const alarm = query.alarm;
  const user = query.user;
  const password = query.password;

  if (typeof user !== "undefined" && typeof password !== "undefined") {
    authentication(req, res, user, password);
  }
  if (typeof alarm !== "undefined") {
    toggleAlarm(req, res);
  }
  if (typeof lock !== "undefined") {
    toggleLock(req, res);
  }
  if (typeof light !== "undefined") {
    lights(req, res, light);
  } else {
    console.log("Invalid param");
    res.sendStatus(400);
  }
}

/**
 * Function that authenticates
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 * @param {*} user: user for the auth
 * @param {*} password: password for the auth
 */
function authentication(_req, res, user, password) {
  if (user === admin && password === adminPassword) {
    console.log("Authenticated");
    res.json({
      auth: true
    });
  } else {
    console.log("Not authenticated");
    res.json({
      auth: false
    });
  }
}

/**
 * Function that toggles the alarm
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function toggleAlarm(_req, res) {
  alarmBool = !alarmBool;
  console.log(`Alarm on: ${alarmBool}`);
  // TODO: implementar alarma en hardware
  res.json({
    state: alarmBool
  });
}

/**
 * Function that toggles the lock
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function toggleLock(_req, res) {
  lockBool = !lockBool;
  console.log(`Lock on: ${lockBool}`);
  // TODO: implementar lock en hardware
  res.json({
    state: lockBool
  });
}

/**
 * Function that sets the lights of a desired color
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 * @param {*} color: number of the color choose
 */
function lights(_req, _res, color) {
  lightColor = color2Hex(color); // TODO: setear el color en el hardware
}

/**
 * Function that returns the param
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
async function takePhoto(_req, res) {
  // read the image using fs and send the image content back in the response
  const myPhoto = path.resolve(__dirname, `photo.jpeg`);
  exec("fswebcam -r 640x480 " + myPhoto, (_error, _stdout, _stderr) => {});
  console.log("Photo taken");
  await sleep(1500);
  res.sendFile(myPhoto);
}

/**
 * Function that sleeps for ms time
 * @param {*} ms: time to sleep
 * @return {*} promise of the timeout
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function that return a color according to its number
 * @param {*} color: color pallete for the led
 * @return {*} hex: hexadecimal of the color
 */
function color2Hex(color) {
  let hex = 0x000000;
  switch (color) {
    case "0":
      hex = 0x000000; // TODO: ver como apagar el color
      console.log("Off");
      break;
    case "1":
      hex = 0xff0000; // Red
      console.log("Red");
      break;
    case "2":
      hex = 0x00ff00; // Green
      console.log("Green");
      break;
    case "3":
      hex = 0x0000ff; // Blue
      console.log("Blue");
      break;
    case "4":
      hex = 0xffff00; // Yellow
      console.log("Yellow");
      break;
    case "5":
      hex = 0xffa500; // Orange
      console.log("Orange");
      break;
    case "6":
      hex = 0x800080; // Purple
      console.log("Purple");
      break;
    case "7":
      hex = 0xffc0cb; // Pink
      console.log("Pink");
      break;
    case "8":
      hex = 0xffffff; // White
      console.log("White");
      break;
    case "9":
      hex = 0x00ffff; // Cyan
      console.log("Cyan");
      break;
    default:
      console.log("Default");
      break;
  }
  return hex;
}

/**
 * Function that toggles the param of a room
 * @param {*} req:
 * @param {*} res:
 * @param {*} roomNumber:
 * @param {*} roomBool:
 */
function readSensor() {
  const readDistance = exec(
    `${sensorController}`,
    // eslint-disable-next-line no-unused-vars
    (_error, _stdout, _stderr) => {}
  );
  readDistance.on("exit", code => {
    if (code === 1 && sensorLastState) {
      // If state is true, it's a new state
      console.log("You're too close, GET AWAY FROM ME!");
      // Get rebounce to send notifications from other server to phone
      http.get("http://10.23.172.149:9090/", (res) => {}).on("error", (err) => {});
      sensorLastState = !sensorLastState;
    } else if (code === 0 && !sensorLastState) {
      // If state is false, it's a new state
      console.log("Meh, not close enough");
      sensorLastState = !sensorLastState;
    }
  });
}

/**
 * Function to read the value from the sensor infinitely
 */
function run() {
  setInterval(readSensor, 500); // in mili-seconds
}

run();
