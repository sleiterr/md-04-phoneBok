import { createSlice, createSelector } from "@reduxjs/toolkit"; // createSlice for reducers, createSelector for memoized selectors
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./contactsOps"; // async thunks from contactOps

//Slice definition
const contactsSlice = createSlice({
  name: "contacts", // name of slice, used in store
  initialState: {
    items: [], //array of contacts
    loading: false, // loading state for async actions
    error: null,
    filters: { name: "" }, // filter state for searching contacts
  },
  reducers: {
    // synchronous actions
    setFilter(state, action) {
      state.filters.name = action.payload;
      // updates the filter string for searching contacts
    },
  },

  // extraReducer for async thunks
  extraReducers: (builder) => {
    builder
      //! FETCH CONTACTS
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true; // set loading true when request starts
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload; // save fetched contacts to state
        state.loading = false;
        state.error = null; // clear previous errors
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //!add
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload); // add the new contact from payload to items array
        state.loading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //! update contacts
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        // find the contact in items array by _id
        const index = state.items.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // replace the contact with updated data
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //! delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        // remove contact by _id
        state.items = state.items.filter(
          (contact) => contact._id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selector of filtered contacts
export const selectFilteredContacts = createSelector(
  (state) => state.contacts.items, // all contacts
  (state) => state.contacts.filters.name, // current filter string
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ) // return contacts that match filter
);

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
