const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
require('../auth/passport')(passport);
const jwt = require('jsonwebtoken');
const {key} = require('../auth/constants');
const handleRes = require('./handle-res');

const kafkaClient = require('../kafka-client/client');
const {
  FLC_TPC_USER,
  FLC_TPC_SESSION,
  GET_ALL,
  GET_ONE,
  POST,
  PUT
} = require('../kafka-client/constants');

/**
 * @swagger
 * /users:
 *  get:
 *    description: Retrieve all users
 *    security:
 *      - bearer: []
 *    tags:
 *      - users
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: users
 */
router.get('/', /*passport.authenticate('jwt', {session: false}), */(req, res) => {
//router.get('/', (req, res) => {
  kafkaClient.make_request(
    FLC_TPC_USER,
    GET_ALL,
    {},
    (err, docs) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendArray(res, docs);
  });

});


/**
 * @swagger
 * /users/{id}:
 *  get:
 *    description: Retrieve User Info
 *    security:
 *      - bearer: []
 *    tags:
 *      - users
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: id
 *        description: user ID
 *        in: path
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: a user
 */
router.get('/:id', (req, res) => {
  kafkaClient.make_request(
    FLC_TPC_USER,
    GET_ONE,
    {_id: req.params.id},
    (err, doc) => {
      if (err) handleRes.sendNotFound(res, err);
      else handleRes.sendDoc(res, doc);
    });
});


/**
 * @swagger
 * /users:
 *  post:
 *    description: Create a User
 *    tags:
 *       - users
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: Username to use for login.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: User's email.
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      201:
 *        description: user created
 */
router.post('/', function (req, res) {
  let form = req.body;
  form.password = bcrypt.hashSync(form.password, 10);
  kafkaClient.make_request(
    FLC_TPC_USER,
    POST,
    form,
    (err) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else handleRes.sendCreated(res);
    });
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    description: login a user
 *    tags:
 *       - users
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: Username to use for login.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: login success
 */
router.post('/login', function (req, res, next) {

  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (username === undefined || username === null || username === "") {
    handleRes.sendBadRequest(res, "Username Not Specified");
    next();
  } else if (password === undefined || password === null || password === "") {
    handleRes.sendBadRequest(res, "Password Not Specified");
    next();
  }

  kafkaClient.make_request(
    FLC_TPC_USER,
    GET_ONE,
    {username},
    (err, user) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else if (user === null)
        handleRes.sendNotFound(res, "No Such User");
      else if (!bcrypt.compareSync(req.body.password, user.password))
        handleRes.sendBadRequest(res, "Wrong Password");
      else{
        const token = 'bearer ' + jwt.sign({user}, key);
        kafkaClient.make_request(
          FLC_TPC_SESSION,
          POST,
          {
            userId: user._id,
            username,
            jwt: token
          },
          (err) => {
            if (err) handleRes.sendInternalSystemError(res, err);
            else handleRes.sendDoc(res, token);
          }
        )
      }
        /// /handleRes.sendDoc(res, resUser(doc))
    });
});


/**
 * @swagger
 * /users/{username}:
 *  put:
 *    description: Update a User
 *    tags:
 *       - users
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: username
 *        description: username
 *        in: path
 *        required: true
 *        type: string
 *      - name: password
 *        description: User's password.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: email
 *        description: User's email.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: firstName
 *        description: first name of the user.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: lastName
 *        description: last name of the user.
 *        in: formData
 *        required: false
 *        type: string
 *      - name: aboutMe
 *        description: my bio.
 *        in: formData
 *        required: false
 *        type: string
 *    responses:
 *      201:
 *        description: user created
 */
router.put('/:username', function (req, res) {
  console.log(req.body);
  const username = req.params.username;
  let form = req.body;
  if (form.password !== undefined)
    form.password = bcrypt.hashSync(form.password, 10);

  kafkaClient.make_request(
    FLC_TPC_USER,
    PUT,
    {username, form},
    (err, user) => {
      if (err) handleRes.sendInternalSystemError(res, err);
      else if (user === null) handleRes.sendNotFound(res, "Not Found");
      else handleRes.sendDoc(res, resUser(user))
    });
});


const resUser = (doc) => {
  const token = jwt.sign({user: doc}, key);
  return {
    id: doc._id,
    username: doc.username,
    email: doc.email,
    firstName: doc.firstName,
    lastName: doc.lastName,
    aboutMe: doc.aboutMe,
    jwt: 'bearer ' + token
  };
};


module.exports = router;