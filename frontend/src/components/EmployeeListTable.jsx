import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser } from '../actions/userActions';
import { FaEdit } from 'react-icons/fa';
import Loader from './Loader';
import NoData from './NoData';

function EmployeeListTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userFilterList = useSelector((state) => state.userFilterList);
  const { usersFiltered, loading } = userFilterList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loadingUserUpdate } = userUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  const userRegister = useSelector((state) => state.userRegister);
  const { loadingRegister } = userRegister;

  useEffect(() => {
    if (userInfo && userInfo.isManager) {
    } else {
      navigate('/login');
    }
  }, [userInfo, usersFiltered, loading, user, navigate]);

  const submitHandler = async (e) => {
    const user = usersFiltered.filter((user) => user._id == e.target.value)[0];
    if (user.status === 'active') {
      await dispatch(
        updateUser({
          _id: user._id,
          status: 'deactive',
        })
      );
    } else {
      await dispatch(
        updateUser({
          _id: user._id,
          status: 'active',
        })
      );
    }

    e.preventDefault();
  };

  return loading || loadingRegister || loadingUserUpdate ? (
    <Loader />
  ) : usersFiltered[0] ? (
    <div className='border-2 rounded-2xl border-primary p-1 mb-6 bg-white'>
      <table className='table w-full'>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Telephone Number</th>
            <th>Email Address</th>
            <th>Manager</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usersFiltered?.map((user) => {
            return (
              <tr key={user._id}>
                <td>
                  <div className='flex gap-2 items-center justify-center'>
                    <Link to={`/employee/edit/${user._id}`}>
                      <button className='btn btn-primary btn-outline'>
                        <FaEdit />
                      </button>
                    </Link>
                  </div>
                </td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.telephoneNumber}</td>
                <td>{user.email}</td>

                {user.isManager !== true ? (
                  <td>
                    {user.department.manager.firstName +
                      ' ' +
                      user.department.manager.lastName}
                  </td>
                ) : (
                  <td></td>
                )}

                <td>
                  <button
                    className={`btn ${
                      user.status === 'active' ? 'btn-success' : 'btn-error'
                    } rounded-full`}
                    value={user._id}
                    type='submit'
                    onClick={(e) => submitHandler(e)}
                  >
                    {user.status}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <NoData />
  );
}

export default EmployeeListTable;
