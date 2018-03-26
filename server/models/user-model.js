/**
 * @swagger
 * definitions:
 *  User:
 *    type: object
 *    required:
 *      - username
 *      - password
 *      - email
 *    properties:
 *      username:
 *        type: string
 *      first_name:
 *        type: string
 *      last_name:
 *        type: string
 *      password:
 *        type: string
 *      email:
 *        type: string
 *      image:
 *        type: string
 *      about_me:
 *        type: string
 *  Users:
 *    type: array
 *    items:
 *      $ref: '#/definitions/User'
 */
module.exports = class User {
  constructor(username, first_name, last_name, password, email, image, about_me) {
    this.username = username;
    this.first_name = first_name;
    this.last_name = last_name;
    this.password = password;
    this.email = email;
    this.image = image;
    this.about_me = about_me;
  }
};
