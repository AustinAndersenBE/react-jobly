import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import JoblyApi from '../../api';

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (searchFilters, { rejectWithValue }) => {
    try {
      const companies = await JoblyApi.getCompanies(searchFilters);
      return companies;
    } catch (error) {
      console.error('Error fetching companies:', error); //in production, we would not console.error here
      return rejectWithValue('An error occurred while fetching companies.');
    }
  }
);

export const fetchCompany = createAsyncThunk(
  'companies/fetchCompany',
  async (handle, { rejectWithValue }) => {
    try {
      const company = await JoblyApi.getCompany(handle);
      return company;
    } catch (error) {
      console.error('Error fetching company:', error);
      return rejectWithValue('An error occurred while fetching the company.');
    }
  }
);

const initialState = {
  companies: [],
  currentCompany: null,
  isLoading: false,
  error: null
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCompany.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.currentCompany = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default companiesSlice.reducer;