var kafka = require('kafka-node');
const kafkaHost = process.env.KAFKA_HOST;

function ConnectionProvider() {

  this.getConsumer = function (topic_name) {
    if (!this.kafkaConsumerConnection) {

      this.client = new kafka.KafkaClient({kafkaHost});
      this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{topic: topic_name, partition: 0}]);
      this.client.on('ready', function () {
        console.log('REST Consumer ready!', topic_name)
      })
    }
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {

    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({kafkaHost});
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log('REST Producer ready');
    }
    return this.kafkaProducerConnection;
  };

  this.getOffset = function() {
    if (! this.kafkaOffset ) {
      this.client = new kafka.KafkaClient({kafkaHost});
      this.kafkaOffset = new kafka.Offset(this.client);
    }
    return this.kafkaOffset;
  }
}

exports = module.exports = new ConnectionProvider;