import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUser,
  updateUserProfile,
  getUserDetails,
} from '../actions/userActions';
import Loader from './Loader';
import { BiSave } from 'react-icons/bi';
import { TiCancel } from 'react-icons/ti';

function EditEmployeeForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    email: '',
    department: 'select',
    status: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { userId } = useParams();

  const departmentList = useSelector((state) => state.departmentList);
  const { departments } = departmentList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading } = userDetails;

  const saveHandler = (e) => {
    setFormErrors(validate(formValues));
    setSubmitted(true);
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'department') {
      setFormValues({ ...formValues, [name]: JSON.parse(value) });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    e.preventDefault();
  };

  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!values.firstName) {
      errors.firstName = 'Firstname is required!';
    } else if (values.firstName.length < 3) {
      errors.firstName = 'Firstname must be atleast 3 characters long!';
    } else if (values.firstName.length > 15) {
      errors.firstName = 'Firstname may not be more than 15 characters!';
    }
    if (!values.lastName) {
      errors.lastName = 'Surname is required!';
    } else if (values.lastName.length < 3) {
      errors.lastName = 'Surname must be atleast 3 characters long!';
    } else if (values.lastName.length > 15) {
      errors.lastName = 'Surname may not be more than 15 characters!';
    }
    if (!values.telephoneNumber) {
      errors.telephoneNumber = 'Telephone number is required!';
    } else if (!regexPhone.test(values.telephoneNumber)) {
      errors.telephoneNumber = 'This is not a valid telephone number format';
    }
    if (!values.email) {
      errors.email = 'Email is required!';
    } else if (!regexEmail.test(values.email)) {
      errors.email = 'This is not a valid email format';
    }
    if (!values.department) {
    } else if (values.department === 'select') {
      errors.department = 'Please choose a valid department!';
    }
    if (!values.status) {
      errors.status = 'Status is required!';
    } else if (values.status === 'select') {
      errors.status = 'Please choose a valid status!';
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submitted) {
      try {
        if (userInfo.isManager) {
          dispatch(
            updateUser({
              _id: userId,
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              telephoneNumber: formValues.telephoneNumber,
              email: formValues.email,
              status: formValues.status,
              department: formValues.department,
            })
          );

          navigate('/employee/list');
        } else if (userInfo._id === userId) {
          dispatch(
            updateUserProfile({
              _id: userId,
              firstName: formValues.firstName,
              lastName: formValues.lastName,
              telephoneNumber: formValues.telephoneNumber,
              email: formValues.email,
              status: formValues.status,
              department: formValues.department,
            })
          );
        }
      } catch (error) {
        console.error();
      }
    } else {
      checkUserDetails();
      setSubmitted(false);
    }
  }, [dispatch, user._id, formErrors]);

  const checkUserDetails = () => {
    if (userInfo.isManager) {
      dispatch(getUserDetails(userId));
      setFormValues({
        firstName: user.firstName,
        lastName: user.lastName,
        telephoneNumber: user.telephoneNumber,
        email: user.email,
        department: user.department,
        status: user.status,
      });
    } else {
      setFormValues({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        telephoneNumber: userInfo.telephoneNumber,
        email: userInfo.email,
        department: userInfo.department,
        status: userInfo.status,
      });
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <div className='ml-8'>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Name</p>
          <div>
            <input
              type='text'
              defaultValue={formValues.firstName}
              onChange={handleChange}
              name='firstName'
              className='input input-bordered input-primary w-80'
            />
            <p className='mt-4 text-error'>{formErrors.firstName}</p>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Surname</p>
          <div>
            <input
              type='text'
              defaultValue={formValues.lastName}
              onChange={handleChange}
              name='lastName'
              className='input input-bordered input-primary w-80'
            />
            <p className='mt-4 text-error'>{formErrors.lastName}</p>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Telephone Number</p>
          <div>
            <input
              type='text'
              defaultValue={formValues.telephoneNumber}
              onChange={handleChange}
              name='telephoneNumber'
              className='input input-bordered input-primary w-80'
            />
            <p className='mt-4 text-error'>{formErrors.telephoneNumber}</p>
          </div>
        </div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Email Address</p>
          <div>
            <input
              type='text'
              value={formValues.email}
              onChange={handleChange}
              name='email'
              className='input input-bordered input-primary w-80'
            />
            <p className='mt-4 text-error'>{formErrors.email}</p>
          </div>
        </div>
        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Department</p>
          <div>
            <select
              className='select select-primary w-80'
              defaultValue={formValues.department}
              onChange={handleChange}
              name='department'
            >
              {departments
                ? departments.map((department) => {
                    return (
                      <option
                        key={department._id}
                        value={JSON.stringify(department)}
                      >
                        {department.name}
                      </option>
                    );
                  })
                : ''}
            </select>
            <p className='mt-4 text-error'>{formErrors.department}</p>
          </div>
        </div>

        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Status</p>
          <div>
            <select
              className='select select-primary w-80'
              defaultValue={formValues.status}
              onChange={handleChange}
              name='status'
            >
              <option>active</option>
              <option>deactive</option>
            </select>
            <p className='mt-4 text-error'>{formErrors.status}</p>
          </div>
        </div>
      </div>
      <div className='flex justify-end my-4 gap-4'>
        <button className='btn btn-success gap-2' onClick={saveHandler}>
          <BiSave size={25} /> Save
        </button>
        <Link to='/employee/list'>
          <button className='btn btn-error gap-2'>
            <TiCancel size={25} /> Cancel
          </button>
        </Link>
      </div>
    </>
  );
}

export default EditEmployeeForm;
