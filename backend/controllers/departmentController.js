import asyncHandler from 'express-async-handler';
import Department from '../models/departmentModel.js';

// @desc    Register a new department
// @route   POST /api/departments
// @access  Public
const registerDepartment = asyncHandler(async (req, res) => {
  const { name, manager, status } = req.body;

  const departmentExists = await Department.findOne({ name });

  if (departmentExists) {
    res.status(400);
    throw new Error('department already exists');
  }

  const department = await Department.create({
    name,
    manager,
    status,
  });

  if (department) {
    res.status(201).json({
      _id: department._id,
      name: department.name,
      mmanager: department.manager,
      status: department.status,
    });
  } else {
    res.status(400);
    throw new Error('Invalid department data');
  }
});

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private/Admin
const getDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.find({});
  res.json(departments);
});

// @desc    Get all departments
// @route   GET /api/departments
// @access  Private/Admin
const getDepartmentsFiltered = asyncHandler(async (req, res) => {
  let pageSize = req.query.pagesize || 10;
  const page = Number(req.query.currentpage) || 1;
  const status = req.query.status;
  const search = req.query.search;

  if (search) {
    const regex = new RegExp(search, 'i');
    const count = await Department.count({
      name: regex,
    });

    const departments = await Department.find({ name: regex })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ departments, page, pages: Math.ceil(count / pageSize) });
  } else {
    if (status) {
      const count = await Department.count({
        status: status,
      });
      const departments = await Department.find({
        status: status,
      })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      res.json({ departments, page, pages: Math.ceil(count / pageSize) });
    } else {
      const count = await Department.count();
      const departments = await Department.find()
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      res.json({ departments, page, pages: Math.ceil(count / pageSize) });
    }
  }
});

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    await Department.remove();
    res.json({ message: 'department removed' });
  } else {
    res.status(404);
    throw new Error('department not found');
  }
});

// @desc    Get department by ID
// @route   GET /api/departments/:id
// @access  Private/Admin
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    res.json(department);
  } else {
    res.status(404);
    throw new Error('department not found');
  }
});

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private/Admin
const updateDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (department) {
    department.name = req.body.name || department.name;
    department.manager = req.body.manager || department.manager;
    department.status = req.body.status || department.status;

    const updatedDepartment = await department.save();

    res.json({
      _id: updatedDepartment._id,
      name: updatedDepartment.name,
      manager: updatedDepartment.manager,
      status: updatedDepartment.status,
    });
  } else {
    res.status(404);
    throw new Error('department not found');
  }
});

export {
  registerDepartment,
  getDepartments,
  deleteDepartment,
  getDepartmentById,
  updateDepartment,
  getDepartmentsFiltered,
};
