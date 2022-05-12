const express = require('express')
const app = express()
app.set('view engine', 'ejs');


app.listen(2022, (err) => {
    if (err) console.log(err);
})

/**
 * req = request object, res = response object
 */
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + 'index.html');
// })

/**
 * Sends what is in public if link/route does not match.
 */
app.use(express.static('./public'));

app.get('/profile/:id', function (req, res) {
    res.render("profile.ejs", {
        "id": req.params.id
    })
})