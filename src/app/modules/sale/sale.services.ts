/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { SmartPhone } from '../smartPhone/smartPhone.model';
import { TSale } from './sale.interface';
import { Sale } from './sale.model';
import { AppError } from '../../errors/appError';
import mongoose from 'mongoose';

const createSaleIntoDB = async (payload: TSale) => {
  const isSmartPhoneExist = await SmartPhone.findById(payload.smartPhone);
  if (!isSmartPhoneExist) {
    throw new AppError(httpStatus.FORBIDDEN, 'This phone is not exist');
  }
  const remainingQuantity = isSmartPhoneExist.quantity;
  const afterSalesQuantityWouldBe = remainingQuantity - payload.quantitySold;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (afterSalesQuantityWouldBe < 0) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "We don't have much this quantity in inventory",
      );
    }
    if (afterSalesQuantityWouldBe === 0) {
      const smartPhoneUpdateRessult = await SmartPhone.findByIdAndUpdate(
        isSmartPhoneExist._id,
        {
          isDeleted: true,
          quantity: 0,
        },
        { new: true, session },
      );
      if (!smartPhoneUpdateRessult) {
        throw new AppError(
          httpStatus.EXPECTATION_FAILED,
          'quantity changing failed',
        );
      }
    } else if (afterSalesQuantityWouldBe) {
      const smartPhoneUpdateRessult = await SmartPhone.findByIdAndUpdate(
        isSmartPhoneExist._id,
        {
          quantity: afterSalesQuantityWouldBe,
        },
        { new: true, session },
      );
      if (!smartPhoneUpdateRessult) {
        throw new AppError(
          httpStatus.EXPECTATION_FAILED,
          'quantity changing failed',
        );
      }
    }
    const createSaleHistory = await Sale.create([payload], { session });
    if (!createSaleHistory) {
      throw new AppError(httpStatus.CONFLICT, 'failed to create saleHistory');
    }
    await session.commitTransaction();
    await session.endSession();
    return createSaleHistory;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getAllSalesFromDB = async (query: Record<string, unknown>) => {
  const saleQuery = new QueryBuilder(Sale.find().populate('smartPhone'), query)
    .search(['buyerName'])
    .filter()
    .sort()
    .paginate()
    .fields();
  const data = await saleQuery.modelQuery;
  const meta = await saleQuery.countTotal();
  return { data, meta };
};
const getSingleSaleFromDB = async (saleID: string) => {
  const result = await Sale.findOne({ _id: saleID });
  return result;
};

export const saleServices = {
  createSaleIntoDB,
  getAllSalesFromDB,
  getSingleSaleFromDB,
};
