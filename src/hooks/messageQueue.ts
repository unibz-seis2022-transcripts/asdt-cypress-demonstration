import { AMQPWebSocketClient } from '@cloudamqp/amqp-client';

const getClient = async () => {
  const url = 'ws://localhost:15670/ws/amqp';
  const newClient = new AMQPWebSocketClient(url);
  await newClient.connect();
  return newClient;
};

export const getReceiverChannel = async () => {
  const client = await getClient();

  const receiverChannel = await client.channel();
  return receiverChannel;
};
