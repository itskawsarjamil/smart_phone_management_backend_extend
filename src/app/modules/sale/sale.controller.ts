import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { saleServices } from './sale.services';

const createSale = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await saleServices.createSaleIntoDB(payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Smart Phone Created Successfully',
    data: result,
  });
});
const getAllSales = catchAsync(async (req, res) => {
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

  const result = await saleServices.getAllSalesFromDB(modifiedQuery);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Getting All Sale Successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleSale = catchAsync(async (req, res) => {
  const saleID = req.params.saleID;
  const result = await saleServices.getSingleSaleFromDB(saleID);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Sale Getting Successfull',
    data: result,
  });
});

export const saleController = {
  createSale,
  getAllSales,
  getSingleSale,
};
