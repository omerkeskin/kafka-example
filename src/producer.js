const { Kafka } = require('kafkajs');

createProducer();
let myMessages = [{value:'lorem', partition:0}, {value:'epsum', partition:0},{value:'system ex', partition:0},{value:'blue screen', partition:0}];

async function createProducer(){


  try {
      const kafka = new Kafka({
        clientId: 'kafka_ornek_1',
        brokers: ['192.168.0.106:9092']
      });

      const producer = kafka.producer();
      console.log('Kafka producer connection...');
      await producer.connect();
      console.log('Kafka connected to producer');
      
      const message_result = await producer.send({
        topic: 'Logs',
        messages: myMessages
      });

      console.log('Send message successfully ', JSON.stringify(message_result));
      await producer.disconnect();

  } catch (error) {
     console.log('An error occured ', error);
  }finally{
    process.exit(0);
  }


  


};