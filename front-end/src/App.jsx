import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { fetchContacts } from "../src/redux/contactsOps";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <main>
      <div className="flex justify-center items-center min-h-screen">
        <div className="">
          <h1 className="fornt-light text-3xl text-primary text-center">
            Phone Book
          </h1>
          <ContactForm />
          <Filter />
          <ContactList />
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      </div>
    </main>
  );
};

export default App;
