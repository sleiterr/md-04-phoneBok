import { connectDB } from "./db";
import PhoneBook from "../models/my_contact";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    const { id } = req.query;

    await PhoneBook.findByIdAndDelete(id);

    res.status(204).json({ status: "Success" });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
}
