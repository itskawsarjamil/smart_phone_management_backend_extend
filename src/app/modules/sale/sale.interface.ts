import { Types } from 'mongoose';
export type TSale = {
  smartPhone: Types.ObjectId;
  quantitySold: number;
  buyerName: string;
  saleDate: Date;
};
