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
  DEPARTMENT_LIST_RESET,
  DEPARTMENT_LIST_FILTER_REQUEST,
  DEPARTMENT_LIST_FILTER_SUCCESS,
  DEPARTMENT_LIST_FILTER_FAIL,
  DEPARTMENT_LIST_FILTER_RESET,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_RESET,
} from '../constants/departmentConstants';

export const departmentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPARTMENT_REGISTER_REQUEST:
      return { loadingDepartment: true };
    case DEPARTMENT_REGISTER_SUCCESS:
      return { loadingDepartment: false, departmentInfo: action.payload };
    case DEPARTMENT_REGISTER_FAIL:
      return { loadingDepartment: false, error: action.payload };
    default:
      return state;
  }
};

export const departmentDetailsReducer = (
  state = { department: {} },
  action
) => {
  switch (action.type) {
    case DEPARTMENT_DETAILS_REQUEST:
      return { ...state, loadingDepartment: true };
    case DEPARTMENT_DETAILS_SUCCESS:
      return { loadingDepartment: false, department: action.payload };
    case DEPARTMENT_DETAILS_FAIL:
      return { loadingDepartment: false, error: action.payload };
    case DEPARTMENT_DETAILS_RESET:
      return { loadingDepartment: {} };
    default:
      return state;
  }
};

export const departmentListReducer = (state = { departments: [] }, action) => {
  switch (action.type) {
    case DEPARTMENT_LIST_REQUEST:
      return { loadingDepartment: true };
    case DEPARTMENT_LIST_SUCCESS:
      return { loadingDepartment: false, departments: action.payload };
    case DEPARTMENT_LIST_FAIL:
      return { loadingDepartment: false, error: action.payload };
    case DEPARTMENT_LIST_RESET:
      return { departments: [] };
    default:
      return state;
  }
};
export const departmentListFilterReducer = (
  state = { departmentsfiltered: [] },
  action
) => {
  switch (action.type) {
    case DEPARTMENT_LIST_FILTER_REQUEST:
      return { loadingDepartment: true };
    case DEPARTMENT_LIST_FILTER_SUCCESS:
      return {
        loadingDepartment: false,
        departmentsfiltered: action.payload.departments,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case DEPARTMENT_LIST_FILTER_FAIL:
      return { loadingDepartment: false, error: action.payload };
    case DEPARTMENT_LIST_FILTER_RESET:
      return { departmentsfiltered: [] };
    default:
      return state;
  }
};

export const departmentUpdateReducer = (state = { department: {} }, action) => {
  switch (action.type) {
    case DEPARTMENT_UPDATE_REQUEST:
      return { loadingDepartment: true };
    case DEPARTMENT_UPDATE_SUCCESS:
      return { loadingDepartment: false, success: true };
    case DEPARTMENT_UPDATE_FAIL:
      return { loadingDepartment: false, error: action.payload };
    case DEPARTMENT_UPDATE_RESET:
      return {
        department: {},
      };
    default:
      return state;
  }
};
