import { createSlice } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: true
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        }
    }
})

export const { setSingleCompany } = companySlice.actions;
export default setSingleCompany.reducer