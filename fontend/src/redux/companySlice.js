import { combineSlices, createSlice } from "@reduxjs/toolkit";
import reducer from "./authSlice";

const companySlice = createSlice({
    name: 'company',
    initialState: {
        singleCompany: null,
        companies: [],
        filterCompanyByText: ""
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setfilterCompanyByText: (state, action) => {
            state.filterCompanyByText = action.payload;
        }

    }
})

export const { setSingleCompany, setCompanies, setfilterCompanyByText } = companySlice.actions;
export default companySlice.reducer