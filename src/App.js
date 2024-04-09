// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ManageBeneficiaries from './components/ManageBeneficiaries';
import EditBeneficiary from './components/EditBeneficiary';
import ViewBeneficiary from './components/ViewBeneficiary';
import RemoveBeneficiary from './components/RemoveBeneficiary';
import './App.scss';

// Other imports

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path="/" element={<ManageBeneficiaries/>} />
                    <Route exact path="/edit/:id" element={EditBeneficiary} />
                    <Route exact path="/view/:id" element={ViewBeneficiary} />
                    <Route exact path="/remove/:id" element={RemoveBeneficiary} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
