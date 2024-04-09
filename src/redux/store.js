// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import beneficiariesReducer from './reducers';

const store = configureStore({
    reducer: {
        beneficiaries: beneficiariesReducer,
    },
});

export default store;
