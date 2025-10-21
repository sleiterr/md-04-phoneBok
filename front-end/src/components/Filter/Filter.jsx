import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/contactsSlice";
import clsx from "clsx";

const Filter = () => {
  const filter = useSelector((state) => state.contacts.filters.name);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <label className="flex flex-col gap-2 font-normal text-lg text-center text-primary mt-8">
      Find contacts by name
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        className={clsx(
          "block w-xs rounded-lg border border-cyan-400 bg-white/5 px-4 py-2 text-sm text-white",
          "focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-0",
          "transition-all duration-300"
        )}
      />
    </label>
  );
};

export default Filter;
