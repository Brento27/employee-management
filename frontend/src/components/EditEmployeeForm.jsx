import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  updateUserProfile,
  getUserDetails,
} from '../actions/userActions';

function EditEmployeeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const { userId } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState({});

  const saveHandler = (e) => {
    try {
      e.preventDefault();
      if (userInfo.isManager) {
        dispatch(
          updateUser({
            _id: userId,
            firstName,
            lastName,
            telephoneNumber,
            email,
            status,
            department,
          })
        );

        navigate('/employee/list');
      } else if (userInfo._id === userId) {
        dispatch(
          updateUserProfile({
            _id: userId,
            firstName,
            lastName,
            telephoneNumber,
            email,
            status,
            department,
          })
        );
      }
    } catch (error) {
      console.error();
    }
  };

  const cancelHandler = () => {
    navigate('/employee/list');
  };

  const checkUserDetails = () => {
    if (userInfo.isManager) {
      dispatch(getUserDetails(userId));
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setTelephoneNumber(user.telephoneNumber);
      setEmail(user.email);
      setStatus(user.status);
      setDepartment(user.department);
    } else {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setTelephoneNumber(userInfo.telephoneNumber);
      setEmail(userInfo.email);
      setStatus(userInfo.status);
      setDepartment(userInfo.department);
    }
  };

  useEffect(() => {
    checkUserDetails();
  }, [dispatch, user._id]);
  return loading ? (
    'Loading...'
  ) : (
    <>
      <div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Name</p>
          <input
            type='text'
            value={firstName}
            defaultValue={firstName}
            placeholder={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='input input-bordered input-accent w-80'
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Surname</p>
          <input
            type='text'
            value={lastName}
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='input input-bordered input-accent w-80'
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Telephone Number</p>
          <input
            type='text'
            placeholder={telephoneNumber}
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(e.target.value)}
            className='input input-bordered input-accent w-80'
          />
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Email Address</p>
          <input
            type='text'
            placeholder={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input input-bordered input-accent w-80'
          />
        </div>
        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Department</p>
          <select
            className='select select-accent w-80'
            defaultValue={department}
            onChange={(e) => {
              setDepartment(JSON.parse(e.target.value));
            }}
          >
            {departments?.map((department) => {
              return (
                <option key={department._id} value={JSON.stringify(department)}>
                  {department.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Status</p>
          <select
            className='select select-accent w-80'
            value={status}
            defaultValue={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>active</option>
            <option>deactive</option>
          </select>
        </div>
      </div>
      <div className='flex justify-end my-4 gap-4'>
        <button className='btn btn-accent' onClick={saveHandler}>
          Save
        </button>
        <button className='btn btn-accent' onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </>
  );
}

export default EditEmployeeForm;
