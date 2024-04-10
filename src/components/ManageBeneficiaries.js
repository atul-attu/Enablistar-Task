import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addBeneficiary, deleteBeneficiary, updateBeneficiary } from '../redux/reducers';
import Swal from 'sweetalert2';

const ManageBeneficiaries = () => {
	const navigate = useNavigate();

	useEffect(() => {
        const flag = localStorage.getItem('customer-details-available');
        if (flag !== 'yes') {
            navigate('/');
        }
    }, [navigate]);

	const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
	const dispatch = useDispatch();

	const beneficiariesDefault = useSelector(state => state.beneficiaries);
	const [newBeneficiary, setNewBeneficiary] = useState(null);
	const [isAdding, setIsAdding] = useState(false);
	const [editBeneficiary, setEditBeneficiary] = useState(null);

	const onSubmit = data => {   
		setIsAdding(true);
		let confirmationText = '';
		if (editBeneficiary) {
			confirmationText = 'Do you want to update this beneficiary?';
		} else {
			confirmationText = 'Do you want to add this beneficiary?';
		}
		
		Swal.fire({
			title: 'Are you sure?',
			text: confirmationText,
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		}).then((result) => {
			if (result.isConfirmed) {
				if (editBeneficiary) {
					dispatch(updateBeneficiary({ id: editBeneficiary.id, data }));
					setEditBeneficiary(null);
					Swal.fire({
						title: 'Success',
						text: 'Beneficiary updated successfully',
						icon: 'success',
						showCancelButton: false,
						confirmButtonText: 'OK',
					});
					
					const rows = document.querySelectorAll('.table_wrap tbody tr');
					rows.forEach((row) => {
						if (row.textContent.includes(data.accountNumber)) {
							row.classList.add('highlight-row');
							setTimeout(() => {
								row.classList.remove('highlight-row');
							}, 2000);
						}
					});
				} else {
					dispatch(addBeneficiary(data));
					setNewBeneficiary(data);
					Swal.fire({
						title: 'Success',
						text: 'Beneficiary added successfully',
						icon: 'success',
						showCancelButton: false,
						confirmButtonText: 'OK',
					});
				}
				reset();
			}
			setIsAdding(false);
		});
	};

	const handleEditBeneficiary = (beneficiary) => {
		setEditBeneficiary(beneficiary);
		Object.entries(beneficiary).forEach(([key, value]) => {
			setValue(key, value);
		});
		setNewBeneficiary(null);
	
		// Highlight the input fields for 2 seconds
		const inputs = document.querySelectorAll('.form_fields_wrap input, .form_fields_wrap select');
		inputs.forEach((input) => {
			input.classList.add('highlight-input');
			setTimeout(() => {
				input.classList.remove('highlight-input');
			}, 2000);
		});
	};

	const handleDeleteBeneficiary = (beneficiaryToDelete) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this beneficiary?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteBeneficiary(beneficiaryToDelete));
                setNewBeneficiary(null); 
                Swal.fire('Deleted!', 'The beneficiary has been deleted.', 'success');
            }
        });
    };

	return (
		<div className='customer_details_wrap add_beneficiaries_wrap'>
			<div className='content_container'>
				<h1>Add New Beneficiary</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='form_fields_wrap'>
					<div className='form_col'>
						<label>Name</label>
						<input type="text" name="beneficiaryName" {...register('beneficiaryName', { required: true })} />
						{errors.beneficiaryName && <span className='error_msg'>Name is required</span>}
					</div>
					<div className='form_col'>
						<label>Account Number</label>
						<input type="text" name="accountNumber" {...register('accountNumber', { required: true })} />
						{errors.accountNumber && <span className='error_msg'>Account Number is required</span>}
					</div>

					<div className='form_col'>
						<label>Bank Name</label>
						<input type="text" name="bankName" {...register('bankName', { required: true })} />
						{errors.bankName && <span className='error_msg'>Bank Name is required</span>}
					</div>

					<div className='form_col'>
						<label>Account Type</label>
						<select name="accountType" {...register('accountType', { required: true })}>
							<option disabled selected value="">Select Account Type</option>
							<option value="savings">Savings</option>
							<option value="current">Current</option>
						</select>
						{errors.accountType && <span className='error_msg'>Account Type is required</span>}
					</div>
					<div className='form_col form_col_submit'>
						<button type="submit" className='submit_btn' disabled={isAdding}>Add Beneficiary</button>
					</div>
				</form>
			</div>

			<div className='table_wrap'>
				<table width="100%" cellPadding={0} cellSpacing={0} border={0}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Account Number</th>
							<th>Bank Name</th>
							<th>Account Type</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{beneficiariesDefault.beneficiaries && beneficiariesDefault.beneficiaries.map((beneficiary, index) => (
							<tr key={index}>
								<td>{beneficiary.beneficiaryName}</td>
								<td>{beneficiary.accountNumber}</td>
								<td>{beneficiary.bankName}</td>
								<td>{beneficiary.accountType}</td>
								<td>
									<div className='action_btns_wrap'>
										<button className='action_btn delete_btn' onClick={() => handleDeleteBeneficiary(beneficiary)}>Delete</button>
										<button className='action_btn edit_btn' onClick={() => handleEditBeneficiary(beneficiary)}>Edit</button>
									</div>
								</td>
							</tr>
						))}
						{newBeneficiary && !beneficiariesDefault.beneficiaries.includes(newBeneficiary) && (
							<tr>
								<td>{newBeneficiary.beneficiaryName}</td>
								<td>{newBeneficiary.accountNumber}</td>
								<td>{newBeneficiary.bankName}</td>
								<td>{newBeneficiary.accountType}</td>
								<td>
									<div className='action_btns_wrap'>
										<button className='action_btn delete_btn' onClick={() => handleDeleteBeneficiary(newBeneficiary)}>Delete</button>
										<button className='action_btn edit_btn' onClick={() => handleEditBeneficiary(newBeneficiary)}>Edit</button>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageBeneficiaries;
