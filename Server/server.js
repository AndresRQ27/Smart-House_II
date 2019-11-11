const firebase = require("firebase-admin");

const serviceAccount = require('./smarthouseii-firebase-adminsdk-blks5-3986ebe726.json');

const firebaseToken = 'dCkRHXel7-Y:APA91bH-5XebMrTkmm5WU_w8ay1K5PA85h931-s6s-RqLWv9uk24YHjw5MQaksPCWh_4Atdxp5lvGXWpBJDjWCs87jb-rCmmXbzi_MQt80m2f1R5DCaUBWdUp_isEmi2Nj3pcpAwlRHX';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://smarthouseii.firebaseio.com"
});

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

firebase.messaging().sendToDevice(firebaseToken, payload, options);
console.log("Notification sent");