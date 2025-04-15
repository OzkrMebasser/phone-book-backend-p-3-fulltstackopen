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
    validate: {
      validator: function (v) {
        // RegEx to validate the numbers formtat
        return /^(\d{2}|\d{3})-\d+$/.test(v) && v.length >= 9;
      },
      message: (props) => `${props.value} is not a valid number, must be at least 8 characters long and formatted like 09-1234556 or 040-22334455!`,
    },
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
