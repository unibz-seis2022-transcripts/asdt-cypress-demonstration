import { AMQPQueue } from '@cloudamqp/amqp-client';
import { useEffect, useState } from 'react';
import { getReceiverChannel } from './messageQueue';

const useMessageQueue = (topic: string) => {
  const [queue, setQueue] = useState<AMQPQueue | undefined>(undefined);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initQueue = async () => {
      const channel = await getReceiverChannel();
      const queue = await channel.queue(topic);
      await queue.bind('amq.topic');

      await queue.subscribe({ noAck: false }, msg => {
        const body = msg.bodyToString();
        if (body) {
          console.log('Received:', body);
          msg.ack();
          setMessage(body);
        } else {
          console.log('Received empty message');
        }
      });

      setQueue(queue);
      console.log('Now listening for topic ', topic);
    };

    if (!queue) {
      initQueue();
      return;
    }
  }, [topic, queue]);

  return message;
};

export default useMessageQueue;
