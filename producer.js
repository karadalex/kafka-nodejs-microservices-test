const express = require('express')
const kafka = require('kafka-node')
const app = express()

// Initialize Kafka
var Producer = kafka.Producer
var Client = kafka.Client
var client = new Client('192.168.1.3:2181')
var producer = new Producer(client)

const port = 3000

app.get('/', (req, res) => res.send('Type your message in the route/address bar'))
producer.on('ready', function () {
    app.get('/:message', (req, res) => {
        var msg = req.params.message
        var payloads = [
            {
                topic: 'web',
                messages: msg,
                partition: 0
            }
        ]
        producer.send(payloads, function (err, data) {
            console.log(data)
        })
        producer.on('error', function (err) {
            console.log(err)
        })

        res.send(`Your message is ${msg}`)
    })
})

app.listen(port, () => console.log(`Producer web microservice is running on port ${port}`))