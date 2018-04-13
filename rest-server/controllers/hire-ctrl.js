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
 * /hire/{project_id}:
 *  put:
 *    description: update a project
 *    tags:
 *      - projects
 *    security:
 *      - bearer: []
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: string
 *      - name: chosen_bid
 *        description: bid that is chosen for the project
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:project_id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const user = jwtDecode(req.header('Authorization'));

    console.log(req.params.project_id, req.body.chosen_id);

    kafkaClient.make_request(
      FLC_TPC_HIRE,
      PUT,
      {
        employerId: user._id,
        projectId: req.params.project_id,
        chosenBid: req.body.chosen_bid,
      },
      (err, data) => {
        if (err) handleRes.sendInternalSystemError(res, err);
        else handleRes.sendDoc(res, data);
      });

    /*    const project_id = req.params.project_id;
        const hirePromise = projDao.update(Number(project_id), req.body);
        const bidPromise = BidDao.update({project_id}, {is_active: 'false'});

        Promise.all([hirePromise, bidPromise])
          .then(() => {
            res.status(200).send(JSON.stringify({res: "Hire Success"}));
          }).catch(err => {
          console.log(error);
          res.status(500).send(err);
        });*/
  }
);

module.exports = router;