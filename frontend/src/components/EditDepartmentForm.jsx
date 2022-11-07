import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDepartment } from '../actions/departmentActions';
import { BiSave } from 'react-icons/bi';
import { TiCancel } from 'react-icons/ti';
import Loader from './Loader';

function EditDepartmentForm() {
  const initialValues = {
    name: '',
    status: '',
    manager: {},
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { users, loading } = userList;

  const departmentDetails = useSelector((state) => state.departmentDetails);
  const { department, loadingDepartment } = departmentDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const saveHandler = (e) => {
    setFormErrors(validate(formValues));
    setSubmitted(true);
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'manager') {
      setFormValues({ ...formValues, [name]: JSON.parse(value) });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
    e.preventDefault();
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Name is required!';
    } else if (values.name.length < 3) {
      errors.name = 'Name must be atleast 3 characters long!';
    } else if (values.name.length > 15) {
      errors.name = 'Name may not be more than 15 characters';
    }
    if (!values.manager) {
      errors.manager = 'Manager is required!';
    } else if (values.manager._id === 'select') {
      errors.manager = 'Please choose a valid manager!';
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
      dispatch(
        updateDepartment({
          name: formValues.name,
          _id: department._id,
          manager: formValues.manager,
          status: formValues.status,
        })
      );
      navigate('/department/list');
    } else {
      if (department._id) {
        setFormValues({
          ...formValues,
          name: department.name,
          manager: department.manager,
          status: department.status,
        });
        setSubmitted(false);
      }
    }
  }, [dispatch, department, formErrors]);

  return loading || loadingDepartment ? (
    <Loader />
  ) : (
    <>
      <div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Name</p>
          <div>
            <input
              type='text'
              name='name'
              value={formValues.name}
              onChange={handleChange}
              className='input input-bordered input-primary
             w-80'
            />
            <p className='mt-4 text-error'>{formErrors.name}</p>
          </div>
        </div>
        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Manager</p>
          <div>
            <select
              className='select select-primary
             w-80 max-w-xs justify-self-end'
              onChange={handleChange}
              name='manager'
              defaultValue={formValues.manager}
            >
              <option value={JSON.stringify(department.manager)}>
                {department.manager ? department.manager.firstName : ''}{' '}
                {department.manager ? department.manager.lastName : ''}
              </option>
              {users[0] ? (
                users
                  .filter((user) => user._id != department.manager._id)
                  .map((user) => {
                    return (
                      <option key={user._id} value={JSON.stringify(user)}>
                        {user.firstName + ' ' + user.lastName}
                      </option>
                    );
                  })
              ) : (
                <Loader />
              )}
            </select>
            <p className='mt-4 text-error'>{formErrors.manager}</p>
          </div>
        </div>
        {userInfo.isManager && (
          <div className='flex mt-6 items-center justify-between'>
            <p className='text-2xl'>*Status</p>
            <div>
              <select
                className='select select-primary
               w-80'
                name='status'
                value={formValues.status}
                onChange={handleChange}
              >
                <option value='active'>Active</option>
                <option value='deactive'>Deactive</option>
              </select>
              <p className='mt-4 text-error'>{formErrors.status}</p>
            </div>
          </div>
        )}
      </div>
      <div className='flex justify-end my-4 gap-4'>
        <button className='btn btn-success gap-2' onClick={saveHandler}>
          <BiSave size={25} /> Save
        </button>
        <Link to='/department/list'>
          <button className='btn btn-error gap-2'>
            <TiCancel size={25} /> Cancel
          </button>
        </Link>
      </div>
    </>
  );
}

export default EditDepartmentForm;
