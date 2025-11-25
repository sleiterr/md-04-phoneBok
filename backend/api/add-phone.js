import mongoose from "mongoose";
import PhoneBook from "../../backend/models/my_contact";

mongoose.connect(process.env.URI);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const body = req.body;
    if (!body.phoneNumber.startsWith("+")) {
      body.phoneNumber = `+${body.phoneNumber.replace(/[\s-]/g, "")}`;
    }
    const newContact = new PhoneBook(body);
    await newContact.save();
    res
      .status(201)
      .json({ status: "Success", data: { phoneNumber: newContact } });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
}
