import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./contactsOps";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [], //array of contacts
    loading: false,
    error: null,
    filters: { name: "" },
  },
  reducers: {
    setFilter(state, action) {
      state.filters.name = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      //!fetch
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
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
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //!update
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //!delete
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
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

// Selector of filters
export const selectFilteredContacts = createSelector(
  (state) => state.contacts.items,
  (state) => state.contacts.filters.name,
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
