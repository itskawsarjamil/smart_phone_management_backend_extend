import { model, Schema } from 'mongoose';
import { TSale } from './sale.interface';

const saleSchema = new Schema<TSale>({
  smartPhone: {
    type: Schema.Types.ObjectId,
    ref: 'SmartPhone',
    required: true,
  },
  quantitySold: { type: Number, required: true },
  buyerName: { type: String, required: true },
  saleDate: { type: Date, default: Date.now },
});

export const Sale = model<TSale>('Sale', saleSchema);
