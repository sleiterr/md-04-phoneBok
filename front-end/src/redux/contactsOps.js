import { createAsyncThunk } from "@reduxjs/toolkit"; // Redux Toolkit helper for async actions
import axios from "axios"; // HTTP client for making requests

const BASE_URL = "http://localhost:3000"; // backend API base URL

//Get all contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll", // action type
  async (_, thunkAPI) => {
    //! thunkAPI provides access to dispatch, getState, and rejectWithValue for error handling
    try {
      const res = await axios.get(`${BASE_URL}/get-phone`); // request to backend
      return res.data.data.phoneNumber; // return array of contacts
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // handle error
    }
  }
);

//Add new contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/add-phone`, contact); // send contact object to backend
      return res.data.data.phoneNumber; // return the added contact
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Update contact use the _id
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/update-phone/${id}`,
        updateData
      ); // patch request with id
      return res.data.data.updatePhone; //return update Contact
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Update contact use the _id
export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/delete-phone/${id}`); // delete contact by id
      return id; // return deleted id to update state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
