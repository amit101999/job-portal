import { createSlice } from "@reduxjs/toolkit";

const applicantionSlice = createSlice({
    name: "applicants",
    initialState: {
        allApplicants: null,
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.allApplicants = action.payload;
        }
    }
})

export const { setAllApplicants } = applicantionSlice.actions;
export default applicantionSlice.reducer