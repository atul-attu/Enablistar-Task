// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CustomerDetails from './components/CustomerDetails';
import ManageBeneficiaries from './components/ManageBeneficiaries';
import './App.scss';

const App = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route exact path="/" element={<CustomerDetails />} />
                <Route exact path="/manage-beneficiaries" element={<ManageBeneficiaries />} />
            </Routes>
        </Provider>
    );
};

export default App;
