const express = require('express');
const router = express.Router();
const handleRes = require('./handle-res');
const {jwtDecode} = require('./lib');
const passport = require('passport');
require('../auth/passport')(passport);

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_HIRE,
  PUT,
} = require('../kafka-client/constants');


/**
 * @swagger
 * /hire/{projectId}:
 *  put:
 *    description: update a project
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: projectId
 *        description: project ID
 *        in: path
 *        required: true
 *        type: string
 *      - name: chosenBid
 *        description: bid that is chosen for the project
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:projectId', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwtDecode(req.header('Authorization'));

    console.log(req.params.projectId, req.body.chosenBid);

    kafkaClient.make_request(
      FLC_TPC_HIRE,
      PUT,
      {
        employerId: user._id,
        projectId: req.params.projectId,
        chosenBid: req.body.chosenBid,
      },
      (err, data) => {
        if (err) handleRes.sendInternalSystemError(res, err);
        else handleRes.sendDoc(res, data);
      });
  }
);

module.exports = router;