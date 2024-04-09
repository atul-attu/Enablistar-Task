// redux/reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    beneficiaries: [ // Make sure beneficiaries is initialized as an array
        { beneficiaryName: 'John Doe', accountNumber: '123456789', bankName: 'Bank of America', accountType: 'savings' },
        { beneficiaryName: 'Jane Smith', accountNumber: '987654321', bankName: 'Chase Bank', accountType: 'current' }
    ]
};

const beneficiariesSlice = createSlice({
    name: 'beneficiaries',
    initialState,
    reducers: {
        addBeneficiary(state, action) {
            state.beneficiaries.push(action.payload);
        },
        deleteBeneficiary(state, action) {
            state.beneficiaries = state.beneficiaries.filter(beneficiary => beneficiary.accountNumber !== action.payload.accountNumber);
        }
    }
});

export const { addBeneficiary, deleteBeneficiary } = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
