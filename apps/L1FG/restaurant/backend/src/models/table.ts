import { model, models, Schema } from 'mongoose';
 
const tableSchema = new Schema({
  name: { type: String, required: true },
  qrCodeUrl: { type: String, required: true },
});
 
export const Table = models['Table'] || model('Table', tableSchema);