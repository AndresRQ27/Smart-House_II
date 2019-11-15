/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
//  include the http and url module
const url = require('url');
const express = require('express');
const app = express();
const path = require('path');
const exec = require('child_process').exec;
const http = require('http');

// var for the user
const hostname = '0.0.0.0';
const port = 8080;
const sensorController = 'distance'; // Executable for the GPIO of the proximity sensor
const lightsController = 'lights'; // Executable for the GPIO of the led lights
const buzzerController = 'lock'; // Executable for the GPIO of the buzzer

// Login parameters
const admin = 'admin';
const adminPassword = '21232f297a57a5a743894a0e4a801fc3'; // MD5('admin')

// Toggle parameters
let alarmBool = false;
let lockBool = false;
let sensorLastState = true;
let alarmInterval;
let alarmBuzzer = false;

app.use(function(_req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/', (req, res) => {
  param(req, res);
});

app.get('/image', (req, res) => {
  takePhoto(req, res);
});

app.get('/alarm', (req, res) => {
  toggleAlarm(req, res);
});

app.get('/lock', (req, res) => {
  toggleLock(req, res);
});

// create the http server accepting requests to port 8080
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

  if (typeof user !== 'undefined' && typeof password !== 'undefined') {
    authentication(req, res, user, password);
  } else if (typeof alarm !== 'undefined') {
    toggleAlarm(req, res);
  } else if (typeof lock !== 'undefined') {
    toggleLock(req, res);
  } else if (typeof light !== 'undefined') {
    lights(light);
  } else {
    console.log('Invalid param');
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
    console.log('Authenticated');
    res.json({
      auth: true
    });
  } else {
    console.log('Not authenticated');
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
  res.json({
    state: alarmBool
  });

  if (alarmBool) {
    alarmInterval = setInterval((_req, res) => {
      // lights red - off
      lights('1');
      setTimeout(lights, 50, '0');

      // buzzer on - off
      buzzer();
      setTimeout(buzzer, 50);
    }, 100);
  } else {
    clearInterval(alarmInterval); // Turns off the alarm
  }
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
 * @param {*} color: number of the color choose
 */
async function lights(color) {
  const lightColor = color2Hex(color);
  exec(
    `${lightsController} -c ${lightColor}`,
    (_error, _stdout, _stderr) => {}
  );
}

/**
 * Functions that toggles the alarm
 * @param {*} state: int of the buzzer. 0 for off and 1 for on
 */
async function buzzer() {
  alarmBuzzer = !alarmBuzzer;
  let state = '0';
  
  if (alarmBuzzer) {
    state = '1'; // Buzzer on
    console.log('Buzzzz!');
  }

  exec(
    `${buzzerController} -a ${state}`,
    (_error, _stdout, _stderr) => {}
  );
}

/**
 * Function that read the proximity sensor and notifies if close
 */
function readSensor() {
  const readDistance = exec(
    `${sensorController}`,
    (_error, _stdout, _stderr) => {}
  );
  readDistance.on('exit', code => {
    if (code === 1 && sensorLastState) {
      // If state is true, it's a 'new' state
      console.log("You're too close, GET AWAY FROM ME!");
      // Get rebounce to send notifications from other server to phone
      http.get('http://10.23.172.149:9090/', res => {}).on('error', err => {});
      sensorLastState = !sensorLastState;
    } else if (code === 0 && !sensorLastState) {
      // If state is false, it's a 'new' state
      console.log('Meh, not close enough');
      sensorLastState = !sensorLastState;
    }
  });
}

/**
 * Function that returns the param
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
async function takePhoto(_req, res) {
  // read the image using fs and send the image content back in the response
  const myPhoto = path.resolve(__dirname, `photo.jpeg`);
  exec('fswebcam -r 640x480 ' + myPhoto, (_error, _stdout, _stderr) => {});
  console.log('Photo taken');
  await sleep(1500);
  res.sendFile(myPhoto);
}

/**
 * Function that return a color according to its number
 * @param {*} color: color pallete for the led
 * @return {*} hex: hexadecimal of the color
 */
function color2Hex(color) {
  switch (color) {
    case '1':
      console.log('Red');
      return 'ff0000'; // Red
    case '2':
      console.log('Green');
      return '00ff00'; // Green
    case '3':
      console.log('Blue');
      return '0000ff'; // Blue
    case '4':
      console.log('Yellow');
      return 'ff8500'; // Yellow
    case '5':
      console.log('Orange');
      return 'ff4000'; // Orange
    case '6':
      console.log('Purple');
      return '800080'; // Purple
    case '7':
      console.log('Pink');
      return 'ff007f'; // Pink
    case '8':
      console.log('White');
      return 'ffffff'; // White
    case '9':
      console.log('Cyan');
      return '00ffff'; // Cyan
    default:
      console.log('Off');
      return '000000';
  }
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
 * Function to read the value from the sensor infinitely
 */
function run() {
  setInterval(readSensor, 500); // in mili-seconds
}

run();
