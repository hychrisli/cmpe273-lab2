const express = require('express');
const router = express.Router();
const projDao = require('../dao/projs-dao');
const BidDao = require('../dao/bids-dao');

/**
 * @swagger
 * /hire/{project_id}:
 *  put:
 *    description: update a project
 *    tags:
 *      - projects
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: project_id
 *        description: project ID
 *        in: path
 *        required: true
 *        type: number
 *      - name: chosen_bid
 *        description: bid that is chosen for the project
 *        in: formData
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: project updated
 */

router.put('/:project_id', (req, res) => {
    const project_id = req.params.project_id;
    const hirePromise = projDao.update(Number(project_id), req.body);
    const bidPromise = BidDao.update({project_id}, {is_active: 'false'});

    Promise.all([hirePromise, bidPromise])
      .then(() => {
        res.status(200).send(JSON.stringify({res: "Hire Success"}));
      }).catch(err => {
      console.log(error);
      res.status(500).send(err);
    });
  }
);

module.exports = router;