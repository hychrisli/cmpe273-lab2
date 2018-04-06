const express = require('express');
const router = express.Router();
const projFileDao = require('../dao/proj-files-dao');
const fs = require('fs');
const fileDir = process.cwd() + process.env.FILE_DIR;
const {promisePostNotice, promiseGetResponse} = require('./ctrls');

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
 *      - name: project_id
 *        in : query
 *        required: false
 *        type: string
 *        description: Retrieve skills per project
 *    responses:
 *      200:
 *        description: project skills
 */
router.get('/', (req, res) => {
  const project_id = req.query.project_id;
  let filter = {};
  if (project_id !== undefined) {
    filter['project_id'] = project_id;
  }
  promiseGetResponse(projFileDao.retrieve(filter), res, 200);
});


/**
 * @swagger
 * /proj-files:
 *  post:
 *    description: upload a file for a project
 *    tags:
 *       - proj-files
 *    produces:
 *      - multipart/form-data
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: formData
 *        required: true
 *        type: number
 *      - name: file
 *        in: formData
 *        type: file
 *        required: true
 *        description: upload file
 *    responses:
 *      200:
 *        description: upload success
 */
router.post('/', (req, res) =>{

  console.log(req.body);
  console.log(req.files);
  const project_id = req.body.project_id;
  const owner_id = req.body.owner_id;

  if ( req.files === undefined )
    return res.status(400).send('No files were uploaded');

  const fileObj = req.files.file;
  const serverFile = project_id + '_' + fileObj.name;
  const serverFileFull = fileDir + '/' + serverFile;

  if (fs.existsSync(serverFileFull)) {
    fileObj.mv(serverFileFull, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.send("Upload Success");
    });
  }
  else {
    fileObj.mv(serverFileFull, (err) => {
      if ( err ){
        console.log(err);
        return res.status(500).send(err);
      }
      const attrs = {project_id, owner_id, file: serverFile, file_name: fileObj.name };
      promisePostNotice(projFileDao.insert(attrs), "Upload Success", res, 201);
    })
  }
});


/**
 * @swagger
 * /proj-files/{file_id}:
 *  get:
 *    description: download a file for user
 *    tags:
 *      - proj-files
 *    consumes:
 *      - application/pdf
 *    parameters:
 *      - name: file_id
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
router.get('/:file_id', (req, res)=> {
  const file_id = req.params.file_id;

  const promise = projFileDao.retrieve({id: file_id});
  promise.then((val)=>{
    if (val.length < 1)
      res.status(400).send("No such file");
    else {
      const serverFileFull = fileDir + '/' + val[0].file;
      if (fs.existsSync(serverFileFull)) {
        res.set('content-disposition', 'attachment;filename=' + val[0].file);
        res.download(serverFileFull, val[0].file_name);
      }
      else
        res.status(400).send("No such file");
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
});

/**
 * @swagger
 * /proj-files/{file_id}:
 *  delete:
 *    description: delete a file
 *    tags:
 *       - proj-files
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: file_id
 *        description: file ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: delete a file
 */
router.delete('/:bid_id', function (req, res) {
  const file_id = req.params.file_id;
  const retrievePromise = projFileDao.retrieve({id: file_id});
  const delPromise = projFileDao.delete({id: file_id});

  Promise.all([retrievePromise, delPromise])
    .then((results) => {
      const projFile = results[0];
      const serverFileFull = fileDir + '/' + projFile[0].file;
      if (fs.existsSync(serverFileFull)) fs.unlinkSync(serverFileFull);
      res.send({res: "Delete success"})
    }).catch(err => {
    console.log(error);
    res.status(500).send(err);
  });
});

module.exports = router;
