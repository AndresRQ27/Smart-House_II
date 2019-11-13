/* eslint-disable max-len */
//  include the http and url module
const url = require('url');
const express = require('express');
const app = express();
const path = require('path');
const exec = require('child_process').exec;

// include the module to send notification by auth
// TODO: descomentar firebase
// const firebase = require('firebase-admin');
// const serviceAccount = require('./smarthouseii-firebase-adminsdk-blks5-3986ebe726.json');

// var for the user
const hostname = '0.0.0.0';
const port = 8080;
// const pathController = 'house_controller';

// Login parameters
const admin = 'admin';
const adminPassword = '21232f297a57a5a743894a0e4a801fc3'; // MD5('admin')

// Toggle parameters
let alarmBool = false;
let lockBool = false;
let lightColor = 0;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', (req, res) => {
  param(req, res);
});

app.get('/image', (req, res) => {
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

  if (typeof user !== 'undefined' && typeof password !== 'undefined') {
    authentication(req, res, user, password);
  } if (typeof alarm !== 'undefined') {
    toggleAlarm(req, res);
  } if (typeof lock !== 'undefined') {
    toggleLock(req, res);
  } if (typeof light !== 'undefined') {
    lights(req, res, light);
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
function authentication(req, res, user, password) {
  if (user === admin && password === adminPassword) {
    console.log('Authenticated');
    res.json({
      auth: true,
    });
  } else {
    console.log('Not authenticated');
    res.json({
      auth: false,
    });
  }
}

/**
 * Function that toggles the alarm
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function toggleAlarm(req, res) {
  alarmBool = !alarmBool;
  console.log(`Alarm on: ${alarmBool}`);
  // TODO: implementar alarma en hardware
  res.json({
    state: alarmBool,
  });
}

/**
 * Function that toggles the lock
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function toggleLock(req, res) {
  lockBool = !lockBool;
  console.log(`Lock on: ${lockBool}`);
  // TODO: implementar lock en hardware
  res.json({
    state: lockBool,
  });
}

/**
 * Function that sets the lights of a desired color
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 * @param {*} color: number of the color choose
 */
function lights(req, res, color) {
  lightColor = color;
  hexColor = color2Hex(color); // TODO: setear el color en el hardware
  console.log(`Lights of color: ${hexColor}`);
}

/**
 * Function that returns the param
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
async function takePhoto(req, res) {
  // read the image using fs and send the image content back in the response
  const timestamp = Date.now();
  const myPhoto = path.resolve(__dirname, `../images/photo.jpeg`);
  exec('fswebcam -r 640x480 ' + myPhoto,
      (error, stdout, stderr) => {});
  console.log('Photo taken');
  await sleep(1500);
  res.sendFile(myPhoto);
}

/**
 * Function that sleeps for ms time
 * @param {*} ms: time to sleep
 * @return {*} promise of the timeout
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Function that return a color according to its number
 * @param {*} color: color pallete for the led
 * @return {*} hex: hexadecimal of the color
 */
function color2Hex(color) {
  let hex = 0x000000;
  switch (color) {
    case 0:
      hex = 0x000000; // TODO: ver como apagar el color
      break;
    case 1:
      hex = 0xFF0000; // Red
      break;
    case 2:
      hex = 0x00FF00; // Green
      break;
    case 3:
      hex = 0x0000FF; // Blue
      break;
    case 4:
      hex = 0xFFFF00; // Yellow
      break;
    case 5:
      hex = 0xFFA500; // Orange
      break;
    case 6:
      hex = 0x800080; // Purple
      break;
    case 7:
      hex = 0xFFC0CB; // Pink
      break;
    case 8:
      hex = 0xFFFFFF; // White
      break;
    case 9:
      hex = 0x00FFFF; // Cyan
      break;
  }
  return hex;
};

/*
// TODO: descomentar el código cuando se usen notificaciones
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://smarthouseii.firebaseio.com'
});

// token const for auth
const firebaseToken = 'dCkRHXel7-Y:APA91bH-5XebMrTkmm5WU_w8ay1K5PA85h931-s6s-RqLWv9uk24YHjw5MQaksPCWh_4Atdxp5lvGXWpBJDjWCs87jb-rCmmXbzi_MQt80m2f1R5DCaUBWdUp_isEmi2Nj3pcpAwlRHX';

const payload = {
  notification: {
    title: 'New guest',
    body: 'Someone has been detected in your door.'
  }
};

const options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24 //1 day
};
*/

// TODO: implementar la notificación donde corresponde
// firebase.messaging().sendToDevice(firebaseToken, payload, options);
// console.log('Notification sent');
