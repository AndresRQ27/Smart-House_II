/**
 * Function that returns the param
 * @param {*} req: request parameter
 * @param {*} res: response parameter
 */
async function imageFile(req, res) {
  //  read the image using fs and send the image content back in the response
  exec('fswebcam -r 640x480 /home/root/ServerApp/images/image.png',
      (error, stdout, stderr) => {});
  await sleep(2500);
  res.sendFile(path.resolve(__dirname, `images/image.png`));
}
