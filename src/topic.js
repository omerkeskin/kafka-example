const { Kafka } = require('kafkajs');

createTopic();

async function createTopic(){


  try {
      //Admin stuff
      const kafka = new Kafka({
        clientId: 'kafka_log_store_client',
        brokers: ['localhost:9092']
      });

      const admin = kafka.admin();
      console.log('Kafka broker connection...');
      await admin.connect();
      console.log('Kafka connected to broker');
      await admin.createTopics({
        topics: [
          {
            topic: 'LogStoreTopic',
            numPartitions: 2
          }
        ]
      });
      console.log('Kafka topics created...');
      await admin.disconnect();
  } catch (error) {
     console.log('An error occured ', error);
  }finally{
    process.exit(0);
  }


  


};