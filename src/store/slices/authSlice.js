import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import JoblyApi from '../../api';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch, rejectWithValue }) => {
    try {
      const token = await JoblyApi.loginUser({ username, password });
      JoblyApi.token = token; //set token for API class
      localStorage.setItem('token', token); //set token in local storage
      dispatch(fetchUserProfile(username)); //fetch user profile
      return { token };
    } catch (error) {
      console.error(error);
      return rejectWithValue('An error occured while logging in.'); //return generic error message
    }
  }
);

// Async thunk for user registration
// User data requires username, firstName, lastName, password, email
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const token = await JoblyApi.registerUser(userData);
      JoblyApi.token = token;
      localStorage.setItem('token', token); //set token in local storage
      dispatch(fetchUserProfile(userData.username)); //fetch user profile
      return { token };
    } catch (error) {
      console.error(error);
      return rejectWithValue('An error occured while registering.'); //return generic error message
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (username, { rejectWithValue }) => {
    try {
      const user = await JoblyApi.fetchUserProfile(username);
      return { user };
    } catch (error) {
      console.error(error);
      return rejectWithValue('An error occured while fetching user profile.'); //return generic error message
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async ({ username, updateData }, { rejectWithValue }) => {
    try {
      const user = await JoblyApi.updateUserProfile({ username, updateData });
      return { user };
    } catch (error) {
      console.error(error);
      return rejectWithValue('An error occured while updating user profile.'); //return generic error message
    }
  }
);

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token; //the API does not return the user object on login
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token; //the API does not return the user object on registration
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;