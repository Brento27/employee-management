import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import { BiSave } from 'react-icons/bi';
import { TiCancel } from 'react-icons/ti';

function CreateEmployeeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState({});

  const [password, setPassword] = useState('Password123#');

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const saveHandler = (e) => {
    e.preventDefault();
    dispatch(
      register(
        firstName,
        lastName,
        telephoneNumber,
        email,
        department,
        password
      )
    );
    navigate('/employee/list');
  };
  const cancelHandler = () => {
    navigate('/employee/list');
  };

  return (
    <>
      <div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Name</p>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='input input-bordered input-primary w-80'
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Surname</p>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='input input-bordered input-primary w-80'
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Telephone Number</p>
          <input
            type='text'
            placeholder='eg. 0821111111'
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(e.target.value)}
            className='input input-bordered input-primary w-80'
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Email Address</p>
          <input
            type='text'
            placeholder='eg. test@test.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input input-bordered input-primary w-80'
          />
        </div>
        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Department</p>
          <select
            className='select select-primary w-80'
            onChange={(e) => {
              setDepartment(JSON.parse(e.target.value));
            }}
          >
            <option value=''>All</option>
            {departments?.map((department) => {
              return (
                <option key={department._id} value={JSON.stringify(department)}>
                  {department.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className='flex justify-end my-4 gap-4'>
        <button className='btn btn-success gap-2' onClick={saveHandler}>
          <BiSave size={25} /> Save
        </button>
        <button className='btn btn-error gap-2' onClick={cancelHandler}>
          <TiCancel size={25} /> Cancel
        </button>
      </div>
    </>
  );
}

export default CreateEmployeeForm;
