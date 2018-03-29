const express = require('express');
const router = express.Router();
const userDao = require('../dao/users-dao');
const fs = require('fs');
const imageDir = process.cwd() + process.env.IMAGE_DIR;
const {promisePutNotice} = require('./ctrls');
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
 *        ngitame: file
 *        type: file
 *        description: upload image
 *    responses:
 *      200:
 *        description: upload success
 */
router.post('/:username', (req, res) =>{
  const username = req.params.username;

  if ( !req.files )
    return res.status(400).send('No files were uploaded');

  let image = req.files.file;
  let imageName = username + '_' + image.name;

  image.mv( imageDir + '/' + imageName, (err) => {
    if ( err )
      return res.status(500).send(err);
    promisePutNotice(userDao.update(req.params.username,
      {image: imageName, image_url: 'http://localhost:5000/api/images/' + username}),
      'Image uploaded!', res, 200);
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
router.get('/:username', (req, res)=> {
  const username = req.params.username;

  const promise = userDao.retrieveByUserName(username);
  promise.then((val)=>{
    if (val.length < 1)
      res.status(400).send("No such user");
    else {
      const imageFile = imageDir + '/' + val[0].image;
      if (fs.existsSync(imageFile))
        res.sendFile(imageFile);
      else
        res.status(400).send("No such file");
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

module.exports = router;