import { model, Schema } from 'mongoose';
import { SmartPhoneModel, TSmartPhone } from './smartPhone.interface';

const smartPhoneSchema = new Schema<TSmartPhone, SmartPhoneModel>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    os: { type: String, required: true },
    storage: { type: String, required: true },
    screenSize: { type: String, required: true },
    cameraQuality: { type: String, required: true },
    batteryLife: { type: Number, required: true },
    releaseDate: { type: Date, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

smartPhoneSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

smartPhoneSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

smartPhoneSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

smartPhoneSchema.statics.isSmartPhoneExist = async (identifier: string) => {
  return await SmartPhone.findOne({ identifier });
};

export const SmartPhone = model<TSmartPhone, SmartPhoneModel>(
  'SmartPhone',
  smartPhoneSchema,
);
