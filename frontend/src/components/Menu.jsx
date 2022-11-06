import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { HiBuildingStorefront } from 'react-icons/hi2';

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
    <div className='border-2 rounded-xl border-primary w-fit bg-white h-fit p-4'>
      <p className='text-center'>Menu</p>

      {userInfo.isManager && (
        <>
          <div className='flex justify-around my-4'>
            <button
              className='btn btn-outline p-2  h-fit'
              onClick={addEmployeeHandler}
            >
              <AiOutlineUserAdd size={40} />
            </button>
          </div>
          <div className='flex justify-around mt-4'>
            <button
              className='btn btn-outline p-2 h-fit'
              onClick={addDepartmentHandler}
            >
              <HiBuildingStorefront size={40} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;
