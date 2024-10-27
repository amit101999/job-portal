import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: null,
        singleJob: null,
        allAdminJobs: [],
        searchJobByText: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJob: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },

    }
})

export const { setAllJobs, setSingleJob, setAllAdminJob, setSearchJobByText } = jobSlice.actions;
export default jobSlice.reducer