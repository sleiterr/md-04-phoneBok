import { connectDB } from "./db";
import PhoneBook from "../models/my_contact";

export default async function handler(req, res) {
  await connectDB();

  try {
    const phoneNumber = await PhoneBook.find({});

    res.status(200).json({
      status: "Success",
      data: { phoneNumber },
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
}
