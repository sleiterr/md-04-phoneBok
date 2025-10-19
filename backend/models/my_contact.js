const mongoose = require("mongoose");

// PhoneBook model — defines the structure of contacts in the database
const PhoneBookSchema = new mongoose.Schema(
  {
    //  Contact's name can include first and last name
    name: {
      type: String,
      required: true, // required field
      trim: true, // removes whitespace from both ends
      minlength: 2,
      maxlength: 50,
    },

    // Contact's phone number
    phoneNumber: {
      type: String, // String is better for numbers with '+' or formatting
      required: true, // required field
      match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"], // regex to validate phone number
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt fields
);
// Create the model
const PhoneBook = mongoose.model("PhoneBook", PhoneBookSchema, "contacts");
// Export the model to use in other parts of the app
module.exports = PhoneBook;
