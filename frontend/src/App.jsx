import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditEmployee from './screens/EditEmployee';
import DepartmentList from './screens/DepartmentList';
import EmployeeList from './screens/EmployeeList';
import Login from './screens/Login';
import CreateEmployee from './screens/CreateEmployee';
import CreateDepartment from './screens/CreateDepartment';
import EditDepartment from './screens/EditDepartment';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/employee/list' element={<EmployeeList />} />
          <Route path='/employee/edit/:userId' element={<EditEmployee />} />
          <Route path='/employee/create' element={<CreateEmployee />} />
          <Route path='/department/list' element={<DepartmentList />} />
          <Route
            path='/department/edit/:departmentId'
            element={<EditDepartment />}
          />
          <Route path='/department/create' element={<CreateDepartment />} />
          <Route path='/' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
