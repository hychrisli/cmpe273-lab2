const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var options = {
  swaggerDefinition: {
    info: {
      title: 'REST - Swagger',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
    },
    schemes: ['http'],
    host: 'localhost:5000',
    basePath: '/api',
    securityDefinitions: {
      bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    },
  },
  apis: [__dirname + '/controllers/*', __dirname + '/models/*'],
  security: []
};

const swaggerSpec = swaggerJSDoc(options);

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;

