import { UploadApiResponse } from 'cloudinary';
import { QueryBuilder } from '../../builder/QueryBuilder';
import config from '../../config';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { userSearchableFields } from './user.const';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUserIntoDB = async (
  file: Express.Multer.File | undefined,
  payload: TUser,
) => {
  const modifiedData: TUser = { ...payload };
  // console.log(modifiedData);

  modifiedData.password =
    payload.password || (config.default_password as string);
  modifiedData.needPasswordChange = payload?.password ? false : true;
  const newUserId = await generateUserId();
  modifiedData.id = newUserId;
  if (file) {
    // console.log(file);
    const imgName = file?.originalname;
    const { secure_url } = (await sendImageToCloudinary(
      file?.path,
      imgName,
    )) as UploadApiResponse;
    modifiedData.profileImg = secure_url;
    // console.log(modifiedData);
  }
  // console.log(modifiedData);
  const result = await User.create(modifiedData);
  return result;
  // return null;
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const allUserQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await allUserQuery.modelQuery;
  const meta = await allUserQuery.countTotal();
  return { result, meta };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id });
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
