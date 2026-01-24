import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookContext = createContext();

const BookContextProvider = ({ children }) => {
  const url = "http://localhost:5000/api";

  const handleApiError = (error) => {
    if (!error.response) {
      throw new Error("Network error. Please check your internet connection.");
    }

    const message =
      error.response.data?.message || "Something went wrong on the server.";

    throw new Error(message);
  };

  const getAllBooks = async ({ limit = 10, page = 1, search = "" } = {}) => {
    try {
      const params = { limit, page };

      // Only add search parameter if it's not empty
      if (search && search.trim() !== "") {
        params.search = search.trim();
      }

      const res = await axios.get(`${url}/book`, { params });

      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const getSingleBook = async (id) => {
    try {
      const res = await axios.get(`${url}/book/${id}`);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  const addNewBook = async (payload) => {
    try {
      const res = await axios.post(`${url}/book`, payload);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  const updateBook = async (id, payload) => {
    try {
      const res = await axios.patch(`${url}/book/${id}`, payload);
      return res.data;
    } catch (error) {
      handleApiError(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const res = await axios.delete(`${url}/book/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      handleApiError(error);
    }
  };

  return (
    <BookContext.Provider
      value={{ getAllBooks, getSingleBook, addNewBook, updateBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
