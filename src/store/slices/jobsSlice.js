import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import JoblyApi from '../../api'

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (searchFilters = {}, { rejectWithValue }) => {
      try {
        const jobs = await JoblyApi.getJobs(searchFilters);
        return jobs;
      } catch (error) {
        console.error('Error fetching jobs:', error);
        return rejectWithValue('An error occurred while fetching the jobs.');
      }
    }
  );

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: { jobs: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default jobsSlice.reducer;