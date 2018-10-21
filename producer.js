/**
 * Simple web microservice with ExpressJS that gets some inputs from users
 * and sends it to a Kafka topic
 */

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

// Get route parameter (message) that user entered in browser 
// and send it to the 'web' Kafka topic
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
            console.log('web-producer: '+data)
        })
        producer.on('error', function (err) {
            console.log('web-producer: '+err)
        })

        res.send(`Your message is ${msg}`)
    })
})

app.listen(port, () => console.log(`Producer web microservice is running on port ${port}`))