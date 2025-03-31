require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

//Model
const Person = require("./models/person");

// custom morgan token to display body in post request
morgan.token("body", function getBody(req) {
  const body = JSON.stringify(req.body);
  return body;
});

const app = express();
app.use(express.static("dist"));

//Added cors middleware to allow frontend connection
app.use(cors());

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },

// ];

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('↑ ↑ ↑ This output is from the fn requestLogger')
//   next()
// }

//Parsing the data to JSON
app.use(express.json());

// Morgan middleware
// app.use(morgan("tiny"));
// morgan configured to show the data sent in HTTP POST requests ( I used token and JSON.stringify)
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);

// Connect to MongoDB
const url = process.env.MONGODB_URI;
// console.log("This is my url string to connecto to mongo: ", url);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

//Route to get all persons (GET method)
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

//Route to get how many entries are there in the phonebook (GET method)
app.get("/info", (request, response) => {
  Person.countDocuments({}).then((count) => {
    // console.log(count);
    const date = new Date();
    response.send(`Phonebook has info for ${count} people <br> ${date}`);
  });
});

//Route to get a single person by id, and if not found, return 404 (GET method)
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    // console.log(`This is the person checked with id: ${person.id}`, person)
    if (person) {
      response.json(person);
    } else {
      response.status(404).send({ error: `Person with id ${person.id} not found` });
    }
  });
});

// Route to add a new person (entry) to the phonebook (POST method), with validation
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // We check if the request body has the name and number
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Both, name and number are required" });
  }

  const newPerson = new Person({
    // id: Math.floor(Math.random() * 1000).toString(),
    //We use the auto-generated id from mongodb
    name: body.name,
    number: body.number,
  });

  // We check if the name already exists in the phonebook
  Person.findOne({ name: body.name })
    .then((existingPerson) => {
      if (existingPerson) {
        return response.status(400).json({ error: "Name must be unique" });
      }

      // We save the new person to the database
      return newPerson.save();
    })
    .then((savedPerson) => {
      response.status(201).json(savedPerson);
      console.log(
        `added ${savedPerson.name} number ${savedPerson.number} to phonebook`
      );
    })
    .catch((error) => {
      response.status(500).json({ error: error.message });
    });
});


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
