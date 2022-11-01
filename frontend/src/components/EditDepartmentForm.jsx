import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateDepartment } from '../actions/departmentActions';

function EditDepartmentForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [manager, setManager] = useState({});
  const [status, setStatus] = useState('');

  const userList = useSelector((state) => state.userList);
  const { users, loading } = userList;

  const departmentDetails = useSelector((state) => state.departmentDetails);
  const { department, loadingDepartment } = departmentDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const saveHandler = (e) => {
    e.preventDefault();
    const managerName = manager.firstName + ' ' + manager.lastName;
    dispatch(
      updateDepartment({
        name,
        _id: department._id,
        managerName,
        status,
      })
    );
    navigate('/department/list');
  };
  const cancelHandler = () => {
    navigate('/department/list');
  };

  useEffect(() => {
    setName(department.name);
  }, [dispatch, department]);

  return loading || loadingDepartment ? (
    <p className='text-4xl mt-40 ml-40'>Loading...</p>
  ) : (
    <>
      <div>
        <div className='mt-6 flex items-center justify-between'>
          <p className='text-2xl'>*Name</p>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input input-bordered input-accent w-80'
          />
        </div>
        <div className='flex mt-6 items-center justify-between'>
          <p className='text-2xl'>*Manager</p>
          <select
            className='select select-accent w-full max-w-xs justify-self-end'
            onChange={(e) => {
              setManager(JSON.parse(e.target.value));
            }}
          >
            <option>~Select~</option>
            {users?.map((user) => {
              return (
                <option key={user._id} value={JSON.stringify(user)}>
                  {user.firstName + ' ' + user.lastName}
                </option>
              );
            })}
          </select>
        </div>
        {userInfo.isManager && (
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
        )}
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

export default EditDepartmentForm;
