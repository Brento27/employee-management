import axios from 'axios';
import {
  DEPARTMENT_REGISTER_REQUEST,
  DEPARTMENT_REGISTER_SUCCESS,
  DEPARTMENT_REGISTER_FAIL,
  DEPARTMENT_DETAILS_REQUEST,
  DEPARTMENT_DETAILS_SUCCESS,
  DEPARTMENT_DETAILS_FAIL,
  DEPARTMENT_DETAILS_RESET,
  DEPARTMENT_LIST_REQUEST,
  DEPARTMENT_LIST_SUCCESS,
  DEPARTMENT_LIST_FAIL,
  DEPARTMENT_LIST_FILTER_REQUEST,
  DEPARTMENT_LIST_FILTER_SUCCESS,
  DEPARTMENT_LIST_FILTER_FAIL,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
} from '../constants/departmentConstants';
import { logout } from './userActions';

export const registerDepartment =
  (name, manager, status) => async (dispatch) => {
    try {
      dispatch({
        type: DEPARTMENT_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/departments',
        { name, manager: manager, status },
        config
      );

      dispatch({
        type: DEPARTMENT_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEPARTMENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getDepartmentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/departments/${id}`, config);

    dispatch({
      type: DEPARTMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Request failed with status code 401') {
      dispatch(logout());
    }
    dispatch({
      type: DEPARTMENT_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listDepartments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/departments`, config);

    dispatch({
      type: DEPARTMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Request failed with status code 401') {
      dispatch(logout());
    }
    dispatch({
      type: DEPARTMENT_LIST_FAIL,
      payload: message,
    });
  }
};
export const listDepartmentsfilter =
  (currentPage = 1, pageSize = 10, status = '', search = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DEPARTMENT_LIST_FILTER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/departments/query?currentpage=${currentPage}&pagesize=${pageSize}&status=${status}&search=${search}`,
        config
      );

      dispatch({
        type: DEPARTMENT_LIST_FILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Request failed with status code 401') {
        dispatch(logout());
      }
      dispatch({
        type: DEPARTMENT_LIST_FILTER_FAIL,
        payload: message,
      });
    }
  };

export const updateDepartment = (department) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEPARTMENT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/departments/${department._id}`,
      department,
      config
    );

    dispatch({ type: DEPARTMENT_UPDATE_SUCCESS });

    dispatch({ type: DEPARTMENT_DETAILS_SUCCESS, payload: data });

    dispatch({ type: DEPARTMENT_DETAILS_RESET });

    dispatch(listDepartmentsfilter);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Request failed with status code 401') {
      dispatch(logout());
    }
    dispatch({
      type: DEPARTMENT_UPDATE_FAIL,
      payload: message,
    });
  }
};
