import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'HrAdmin',
    lastName: 'HrAdmin',
    telephoneNumber: '0670375514',
    email: 'hradmin@test.com',
    status: 'active',
    password: bcrypt.hashSync('TestPass1234', 10),
    department: {},
    isManager: true,
  },
];

export default users;
