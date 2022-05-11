const express = require('express')
const app = express()


app.listen(2022, (err) => {
    if (err) console.log(err);
})

/**
 * req = request object, res = response object
 */
app.get('/', function (req, res) {
    res.send('GET request to homepage')
})

