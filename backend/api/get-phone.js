import mongoose from "mongoose";
import PhoneBook from "../../backend/models/my_contact";

mongoose.connect(process.env.URI);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const contacts = await PhoneBook.find({});
    res
      .status(200)
      .json({ status: "Success", data: { phoneNumber: contacts } });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
}
