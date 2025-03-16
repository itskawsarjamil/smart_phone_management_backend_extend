import httpStatus from 'http-status';
import { AppError } from '../../errors/appError';
import { TSmartPhone } from './smartPhone.interface';
import { SmartPhone } from './smartPhone.model';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createSmartPhoneIntoDB = async (payload: TSmartPhone) => {
  const id =
    payload.name +
    '_' +
    payload.model +
    '_' +
    payload.brand +
    '_' +
    payload.storage;
  payload.id = id;
  const isAlreadyExist = await SmartPhone.isSmartPhoneExist(id);
  if (isAlreadyExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'This phone is already added');
  }
  if (payload.quantity === 0) {
    payload.isDeleted = true;
  }
  const result = SmartPhone.create(payload);
  return result;
};

const updateSmartPhoneFromDB = async (
  smartPhoneID: string,
  payload: Partial<TSmartPhone>,
) => {
  const existedPhone = await SmartPhone.isSmartPhoneExist(smartPhoneID);
  if (!existedPhone) {
    throw new AppError(httpStatus.FORBIDDEN, 'This phone is not exist');
  }
  if (existedPhone.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this phone is not exist');
  }
  const { name, model, brand, storage, quantity, ...remaining } = payload;
  const updatedPayload: Record<string, unknown> = { ...remaining };
  if (name || model || brand || storage) {
    updatedPayload['id'] = name + '_' + model + '_' + brand + '_' + storage;
  }
  updatedPayload['name'] = name;
  updatedPayload['model'] = model;
  updatedPayload['brand'] = brand;
  updatedPayload['storage'] = storage;

  if (quantity) {
    if (quantity <= 0) {
      updatedPayload['quantity'] = 0;
      updatedPayload['isDeleted'] = true;
    } else {
      updatedPayload['quantity'] = quantity;
    }
  }
  const result = await SmartPhone.findOneAndUpdate(
    { _id: smartPhoneID },
    updatedPayload,
    { new: true },
  );
  return result;
};

const deleteSmartPhoneFromDB = async (smartPhoneID: string) => {
  const isExist = await SmartPhone.isSmartPhoneExist(smartPhoneID);
  if (!isExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'This phone is not exist');
  }
  if (isExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'this phone is already deleted');
  }
  const result = SmartPhone.findOneAndUpdate(
    { _id: smartPhoneID },
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  return result;
};

const getAllSmartPhonesFromDB = async (query: Record<string, unknown>) => {
  // console.log(query);
  const smartPhoneQuery = new QueryBuilder(SmartPhone.find(), query)
    .search(['name', 'brand'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await smartPhoneQuery.modelQuery;
  const meta = await smartPhoneQuery.countTotal();
  return { data, meta };
};
const getSingleSmartPhoneFromDB = async (smartPhoneID: string) => {
  const result = await SmartPhone.findOne({ _id: smartPhoneID });
  return result;
};

export const smartPhoneServices = {
  createSmartPhoneIntoDB,
  updateSmartPhoneFromDB,
  deleteSmartPhoneFromDB,
  getAllSmartPhonesFromDB,
  getSingleSmartPhoneFromDB,
};
