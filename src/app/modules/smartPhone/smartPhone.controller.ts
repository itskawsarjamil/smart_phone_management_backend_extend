import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { smartPhoneServices } from './smartPhone.services';

const createSmartPhone = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await smartPhoneServices.createSmartPhoneIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Smart Phone Created Successfully',
    data: result,
  });
});
const getAllSmartPhones = catchAsync(async (req, res) => {
  const query = req.query;
  const modifiedQuery = { ...query };

  if (modifiedQuery?.priceRange) {
    const modifiedPriceRange: string[] = modifiedQuery.priceRange as string[];
    modifiedQuery.price = {
      $gte: modifiedPriceRange[0],
      $lte: modifiedPriceRange[1],
    };
  }
  // console.log(modifiedQuery);

  const result =
    await smartPhoneServices.getAllSmartPhonesFromDB(modifiedQuery);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Getting All SmartPhone Successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleSmartPhone = catchAsync(async (req, res) => {
  const smartPhoneID = req.params.smartPhoneID;
  const result =
    await smartPhoneServices.getSingleSmartPhoneFromDB(smartPhoneID);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single SmartPhone Getting Successfull',
    data: result,
  });
});
const updateSmartPhone = catchAsync(async (req, res) => {
  const smartPhoneID = req.params.smartPhoneID;
  const payload = req.body;
  const result = await smartPhoneServices.updateSmartPhoneFromDB(
    smartPhoneID,
    payload,
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Smart Phone Updated Successfully',
    data: result,
  });
});
const deleteSmartPhone = catchAsync(async (req, res) => {
  const smartPhoneID = req.params.smartPhoneID;

  const result = await smartPhoneServices.deleteSmartPhoneFromDB(smartPhoneID);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Smart Phone deleted Successfully',
    data: result,
  });
});

const bulkDeleteSmartPhone = catchAsync(async (req, res) => {
  const result = await smartPhoneServices.bulkDeleteSmartPhoneFromDb(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Multiple phone deleted',
    data: result,
  });
});

export const smartPhoneController = {
  createSmartPhone,
  updateSmartPhone,
  deleteSmartPhone,
  bulkDeleteSmartPhone,
  getAllSmartPhones,
  getSingleSmartPhone,
};
