const express = require('express');
const router = express.Router();
const fs = require('fs');
const imageDir = process.cwd() + process.env.IMAGE_DIR;
const User = require('../models/user');
const handleRes = require('./handle-res');

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

  let image = req.files.file;
  let imageName = username + '_' + image.name;

  image.mv(imageDir + '/' + imageName, (err) => {
    if (err) handleRes.sendInternalSystemError(res, err);
    else {
      User.update({username},
        {
          $set:
            {
              image: imageName,
              image_url: 'http://localhost:5000/api/images/' + username
            }
        }, (err) => {
          if (err) handleRes.sendInternalSystemError(res, err);
          else handleRes.sendDoc(res, {success: true, message: "Image Uploaded!"})
        })
    }
  })
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

  User.findOne({username}, (err, user) => {
    if (err) handleRes.sendNotFound(res, err);
    else {
      const imageFile = imageDir + '/' + user.image;
      if (fs.existsSync(imageFile))
        res.sendFile(imageFile);
      else
        handleRes.sendNotFound(res, new Error("No such file"));
    }
  });
});

module.exports = router;