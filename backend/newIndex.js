const express = require("express"); // per te importuar librarine express.js per te ekspozuar endpoints
const bodyParser = require("body-parser"); // TODO
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
  attendees: Array,
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

app.post("/login", async (req, res) => {
  const body = req.body;
  const { email, password } = body;
  const user = await User.findOne({ email: email, password: password });
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

app.get("/events", async (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const events = await Event.find({});
  res.json(events);
});

app.get("/events/:id", async (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const idToFind = req.params.id;
  const event = await Event.findById(idToFind);
  res.json(event);
});

app.put("/events/:id", async (req, res) => {
  const isValid = checkToken(req, res, true);
  if (!isValid) {
    return;
  }
  const idToUpdate = req.params.id;
  const body = req.body;
  const { name, date, description, location, organizer, rating } = body;
  if (rating < 1 || rating > 5) {
    return res.status(400).end();
  }
  const event = await Event.findOne({ _id: idToUpdate });
  if (!event && event.id !== idToUpdate) {
    return res.status(404).end();
  } else {
    event.name = name;
    event.date = date;
    event.description = description;
    event.location = location;
    event.organizer = organizer;
    event.rating = rating;
    await event.save();
    res.json(event);
  }
});

app.post("/events", async (req, res) => {
  const tokenValid = checkToken(req, res, true);
  if (!tokenValid) {
    return;
  }
  const body = req.body;
  const { name, date, description, location, organizer, rating } = body;
  const eventExists = await Event.exists({ name: name });
  if (eventExists) {
    return res.status(409).end();
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).end();
  }
  const newEvent = new Event({
    name,
    date: newDate(),
    description,
    location,
    organizer,
    rating,
  });
  await newEvent.save();
  res.json(newEvent);
});

app.put("/events/:id/attendees", async (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  const userId = decodedToken._id;
  const idToFind = req.params.id;
  const event = await Event.findById(idToFind);
  if (event.attendees.some((attendee) => attendee.id === userId)) {
    return res.status(400).json({ error: "User is already subcribed " });
  }
  const user = {
    id: decodedToken._id,
    firstname: decodedToken.firstname,
    lastname: decodedToken.lastname,
  };
  event.attendees = [...event.attendees, user];
  await event.save();
  return res.status(200).end();
});

app.delete("/events/:id/attendees", async (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "secret");
  const userId = decodedToken._id;
  const idToFind = req.params.id;
  const event = await Event.findById(idToFind);
  if (!event.attendees.some((attendee) => attendee.id === userId)) {
    return res.status(404).json({ error: "User is not subscribed" });
  }
  event.attendees = event.attendees.filter(
    (attendee) => attendee.id !== userId
  );
  await event.save();
  return res.status(200).end();
});

app.delete("/events/:id", async (req, res) => {
  const tokenResult = checkToken(req, res, true);
  if (!tokenResult) {
    return;
  }
  const idToDelete = req.params.id;
  const eventExists = await Event.exists({ _id: idToDelete });
  if (eventExists) {
    await Event.deleteOne({ _id: idToDelete });
    return res.status(200).end();
  } else {
    return res.status(404).end();
  }
});

app.get("/users", async (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const users = await User.find({});
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const tokenResult = checkToken(req, res);
  if (!tokenResult) {
    return;
  }
  const idToFind = req.params.id;
  const user = await User.findById(idToFind);
  res.json(user);
});

app.post("/users", async(req, res) => {
    const body = req.body;
    const {firstname, lastname, email, phone, password } = body;
    if (!email || email === ""){
        return res.status(400).json({ error: "Please provide an email"});
    }
    const newUser = new User({
        firstname,
        lastname,
        email,
        phone,
        password,
        role: "User",
    });
    await newUser.save();
    res.json(newUser);
});

app.put("/users/:id", async(req, res) => {
    const tokenResult = checkToken(req, res,  true);
    if(!tokenResult) {
        return;
    }
    const idToUpdate = req.params.id;
    const body =  req.body;
    const{ firstname, lastname, email, phone, password, role } = body;
    const user = await User.findById(idToUpdate);
    if (!user) {
        return res.status(404).json({ error: "User not found "});
    }
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.phone = phone;
    user.password = password;
    user.role = role;
await user.save();
res.json(updatedUser);
});

app.delete("/users/:id", async(req, res) => {
    const tokenResult = checkToken(req, res , true);
    if(!tokenResult) {
        return;
    }
    const idToDelete = req.params.id;
    const deletedUser = await User.findByIdAndDelete(idToDelete);
    if(!deletedUser) {
        return res.status(404).json({ error: "User not found"});
    }
    res.json(deletedUser);
});

app.post("/admin", async (req, res) => {
    const tokenResult = checkToken(req, res,  true);
    if(!tokenResult) {
        return;
    }
    const body = req.body;
    const { firstname, lastname, email, phone, password, role } = body;
    if(!email || email === "") {
        return res.status(400).json({ error: "Please provide an email" });
    }
    const newUser = newUser({
        firstname,
        lastname,
        email,
        phone,
        password,
        role: role? role : "User",
    });
    await newUser.save();
    res.json(newUser);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.listen(3001, () => {
  console.log("Listening to port 3001");
});
