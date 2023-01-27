import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";

const URL = "http://openlibrary.org";

// Thunks
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async ({ query, page }, thunkAPI) => {
    if (query === "") {
      return [[], page];
    }

    try {
      const res = await axios({
        method: "GET",
        url: `${URL}/search.json?`,
        params: {
          q: query,
          page: page,
        },
        signal: thunkAPI.signal,
      });

      return [res.data.docs, page];
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const fetchBookByName = createAsyncThunk(
  "books/fetchBookByName",
  async (key, thunkAPI) => {
    try {
      const res = await axios({
        method: "GET",
        url: `${URL}/works/${key}.json`,
      });

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// Initial State
const initialState = {
  items: [],
  loading: "idle",
  error: null,
  hasMore: true,
};

export const booksSlice = createSlice({
  name: "books",
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      state.items.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.fulfilled, (state, action) => {
        if (action.payload[0].length === 0) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }

        if (action.payload[1] === 1) {
          state.items = [];
        }
        state.loading = "idle";
        state.items = [...new Set([...state.items, ...action.payload[0]])];
      })
      .addCase(fetchBooks.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(fetchBookByName.fulfilled, (state, action) => {
        state.items = action.payload
      });
  },
});

export default booksSlice.reducer;

// Selectors
export const selectBooks = (state) => state.books;
