const express = require("express");
var bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/events", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  description: String,
  location: String,
  organizer: String,
  rating: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const Event = mongoose.model("Event", eventSchema);

const User = mongoose.model("User", userSchema);

app.get("/events", (req, res) => {
  Event.find({}).then((events) => {
    res.json(events);
  });
});

app.get("/events/:id", (req, res) => {
  const idToFind = req.params.id;

  Event.findById(idToFind).then((event) => {
    res.json(event);
  });
});

app.put("/events/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const body = req.body;
  const { name, description, location, organizer, rating } = body;

  if (rating < 1 || rating > 5) {
    return res.status(400).end();
  }

  Event.findOne({ name: name }).then((existingEvent) => {
    if (existingEvent && existingEvent.id !== idToUpdate) {
      return res.status(409).end();
    } else {
      Event.findOne({ _id: idToUpdate })
        .then((event) => {
          if (!event) {
            return res.status(404).end();
          } else {
            event.name = name;
            event.description = description;
            event.location = location;
            event.organizer = organizer;
            event.rating = rating;

            event.save().then(() => {
              return res.status(200).end();
            });
          }
        })
        .catch((e) => {
          return res.status(400).end();
        });
    }
  });
});

app.post("/events", (req, res) => {
  const body = req.body;
  const { name, description, location, organizer, rating } = body;

  Event.exists({ name: name }).then((exists) => {
    if (exists) {
      return res.status(409).end();
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).end();
    } else {
      const newEvent = new Event({
        name,
        date: new Date(),
        description,
        location,
        organizer,
        rating,
      });
      newEvent.save().then(() => {
        res.status(201).end();
      });
    }
  });
});

app.delete("/events/:id", (req, res) => {
  const idToDelete = req.params.id;
  Event.exists({ _id: idToDelete })
    .then((exists) => {
      if (exists) {
        Event.deleteOne({ _id: idToDelete }).then(() => {
          return res.status(200).end();
        });
      } else {
        return res.status(404).end();
      }
    })
    .catch((e) => {
      return res.status(400).end();
    });
});
app.get("/users", (req, res) => {
  User.find({}).then((users) => {
    res.json(users);
  });
});
app.get("/users/:id", (req, res) => {
  const idToFind = req.params.id;

  User.findById(idToFind)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(500).json({ error: "Something went wrong" });
    });
});
app.post("/users", (req, res) => {
  const body = req.body;
  const { name, email, phone } = body;

  if (!email || email === "") {
    return res.status(400).json({ error: "Please provide an email" });
  }

  const newUser = new User({
    name,
    email,
    phone,
  });

  newUser
    .save()
    .then(() => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.status(400).json({ error: "Failed to create user" });
    });
});
app.put("/users/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const body = req.body;
  const { name, email, phone } = body;

  User.findById(idToUpdate)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.name = name;
      user.email = email;
      user.phone = phone;

      return user.save();
    })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((error) => {
      res.status(400).json({ error: "Failed to update user" });
    });
});
app.delete("/users/:id", (req, res) => {
  const idToDelete = req.params.id;

  User.findByIdAndDelete(idToDelete)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(deletedUser);
    })
    .catch((error) => {
      res.status(400).json({ error: "Failed to delete user" });
    });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3001, () => {
  console.log("Listening to port 3001");
});
