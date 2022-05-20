const express = require('express')
const app = express()
app.set('view engine', 'ejs');

/**
 * req = request object, res = response object
 */
app.get('/', function (req, res) {
    res.sendFile(__dirname + 'index.html');
})

/**
 * Sends what is in public if link/route does not match.
 */
app.use(express.static('./public'));

const https = require('https');

app.get('/profile/:id', function (req, res) {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    data = ""
    https.get(url, function(https_res) {
        https_res.on("data", function(chunk) {
            data += chunk
        })

        https_res.on("end", function() {
            parsed_data = JSON.parse(data)

            hp = parsed_data.stats.filter((object) => {
                return object.stat.name == "hp"
            }).map((hpfinder) => {
                return hpfinder.base_stat
            })

            //alternatively, instead of chaining the map function above, simply use hp[0].base_stat to get the hp base stat

            attack = parsed_data.stats.filter((object) => {
                return object.stat.name == "attack"
            }).map((atkfinder) => {
                return atkfinder.base_stat
            })

            defense = parsed_data.stats.filter((object) => {
                return object.stat.name == "defense"
            }).map((deffinder) => {
                return deffinder.base_stat
            })

            special_attack = parsed_data.stats.filter((object) => {
                return object.stat.name == "special-attack"
            }).map((specatkfinder) => {
                return specatkfinder.base_stat
            })

            special_defense = parsed_data.stats.filter((object) => {
                return object.stat.name == "special-defense"
            }).map((specdeffinder) => {
                return specdeffinder.base_stat
            })

            speed = parsed_data.stats.filter((object) => {
                return object.stat.name == "speed"
            }).map((speedfinder) => {
                return speedfinder.base_stat
            })

            res.render("profile.ejs", {
                "id": req.params.id,
                "name": parsed_data.name,
                "hp": hp,
                "attack": attack,
                "defense": defense,
                "special_attack": special_attack,
                "special_defense": special_defense,
                "speed": speed
            })
        })
    });

})



// A2 starts here
const mongoose = require('mongoose');

app.listen(process.env.PORT || 1444, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Listening on port 1444")
    }
})

// mongoose.connect("mongodb+srv://pokemon:comp2537@cluster0.thyz8.mongodb.net/pokemonDB?retryWrites=true&w=majority", {
//     useNewUrlParser: true, useUnifiedTopology: true
// });

// const pokemonSchema = new mongoose.Schema({
//     name: String,
//     type: String,
//     id: Number,
//     hp: Number,
//     atk: Number,
//     def: Number,
//     spec_atk: Number,
//     spec_def: Number,
//     speed: Number
// });

// const pokemonModel = mongoose.model("pokemons", pokemonSchema);

mongoose.connect("mongodb+srv://pokemon:comp2537@cluster0.thyz8.mongodb.net/timelineDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const timelineSchema = new mongoose.Schema({
    text: String,
    hits: Number,
    time: String
});

const timelineModel = mongoose.model("timelines", timelineSchema);

app.get('/timeline/getAllEvents', function(req, res) {
    timelineModel.find({}, function(err, data) {
        if (err) {
            console.log("Error: " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send(data);
    });
})

app.put('/timeline/insert', function (req, res) {
    console.log(req.body);
    timelineModel.create({
        'text': req.body.text,
        'time': req.body.time,
        'hits': req.body.hits
    }, function (err, data) {
        if (err) {
            console.log("Error! " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send(data);
    });
})

app.get('/timeline/delete/:id', function (req, res) {
    // console.log(req.body);
    timelineModel.deleteOne({
        '_id': req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error! " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send("Remove request is successful!");
    });
})

app.get('/timeline/increaseHits/:id', function (req, res) {
    // console.log(req.body);
    timelineModel.updateOne({
        '_id': req.params.id
    }, {
        $inc: {
            'hits': 1
        }
    }, function (err, data) {
        if (err) {
            console.log("Error! " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send("Hits successfully increased!");
    });
})

app.get('/timeline/delete/:id', function (req, res) {
    // console.log(req.body);
    timelineModel.deleteOne({
        '_id': req.params.id
    }, function (err, data) {
        if (err) {
            console.log("Error! " + err);
        } else {
            console.log("Data: " + data);
        }
        res.send("Remove request is successful!");
    });
})

// checks to see if the database is connected by logging the JSON data in console
// app.get('/', (req, res) => {
//     pokemonModel.find({}, function (err, data) {
//         if (err) {
//             console.log("Error " + err);
//         } else {
//             console.log("Data " + data);
//         }
//         res.send(data);
//     });
// })