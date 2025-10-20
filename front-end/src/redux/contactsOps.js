import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // backend

//Get all contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/get-phone`);
      return res.data.data.phoneNumber; // array of contact
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//Add new contact
export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/add-phone`, contact);
      return res.data.data.phoneNumber;
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
      );
      return res.data.data.updatePhone; //Update Contact
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
      await axios.delete(`${BASE_URL}/delete-phone/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
