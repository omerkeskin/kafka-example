const { Kafka } = require('kafkajs');

createConsumer();
let myMessages = [{value:'lorem', partition:0}, {value:'epsum', partition:0},{value:'system ex', partition:0},{value:'blue screen', partition:0}];

async function createConsumer(){


  try {
      const kafka = new Kafka({
        clientId: 'kafka_ornek_1',
        brokers: ['192.168.0.106:9092']
      });

      const consumer = kafka.consumer({
        groupId:'ornek_1_cg_1'
      });
      console.log('Kafka consumer connection...');
      await consumer.connect();
      console.log('Kafka connected to consumer');
      
      // Consumer subscribe
      await consumer.subscribe({
        topic: 'Logs',
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