const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/events",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

const eventSchema=new mongoose.Schema({
    name: String,
    date: Date,
    rating: Number,
});

const userSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const Event = mongoose.model("Event", eventSchema);

const User = mongoose.model("User",userSchema);


app.get("/events",(req, res)  => {
    Event.find({}).then(events => {
        res.json(events);
    })
});

app.get("/events/:id", (req, res) => {
    const idToFind = req.params.id;

    Event.findById(idToFind).then(event => {
        res.json(event);
    })
});

app.put("/events/:id", (req, res) => {
    const idToUpdate = req.params.id;
    const body = req.body;
    const { name, rating } = body;

    if(rating < 1 || rating > 5) {
        return res.status(400).end();
    }

    Event.findOne({ name: name })
        .then(existingEvent => {
            if(existingEvent && existingEvent.id !== idToUpdate) {
                return res.status(409).end();
            } else {
                Event.findOne({ _id: idToUpdate }).then(event => {
                    if(!event) {
                        return res.status(404).end();
                    } else {
                        event.name = name;
                        event.rating = rating;
                        event.save().then(() => {
                            return res.status(200).end();
                        })
                    }
                })
                .catch(e => {
                    return res.status(400).end();
                })
            }});
});

app.post("/events",(req, res) => {
    const body = req.body;
    const { name, rating } = body;


    Event.exists({ name: name })
        .then(exists => {
            if(exists) {
                return res.status(409).end();
            }

            if(rating < 1 || rating > 5) {
                return res.status(400).end();
            } else {
                const newEvent = new Event({
                    name,
                    date: new Date(),
                    rating
                });
                newEvent.save().then(() => {
                    res.status(201).end();
                });
            }
        });
});

app.delete("/events/:id", (req, res) => {
    const idToDelete = req.params.id;
    Event.exists({ _id: idToDelete})
        .then(exists => {
            if(exists) {
                Event.deleteOne({ _id: idToDelete })
                    .then(() => {
                        return res.status(200).end();
                    });
            } else {
                return res.status(404).end();
            }
        })
        .catch(e => {
            return res.status(400).end();
        });
});

app.post("/users", (req,res) => {
    const newUser = new User({
        name:"Erta",
        email:"ertacupi@gmail.com",
        phone:"0682024386"
    });
    newUser.save().then(() => {
        res.send("User created")
    });
})

app.get("/users", (req, res)  => {
    res.json([{
        username:"ertacupi@gmail.com",
        firstname:"Erta",
        lastname:"Cupi",
    }, {
        name:"ervinkurushi@live.com",
        firstname:"Ervin",
        lastname:"Kurushi",
    }])
})

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(3000, () => {
    console.log("listeningto3000")
});