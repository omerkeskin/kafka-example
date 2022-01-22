const { Kafka } = require('kafkajs');
const log_data = require('./log_store/system_logs.json');

// node src/producer.js Logs
const topic_name = 'LogStoreTopic';

createProducer();
let messages = log_data.map( item => {
   return {
     value: JSON.stringify(item),
     partition: item.type === 'system' ? 0 : 1
   }
});

async function createProducer(){


  try {
      const kafka = new Kafka({
        clientId: 'kafka_log_store_client',
        brokers: ['192.168.0.106:9092']
      });

      const producer = kafka.producer();
      console.log('Kafka producer connection...');
      await producer.connect();
      console.log('Kafka connected to producer');
      
      const message_result = await producer.send({
        topic: topic_name,
        messages: messages
      });

      console.log('Send message successfully ', JSON.stringify(message_result));
      await producer.disconnect();

  } catch (error) {
     console.log('An error occured ', error);
  }finally{
    process.exit(0);
  }


  


};