import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CustomDetails = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [beneficiaries, setBeneficiaries] = useState([]);

    const onSubmit = (data) => {
        const newBeneficiary = { id: beneficiaries.length + 1, ...data };
        setBeneficiaries([...beneficiaries, newBeneficiary]);
        reset();
        localStorage.setItem('customer-details-available', 'yes');
        navigate('/manage-beneficiaries');
    };

    return (
        <div className='customer_details_wrap'>
            <div className='content_container'>
                <h1>Customer Details</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='form_fields_wrap'>
                    <div className='form_col'>
                        <label>Full Name:</label>
                        <input type="text" name="fullName" {...register('fullName', { required: true })} />
                        {errors.fullName && <span className='error_msg'>Please enter fullname</span>}
                    </div>
                    <div className='form_col'>
                        <label>Address:</label>
                        <input type="text" name="address" {...register('address', { required: true })} />
                        {errors.address && <span className='error_msg'>Please enter address</span>}
                    </div>
                    <div className='form_col'>
                        <label>Country:</label>
                        <select name="country" {...register('country', { required: true })}>
                            <option disabled selected value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="Japan">Japan</option>
                            <option value="China">China</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                        {errors.country && <span className='error_msg'>Please select country</span>}
                    </div>
                    <div className='form_col'>
                        <label>Pincode:</label>
                        <input type="text" name="pincode" {...register('pincode', { required: true })} />
                        {errors.pincode && <span className='error_msg'>Please enter pincode</span>}
                    </div>
                    <div className='form_col form_col_submit'>
                        <button type="submit" className='submit_btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CustomDetails;
