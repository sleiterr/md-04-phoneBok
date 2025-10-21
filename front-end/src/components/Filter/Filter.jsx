import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/contactsSlice";

const Filter = () => {
  const filter = useSelector((state) => state.contacts.filters.name);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label>
      Find contacts by name
      <input type="text" value={filter} onChange={handleChange} />
    </label>
  );
};

export default Filter;
