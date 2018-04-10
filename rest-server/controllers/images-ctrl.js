const express = require('express');
const router = express.Router();
const base64Img = require('base64-img');
const imageDir = process.cwd() + process.env.IMAGE_DIR;
const handleRes = require('./handle-res');

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_IMAGE,
  GET_ONE,
  POST,
} = require('../kafka-client/constants');


/**
 * @swagger
 * /images/{username}:
 *  post:
 *    description: upload image for user
 *    tags:
 *       - images
 *    produces:
 *      - multipart/form-data
 *    parameters:
 *      - name: username
 *        description: Username for profile image.
 *        in: path
 *        required: true
 *        type: string
 *      - in: formData
 *        name: file
 *        type: file
 *        description: upload image
 *    responses:
 *      200:
 *        description: upload success
 */
router.post('/:username', (req, res) => {
  const username = req.params.username;

  if (!req.files) handleRes.sendBadRequest(res, 'No files were uploaded');

  const image = req.files.file;
  const imageFile = imageDir + username;
  image.mv(imageFile, (err) => {
    if (err) handleRes.sendInternalSystemError(res, err);
    const base64Data = base64Img.base64Sync(imageFile);

    kafkaClient.make_request(
      FLC_TPC_IMAGE,
      POST,
      {username, base64Img: base64Data},
      (err) => {
        if (err) handleRes.sendInternalSystemError(res, err);
        else handleRes.sendDoc(res, {success: true, message: "Image Uploaded!"});
      });
  });
});

/**
 * @swagger
 * /images/{username}:
 *  get:
 *    description: download image for user
 *    tags:
 *      - images
 *    consumes:
 *      - image/png
 *    parameters:
 *      - name: username
 *        description: Username for profile image.
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: download success
 */
router.get('/:username', (req, res) => {
  const username = req.params.username;

  kafkaClient.make_request(
    FLC_TPC_IMAGE,
    GET_ONE,
    {username},
    (err, data) => {
      if (err) handleRes.sendNotFound(res, err);
      else {
        base64Img.img(data.base64Img, imageDir, username, (err, file) => {
          if (err) handleRes.sendInternalSystemError(res, err);
          else res.sendFile(file)
        });
      }
    });
});

module.exports = router;