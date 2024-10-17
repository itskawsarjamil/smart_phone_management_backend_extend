import { Schema, model } from 'mongoose';
import { TName, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const nameSchema = new Schema<TName>(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    middleName: String,
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
  },
  { _id: false },
);

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
    },
    name: { type: nameSchema, required: [true, 'Name is required'] },
    userName: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      minlength: [3, 'Username must be at least 3 characters long'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    bio: {
      type: String,
      maxlength: [250, 'Bio cannot exceed 250 characters'],
      default: '',
    },
    profileImg: {
      type: String, // URL of the profile image
      default: '',
    },
    lastLogin: {
      type: Date,
      default: new Date(),
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
      default: new Date(),
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
      match: [
        /^0\d{10}$/,
        'Please provide a valid contact number (e.g., 01234567890)',
      ],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
      match: [
        /^0\d{10}$/,
        'Please provide a valid emergency contact number (e.g., 01234567890)',
      ],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'blood Group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
      minlength: [5, 'Present address must be at least 5 characters long'],
      maxlength: [100, 'Present address cannot exceed 100 characters'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
      minlength: [5, 'Permanent address must be at least 5 characters long'],
      maxlength: [100, 'Permanent address cannot exceed 100 characters'],
    },
    role: { type: String, enum: ['superAdmin', 'user'], default: 'user' },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);
userSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name?.middleName + ' ' + this.name.lastName
  );
});

userSchema.pre('save', async function (next) {
  const pass = this.password;
  this.password = await bcrypt.hash(pass, Number(config.bcrypt_salt_rounds));
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
userSchema.statics.isUserExist = async function (id: string) {
  return await User.findOne({ id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  inputPassword,
  storedPassword,
) {
  return await bcrypt.compare(inputPassword, storedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  iat: number,
  lastPassChangedTime: Date,
) {
  const passwordChangedTime = new Date(lastPassChangedTime).getTime() / 1000;
  return passwordChangedTime > iat;
  // if();
};

export const User = model<TUser, UserModel>('User', userSchema);
