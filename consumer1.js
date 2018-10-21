/**
 * This is a simple consumer: 
 * it is subscribed to the 'web' topic and prints every value
 */

const kafka = require('kafka-node')
const Consumer = kafka.Consumer
const client = new kafka.Client('192.168.1.3:2181')


var topics = [
    { topic: 'web', partition: 0 }
]
var options = {
    autoCommit: false,
    fromOffset: true,
    fetchMaxBytes: 1024*1024
}
var consumer = new Consumer(client, topics, options)

consumer.setOffset('web', 0, 10)

consumer.on('message', (msg) => {
    console.log('consumer1: '+msg.value)
})