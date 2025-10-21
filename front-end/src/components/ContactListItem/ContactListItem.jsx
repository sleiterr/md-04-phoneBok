import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteContact(contact._id)).unwrap();
      toast.success(`Contact "${contact.name}" delted successfully!`);
    } catch (error) {
      toast.error(`Failed to delete: ${error}`);
    }
  };

  return (
    <li className="flex items-center justify-between">
      <div className="flex flex-row items-center gap-2">
        <p className="font-normal text-base text-primary">{contact.name}</p>
        <p className="font-normal text-base text-primary">
          {contact.phoneNumber}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-2">
        <button
          onClick={handleDelete}
          className="text-primary bg-red-600 py-1 px-4 rounded-sm transition-all cursor-pointer"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

export default ContactListItem;
