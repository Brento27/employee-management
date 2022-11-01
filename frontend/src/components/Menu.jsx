import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Menu() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();

  const addEmployeeHandler = () => {
    navigate('/employee/create');
  };

  const addDepartmentHandler = () => {
    navigate('/department/create');
  };
  return (
    <div className='border-2 border-fuchsia-700 w-1/6 h-96'>
      <p className='text-center'>Menu</p>

      {userInfo.isManager && (
        <>
          <div className='flex justify-around my-4'>
            <button
              className='btn btn-outline btn-accent p-1 w-4/5'
              onClick={addEmployeeHandler}
            >
              Add-Employee
            </button>
          </div>
          <div className='flex justify-around my-4'>
            <button
              className='btn btn-outline btn-accent p-1 w-4/5'
              onClick={addDepartmentHandler}
            >
              Add-Department
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;
