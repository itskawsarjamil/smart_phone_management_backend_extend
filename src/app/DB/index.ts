import config from '../config';
import { TUser } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const default_usesr: TUser = {
  id: '0001',
  name: {
    firstName: 'Kawsar',
    lastName: 'Jamil',
  },
  userName: 'itskawsarjamil',
  email: 'Kawsarjamil726@gmail.com',
  bio: 'nothing fancy',

  lastLogin: new Date(),
  password: config.super_admin_password as string,
  passwordChangedAt: new Date(),
  needPasswordChange: false,
  contactNo: '01234567891',
  emergencyContactNo: '01234567891',
  bloodGroup: 'B+',
  presentAddress: 'Dhaka Bangladesh',
  permanentAddress: 'Cumilla Bangladesh',
};

const seed_Admin = async () => {
  const user = await User.findOne();
  if (!user) {
    await User.create(default_usesr);
  }
};

export default seed_Admin;
