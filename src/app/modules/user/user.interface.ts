import { Model } from 'mongoose';

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TUser = {
  id: string;
  name: TName;
  userName: string;
  email: string;
  bio: string;
  profileImg?: string;
  lastLogin: Date;
  password: string;
  passwordChangedAt?: Date;
  needPasswordChange: boolean;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
};

export interface UserModel extends Model<TUser> {
  isUserExist(id: string): Promise<TUser | null>;
  isPasswordMatched(
    inputPassword: string,
    storedPassword: string,
  ): Promise<boolean>;
}
