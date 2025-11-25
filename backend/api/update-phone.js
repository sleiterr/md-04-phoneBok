import { connectDB } from "./db";
import PhoneBook from "../models/my_contact";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectDB();

  try {
    const { id } = req.query;
    const updated = await PhoneBook.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "Success",
      data: { updatedPhone: updated },
    });
  } catch (err) {
    res.status(500).json({ status: "Failed", message: err.message });
  }
}
