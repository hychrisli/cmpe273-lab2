const express = require('express');
const router = express.Router();
const BidDao = require('../dao/bids-dao');
const {promiseGetResponse, promisePostResponse, promiseGetOneResponse, promiseDeleteNotice} = require('./ctrls');

/**
 * @swagger
 * /bids:
 *  get:
 *    description: Retrieve all bids
 *    tags:
 *      - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        in : query
 *        required: false
 *        type: string
 *        description: retrieve bids as bidder
 *    responses:
 *      200:
 *        description: bids
 */
router.get('/', (req, res) => {

  const user_id = req.query.user_id;
  let filter = {};
  if (user_id !== undefined){
    console.log(user_id);
    filter['user_id'] = user_id;
  }

  promiseGetResponse(BidDao.retrieveAll(filter), res, 200);
});

/**
 * @swagger
 * /bids/{bid_id}:
 *  get:
 *    description: retrieve a bid
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: bid_id
 *        description: bid ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a bid
 */
router.get('/:bid_id', function (req, res, next) {
  const bid_id = req.params.bid_id;
  if ( bid_id !== undefined )
    promiseGetOneResponse(BidDao.retrieveBid(Number(bid_id)), res, 200);
  else
    res.status(400).send("Invalid Bid GET Request");
});

/**
 * @swagger
 * /bids:
 *  post:
 *    description: New bid for a project
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: user_id
 *        description: user to bid the project
 *        in: formData
 *        required: true
 *        type: number
 *      - name: project_id
 *        description: Id of the project
 *        in: formData
 *        required: true
 *        type: number
 *      - name: employer_id
 *        description: Id of the employer
 *        in: formData
 *        required: true
 *        type: number
 *      - name: bid_price
 *        description: bid price for the project
 *        in: formData
 *        required: false
 *        type: number
 *      - name: bid_days
 *        description: bid days for the project
 *        in: formData
 *        required: false
 *        type: number
 *    responses:
 *      201:
 *        description: bid created
 */
router.post('/', (req, res) => {
  console.log(req.body);
  promisePostResponse(BidDao.insertBid(req.body), req, res, 201);
});

/**
 * @swagger
 * /bids/{bid_id}:
 *  delete:
 *    description: delete a bid
 *    tags:
 *       - bids
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: bid_id
 *        description: bid ID
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *      200:
 *        description: a bid
 */
router.delete('/:bid_id', function (req, res) {
  const bid_id = req.params.bid_id;
  if ( bid_id !== undefined )
    promiseDeleteNotice(BidDao.deleteBid(Number(bid_id)), "Delete Success", res, 200);
  else
    res.status(400).send("Invalid Bid Delete Request");
});



module.exports = router;