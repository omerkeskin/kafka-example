const { Kafka } = require('kafkajs');

// node src/consumer.js Logs
const topic_name = 'LogStoreTopic';
createConsumer();
let myMessages = [{value:'lorem', partition:0}, {value:'epsum', partition:0},{value:'system ex', partition:0},{value:'blue screen', partition:0}];

async function createConsumer(){


  try {
      const kafka = new Kafka({
        clientId: 'kafka_log_store_client',
        brokers: ['192.168.0.106:9092']
      });

      const consumer = kafka.consumer({
        groupId:'log_store_consumer_group'
      });
      console.log('Kafka consumer connection...');
      await consumer.connect();
      console.log('Kafka connected to consumer');
      
      // Consumer subscribe
      await consumer.subscribe({
        topic: topic_name,
        fromBeginning: true
      });

      consumer.run({
        eachMessage: async result => {
          console.log(`Incoming message ${result.message.value} | Partition  ${result.partition}`);
        }
      });

  } catch (error) {
     console.log('An error occured ', error);
  }

};