import dotenv from 'dotenv';
import users from './data/users.cjs';
import User from './models/userModel.cjs';
import Departments from './models/departmentModel.cjs';
import connectDB from './config/db.cjs';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Departments.deleteMany();

    await User.insertMany(users);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Departments.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
