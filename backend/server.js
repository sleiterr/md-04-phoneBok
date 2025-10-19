const express = require("express"); // Importerer Express framework til server
const mongoose = require("mongoose"); // Importerer Mongoose til MongoDB
const cors = require("cors"); // Importerer CORS Middleware
require("dotenv").config(); // Loader miljøvariabler fra .env

const PhoneBook = require("./models/my_contact");

const app = express();

// Middleware
app.use(cors()); // Aktiverer CORS
app.use(express.json()); // Aktiverer JSON parsing

// MongoDB connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Server running and conected to MongoDB!");
});

// POST: add a new contact to the database
app.post("/add-phone", async (req, res) => {
  try {
    // Create a new PhoneBook document from request body
    const phoneNumber = new PhoneBook(req.body);
    // Save the new contact to the database
    await phoneNumber.save();

    // Respond with success status and the saved contact
    res.status(201).json({
      status: "Success",
      data: {
        phoneNumber,
      },
    });
  } catch (err) {
    // If saving fails, respond with error status and message
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

// GET: Fetch all phone contacts from MongoDB
app.get("/get-phone", async (req, res) => {
  try {
    // Find all documents (contacts) in the PhoneBook collection
    const phoneNumber = await PhoneBook.find({});

    if (!phoneNumber.length) {
      //if list is empty, return 404
      return res.status(404).json({
        status: "Failed",
        message: "No contacts found",
      });
    }

    // If successful, send a JSON response with status 200 (OK)
    res.status(200).json({
      status: "Success", // custom message (not required, but nice for debugging)
      //! data: send back the array of contacts
      data: {
        phoneNumber,
      },
    });
  } catch (err) {
    // If something goes wrong, send error response with status 500 (Server Error)
    res.status(500).json({
      status: "Failed", // custom error message
      message: err.message, // the actual error message from Mongoose/Node
    });
  }
});

// PATCH: update a specific phone contact by its ID
app.patch("./update-phone:id", async (req, res) => {
  try {
    // Find contact by ID and update its data with new values from req.body
    const updatedPhone = await PhoneBook.findByIdAndUpdate(
      req.params.id, // get the ID from the request URL
      req.body, // new data to update (sent from frontend)
      {
        new: true, // return the updated document (not the old one)
        runValidators: true, // run Mongoose validation rules defined in the schema
      }
    );

    if (!updatedPhone) {
      return res.status(404).json({
        status: "Failed",
        message: "Contact not found",
      });
    }
    // if update is successful, return status 200 (OK)
    res.status(200).json({
      status: "Success",
      data: {
        updatedPhone,
      },
    });
  } catch (err) {
    // if something went wrong, return 500 (Server Error)
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

// DELETE: remove a specific contact by its ID
app.delete("/delete-phone/:id", async (req, res) => {
  try {
    const deletePhone = await PhoneBook.findByIdAndDelete(req.params.id);

    // If no document was found with that ID, return 404 (Not Found)
    if (!deletePhone) {
      return res.status(404).json({
        status: "Failed",
        message: "Contact not found",
      });
    }

    //? If deletion was successful, return status 204 (No Content)
    //! 204 means: request succeeded, but there's no content to return
    res.status(204).json({
      status: "Success",
      data: {},
    });
  } catch (err) {
    // If something went wrong (e.g. invalid ID format, DB error), return 500
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
