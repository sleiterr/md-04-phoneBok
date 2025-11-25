import { connectDB } from "./db";
import PhoneBook from "../models/my_contact";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    let { phoneNumber, name } = req.body;

    if (!phoneNumber.startsWith("+")) {
      phoneNumber = `+${phoneNumber.replace(/[\s-]/g, "")}`;
    }

    const newPhone = await PhoneBook.create({ phoneNumber, name });

    res.status(201).json({
      status: "Success",
      data: { phoneNumber: newPhone },
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
}
