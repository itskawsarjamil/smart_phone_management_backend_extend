import { Model } from 'mongoose';

export type TSmartPhone = {
  id: string;
  name: string;
  model: string;
  brand: string;
  os: string;
  storage: string;
  screenSize: string;
  cameraQuality: string;
  batteryLife: number;
  releaseDate: Date;
  price: number;
  quantity: number;
  isDeleted: boolean;
};

export interface SmartPhoneModel extends Model<TSmartPhone> {
  isSmartPhoneExist(identifier: string): Promise<TSmartPhone | null>;
}
