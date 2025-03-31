// const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];
// // const name = process.argv[3];
// // const number = process.argv[4];

// const url = `mongodb+srv://oscarfs:${password}@cluster0.kaukhto.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose.set("strictQuery", false);

// mongoose.connect(url);

// // Defining the schema
// const personSchema = new mongoose.Schema({
//   name: String,
//   number: String,
// });

// // Creating the moddel based on my schema
// const Person = mongoose.model("Person", personSchema);

// // Adding a new person to the phonebook database
// if (process.argv.length > 4) {
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   });
//   person.save().then((result) => {
//     console.log(`added ${result.name} number ${result.number} to phonebook`);
//     mongoose.connection.close();
//   });
// } else if (process.argv.length === 3) {
//   Person.find({}).then((result) => {
//     console.log("phonebook:");
//     result.forEach((person) => {
//       console.log(`${person.name} ${person.number}`);
//     });
//     mongoose.connection.close();
//   });
// }
