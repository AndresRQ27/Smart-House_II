//  include the http and url module
const url = require('url');
const path = require('path');
const exec = require('child_process').exec;
const express = require('express');
const app = express();
// include the module to send notification by auth
const firebase = require("firebase-admin");
const serviceAccount = require('./smarthouseii-firebase-adminsdk-blks5-3986ebe726.json');

// var for the user
const hostname = '0.0.0.0';
const port = 8080;
const pathController = 'house_controller';

// Login parameters
const admin = 'admin';
const adminPassword = 'admin';

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
  timeToLive: 60 * 60 * 24, //1 day
};

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  param(req, res);
});

//  create the http server accepting requests to port 8080
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/**
 * Function that returns the param
 * It can also toggle the param values by using:
 * http://0.0.0.0:8080/image
 * http://0.0.0.0:8080/?led=kitchen
 * http://0.0.0.0:8080/?update
 * http://0.0.0.0:8080/?user=admin&&password=admin
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
function param(req, res) {
  //  use the url to parse the requested url and get the param number
  const query = url.parse(req.url, true).query;
  //const ledRoom = query.led;
  //const update = query.update;
  const user = query.user;
  const password = query.password;

  //if (typeof ledRoom !== 'undefined') { //  Led is in the parameters
  //  console.log('Led parameter detected');
  //  detectRoom(req, res, ledRoom);
  //} else if (typeof update !== 'undefined') {
  //  updateData(req, res);
  //} else 

  if (typeof user !== 'undefined' &&
    typeof password !== 'undefined') {
    authentication(req, res, user, password);
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
      'auth': true,
    });
  } else {
    console.log('Not authenticated');
    res.json({
      'auth': false,
    });
  }
}

/**
 * Function that sleeps for ms time
 * @param {*} ms: time to sleep
 * @return {*} promise of the timeout
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smarthouseii.firebaseio.com"
});

firebase.messaging().sendToDevice(firebaseToken, payload, options);
console.log("Notification sent");