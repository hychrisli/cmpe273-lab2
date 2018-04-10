var kafka = require('kafka-node');

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    if (!this.kafkaConsumerConnection) {

      this.client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
      this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{topic: topic_name, partition: 0}]);
      this.client.on('ready', function () {
        console.log('Kafka Backend Consumer Ready!', topic_name)
      });

    }
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {

    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log('Kafka Backend Producer Ready');
    }
    return this.kafkaProducerConnection;
  };

  this.getOffset = function() {
    if (! this.kafkaOffset ) {
      this.client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
      this.kafkaOffset = new kafka.Offset(this.client);
    }
    return this.kafkaOffset;
  }
}

exports = module.exports = new ConnectionProvider;