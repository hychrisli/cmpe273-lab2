const express = require('express');
const router = express.Router();
const dataFormat = require('dateformat');
const fs = require('fs');
const fileDir = process.cwd() + process.env.FILE_DIR;
const handleRes = require('./handle-res');
const passport = require('passport');
require('../auth/passport')(passport);
const {jwtDecode} = require('./lib');

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_PROJECT_FILE,
  GET_ALL,
  GET_ONE,
  POST,
  DELETE,
} = require('../kafka-client/constants');

/**
 * @swagger
 * /proj-files:
 *  get:
 *    description: Retrieve all skills uploaded for a project
 *    tags:
 *      - proj-files
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: projectId
 *        in : query
 *        required: false
 *        type: string
 *        description: Retrieve skills per project
 *    responses:
 *      200:
 *        description: project skills
 */
router.get('/', (req, res) => {
  kafkaClient.make_request(
    FLC_TPC_PROJECT_FILE,
    GET_ALL,
    {projectId: req.query.projectId,},
    (err, docs) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, docs);
    });
});


/**
 * @swagger
 * /proj-files:
 *  post:
 *    description: upload a file for a project
 *    tags:
 *      - proj-files
 *    security:
 *      - bearer: []
 *    produces:
 *      - multipart/form-data
 *    parameters:
 *      - name: projectId
 *        description: project ID
 *        in: formData
 *        required: true
 *        type: string
 *      - name: file
 *        in: formData
 *        type: file
 *        required: true
 *        description: upload file
 *    responses:
 *      200:
 *        description: upload success
 */
router.post('/',passport.authenticate('jwt', {session: false}), (req, res) =>{

  const user = jwtDecode(req.header('Authorization'));

  console.log(req.body);
  console.log(req.files);
  const projectId = req.body.projectId;

  if ( req.files === undefined )
    return res.status(400).send('No files were uploaded');

  const fileObj = req.files.file;
  const fileName = fileObj.name;
  const filePath = user.username + '_' + dataFormat(new Date(), 'yyyymmddHHMMss') + '_' + fileObj.name;
  const fileFullPath = fileDir + '/' + filePath;

  fileObj.mv(fileFullPath, (err) => {
    if (err) handleRes.sendInternalSystemError(res, err);
    else {
      kafkaClient.make_request(
        FLC_TPC_PROJECT_FILE,
        POST,
        {userId: user._id, projectId, fileName, filePath},
        (err, data) => {
          if (err) handleRes.sendInternalSystemError(res, err);
          else handleRes.sendOK(res, data);
        });
    }
  });
});


/**
 * @swagger
 * /proj-files/{fileId}:
 *  get:
 *    description: download a file for user
 *    tags:
 *      - proj-files
 *    consumes:
 *      - application/pdf
 *    parameters:
 *      - name: fileId
 *        description: file ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: download success
 *        schema:
 *          type: file
 */
router.get('/:fileId', (req, res)=> {

  kafkaClient.make_request(
    FLC_TPC_PROJECT_FILE,
    GET_ONE,
    {fileId: req.params.fileId},
    (err, doc) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else if (doc === null ) handleRes.sendNotFound(res, 'No Such File');
      else {
        const filPathFull = fileDir + '/' + doc.filePath;
        if (fs.existsSync(filPathFull)) {
          res.set('content-disposition', 'attachment;filename=' + doc.fileName);
          res.download(filPathFull, doc.fileName);
        }
        else
          handleRes.sendNotFound(res, "File Missing")
      }
    });
});

/**
 * @swagger
 * /proj-files/{fileId}:
 *  delete:
 *    description: delete a file
 *    tags:
 *      - proj-files
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: fileId
 *        description: file ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: delete a file
 */
router.delete('/:fileId', passport.authenticate('jwt', {session: false}), function (req, res) {

  const user = jwtDecode(req.header('Authorization'));
  kafkaClient.make_request(
    FLC_TPC_PROJECT_FILE,
    DELETE,
    {fileId: req.params.fileId, userId: user._id},
    (err, doc) => {
      console.log(doc);
      if (err) handleRes.sendInternalSystemError(res, err);
      else if (doc === null) handleRes.sendNotFound(res, "Not File Ownser")
      else {
        const filePathFull = fileDir + '/' + doc.filePath;
        if ( fs.existsSync(filePathFull)) fs.unlinkSync(filePathFull);
        handleRes.sendOK(res, "Delete Success")
      }
    });
});

module.exports = router;
