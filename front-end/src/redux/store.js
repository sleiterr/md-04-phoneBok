import { configureStore } from "@reduxjs/toolkit"; // helper from Redux Toolkit to create store
import contactReducer from "./contactsSlice"; // import reducer from your slice

// Create redux store
export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    // the key "contacts" will define the slice of state:
    // state.contacts will hold all data managed by contactReducer
  },
});
