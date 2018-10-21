const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => res.send('Type your message in the route/address bar'))
app.get('/:message', (req, res) => {
    // Do something with the meesage
})

app.listen(port, () => console.log(`Producer web microservice is running on port ${port}`))