import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

import clsx from "clsx";

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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label className="flex flex-col gap-2 font-normal text-lg text-primary">
        Name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={clsx(
            "block w-xs rounded-lg border border-cyan-400 bg-white/5 px-4 py-2 text-sm text-white",
            "focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-0",
            "transition-all duration-300"
          )}
        />
      </label>
      <label className="flex flex-col gap-2 font-normal text-lg text-primary mt-4">
        Phone
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className={clsx(
            "block w-xs rounded-lg border border-cyan-400 bg-white/5 px-4 py-2 text-sm text-white",
            "focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-0",
            "transition-all duration-300"
          )}
        />
      </label>
      <button
        type="submit"
        className="text-primary bg-sky-700 py-2 rounded-lg cursor-pointer mt-6"
      >
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
