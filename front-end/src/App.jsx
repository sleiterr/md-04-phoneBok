import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ContactForm from "./components/ContactForm/ContactForm";

import { fetchContacts } from "../src/redux/contactsOps";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="">
      <h1>Phone Book</h1>
      <ContactForm />
    </div>
  );
};

export default App;
