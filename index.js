const express = require("express");
const morgan = require("morgan");
const cors = require("cors");






// custom morgan token to display body in post request
morgan.token("body", function getBody(req) {
  const body = JSON.stringify(req.body);
  return body;
});

const app = express();
app.use(express.static('dist'))


//Added cors middleware to allow frontend connection
app.use(cors());

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  
];

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('↑ ↑ ↑ This output is from the fn requestLogger')
//   next()
// }

//Parsing the data to JSON
app.use(express.json());

// Exercise 3.7: Phonebook backend step7
// Morgan middleware
// app.use(morgan("tiny"));

// Exercise 3.8: Phonebook backend step8
// morgan configured to show the data sent in HTTP POST requests ( I used token and JSON.stringify)
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);



// Exercise 3.1: Phonebook backend step1
//Route to get all persons (GET method)
app.get("/api/persons", (request, response) => {

  response.json(persons)
});

// Exercise 3.2: Phonebook backend step2
//Route to get how many entries are there in the phonebook (GET method)
app.get("/info", (request, response) => {
  const date = new Date();
  response.send(`Phonebook has info for ${persons.length} people <br> ${date}`);
});

// Exercise 3.3: Phonebook backend step3
//Route to get a single person by id, and if not found, return 404 (GET method)
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response
      .status(404)
      .send({ error: `Person with id ${id} not found` })
      .end();
  }
});

// Exercise 3.4: Phonebook backend step4
//Route to delete a single person by id (DELETE method)
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// Exercise 3.5: Phonebook backend step5
//Route to add a new person (entrie) to the phonebook (POST method)
// app.post("/api/persons", (request, response) => {
//   const body = request.body;
//   const newPerson = {
//     id: Math.floor(Math.random() * 1000).toString(),
//     name: body.name,
//     number: body.number,
//   };
//   persons = persons.concat(newPerson);
//   response.status(201).json(newPerson);
// console.log(newPerson);
// });


// Exercise 3.6: Phonebook backend step6
//Route to add a new person (entrie) to the phonebook (POST method), with validation
app.post("/api/persons", (request, response) => {
  const body = request.body;

  //We check if the request body has the name and number
  if (!body.name || !body.number) {
    return response
      .status(400)
      .json({ error: "Both, name and number are required" });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 1000).toString(),
    name: body.name,
    number: body.number,
  };
  //We check if the name already exists in the phonebook
  const existingPerson = persons.find((person) => person.name === body.name);
  if (existingPerson) {
    return response.status(400).json({ error: "Name must be unique" });
  }
  persons = persons.concat(newPerson);

  response.status(201).json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});