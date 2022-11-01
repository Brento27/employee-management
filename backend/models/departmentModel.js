import mongoose, { Schema } from 'mongoose';

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    manager: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model('Department', departmentSchema);

export default Department;
