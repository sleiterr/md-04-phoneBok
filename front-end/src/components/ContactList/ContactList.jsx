import React from "react";
import { useSelector } from "react-redux";
import ContactListItem from "../ContactListItem/ContactListItem";
import { selectFilteredContacts } from "../../redux/contactsSlice";

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul>
      {filteredContacts.map((contact) => {
        <ContactListItem key={contact.id} contact={contact} />;
      })}
    </ul>
  );
};

export default ContactList;
