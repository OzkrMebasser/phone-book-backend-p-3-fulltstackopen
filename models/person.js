const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// Defining the schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, "Name must be at least 3 characters long"],

    unique: true,
  },
  number: {
    type: String,
    required: [true, 'Number is required'],
  },
});
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
