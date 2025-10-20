import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedNumber = phoneNumber.replace(/[\s-]/g, "");
    const formatedNumber = cleanedNumber.startsWith("+")
      ? cleanedNumber
      : `+${cleanedNumber}`;
    if (!/^\+\d{10,15}$/.test(formatedNumber)) {
      alert("Please enter a valid phone number (10-15 digits, optional +)");
      return;
    }
    dispatch(addContact({ name, phoneNumber }));
    setName("");
    setPhoneNumber("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Phone
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
