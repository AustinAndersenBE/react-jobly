import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import JoblyApi from '../../api'

export const applyToJob = createAsyncThunk(
  'user/applyToJob',
  async ({ username, jobId }, { rejectWithValue } ) => {
    try {
      const appliedJobId = await JoblyApi.applyToJob(username, jobId);
      return appliedJobId;
    } catch (error) {
      console.error('Error applying to job:', error); // take this out in production
      return rejectWithValue("Error applying to job.");
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    applications: new Set(),
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyToJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applications.add(action.payload); // adding job ID to set of applied jobs
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;