// redux/reducers.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    beneficiaries: [
        { id: 1, beneficiaryName: 'John Doe', accountNumber: '123456789', bankName: 'Bank of America', accountType: 'savings' },
        { id: 2, beneficiaryName: 'Jane Smith', accountNumber: '987654321', bankName: 'Chase Bank', accountType: 'current' }
    ]
};

const beneficiariesSlice = createSlice({
    name: 'beneficiaries',
    initialState,
    reducers: {
        addBeneficiary(state, action) {
            state.beneficiaries.push({ id: state.beneficiaries.length + 1, ...action.payload });
        },
        updateBeneficiary(state, action) {
            const { id, data } = action.payload;
            const beneficiary = state.beneficiaries.find(b => b.id === id);
            if (beneficiary) {
                Object.assign(beneficiary, data);
            }
        },
        deleteBeneficiary(state, action) {
            state.beneficiaries = state.beneficiaries.filter(b => b.id !== action.payload);
        }
    }
});

export const { addBeneficiary, updateBeneficiary, deleteBeneficiary } = beneficiariesSlice.actions;

export default beneficiariesSlice.reducer;
