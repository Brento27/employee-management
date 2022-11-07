import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerDepartment } from '../actions/departmentActions';
import { updateUser } from '../actions/userActions';
import { BiSave } from 'react-icons/bi';
import { TiCancel } from 'react-icons/ti';
import { useEffect } from 'react';

function CreateDepartmentForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    manager: { _id: 'select' },
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const departmentRegister = useSelector((state) => state.departmentRegister);
  const { departmentInfo } = departmentRegister;

  const saveHandler = (e) => {
    setFormErrors(validate(formValues));
    setSubmitted(true);
    e.preventDefault();
  };

  const save = () => {
    dispatch(registerDepartment(formValues.name, formValues.manager));
    dispatch(
      updateUser({
        _id: formValues.manager._id,
        isManager: true,
        department: departmentInfo,
      })
    );
    navigate('/department/list');
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
      errors.name = 'Name may not be more than 15 characters!';
    }
    if (!values.manager) {
      errors.manager = 'Manager is required!';
    } else if (values.manager._id === 'select') {
      errors.manager = 'Please choose a valid manager!';
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submitted) {
      save();
    } else {
      setSubmitted(false);
    }
  }, [formErrors]);

  return (
    <>
      <div className='ml-8'>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Name</p>
          <div>
            <input
              type='text'
              value={formValues.name}
              name='name'
              onChange={handleChange}
              className='input input-bordered input-primary w-80'
            />
            <p className='mt-4 text-error'>{formErrors.name}</p>
          </div>
        </div>
        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Manager</p>
          <div>
            <select
              className='select select-primary w-80 max-w-xs justify-self-end'
              defaultValue='select'
              name='manager'
              onChange={handleChange}
            >
              <option value={JSON.stringify({ _id: 'select' })}>
                ~Select~
              </option>
              {users?.map((user) => {
                return (
                  <option key={user._id} value={JSON.stringify(user)}>
                    {user.firstName + ' ' + user.lastName}
                  </option>
                );
              })}
            </select>
            <p className='mt-4 text-error'>{formErrors.manager}</p>
          </div>
        </div>
      </div>
      <div className='flex justify-end my-4 gap-4'>
        <button className={`btn btn-success gap-2`} onClick={saveHandler}>
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

export default CreateDepartmentForm;
