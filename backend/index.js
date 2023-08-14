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

const jwt = require("jsonwebtoken");

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  description: String,
  location: String,
  organizer: String,
  rating: Number,
  attendees:Array,
});

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  password: String,
  role: String,
});

const Event = mongoose.model("Event", eventSchema);

const User = mongoose.model("User", userSchema);

const checkToken = (req, res, checkAdmin = false) => {
  if (!req.headers.authorization) {
    res.status(401).end();
    return false;
  }

  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.verify(token, "secret");

  if (!decodedToken) {
    res.status(401).end();
    return false;
  }

  if (checkAdmin && decodedToken.role !== "Admin") {
    res.status(403).end();
    return false;
  }

  return true;
};

app.post("/login", (req, res) => {
  const body = req.body;
  const { email, password } = body;

  User.findOne({ email: email, password: password }).then((user) => {
    if (!user) {
      return res.status(401).end();
    }

    const token = jwt.sign(
      {
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      "secret"
    );
    return res.json({ token: token }).end();
  });
});

app.get("/events", (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }

  Event.find({}).then((events) => {
    res.json(events);
  });
});

app.get("/events/:id", (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const idToFind = req.params.id;

  Event.findById(idToFind).then((event) => {
    res.json(event);
  });
});

app.put("/events/:id", (req, res) => {
  const isValid = checkToken(req, res, true);
  if (!isValid) {
    return;
  }
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
  const tokenValid = checkToken(req, res, true);
  if (!tokenValid) {
    return;
  }

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

app.get("/events/:search", (req, res) => {
  const searchToFind = req.params.search;

  Event.findBySearch(searchToFind).then((event) => {
    res.json(event);
  });
});
app.put("/events/:id/attendees", (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");

  const user = {
    id : decodedToken._id,
    firstname : decodedToken.firstname,
    lastname : decodedToken.lastname,
  };
  const idToFind = req.params.id;
  Event.findById(idToFind).then((event) => {
    event.attendees = [
      ...event.attendees,
      user
    ];
    event.save().then(() => {
      return res.status(200).end();
    });
  });
});


app.delete("/events/:id", (req, res) => {
  const tokenResult = checkToken(req, res, true);
  if (!tokenResult) {
    return;
  }
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
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  User.find({}).then((users) => {
    res.json(users);
  });
});
app.get("/users/:id", (req, res) => {
  const tokenResult = checkToken(req, res, true);
  if (!tokenResult) {
    return;
  }
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
  const { firstname, lastname, email, phone, password } = body;

  if (!email || email === "") {
    return res.status(400).json({ error: "Please provide an email" });
  }

  const newUser = new User({
    firstname,
    lastname,
    email,
    phone,
    password,
    role: "User",
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
  const tokenResult = checkToken(req, res, true);
  if (!tokenResult) {
    return;
  }
  const idToUpdate = req.params.id;
  const body = req.body;
  const { firstname, lastname, email, phone, password, role } = body;

  User.findById(idToUpdate)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.firstname = firstname;
      user.lastname = lastname;
      user.email = email;
      user.phone = phone;
      user.password = password;
      user.role = role;

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
  const tokenResult = checkToken(req, res, true);
  if (!tokenResult) {
    return;
  }
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
app.post("/admin", (req, res) => {
  const tokenResult = checkToken(req, res, true);
  if (!tokenResult) {
    return;
  }
  const body = req.body;
  const { firstname, lastname, email, phone, password, role } = body;

  if (!email || email === "") {
    return res.status(400).json({ error: "Please provide an email" });
  }

  const newUser = new User({
    firstname,
    lastname,
    email,
    phone,
    password,
    role: role ? role : "User",
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

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3001, () => {
  console.log("Listening to port 3001");
});