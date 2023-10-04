import mongoose, { Schema, Document } from 'mongoose';

interface ICard extends Document {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token: string;
}

const CardSchema: Schema = new Schema({
  card_number: { type: String, required: true },
  cvv: { type: String, required: true },
  expiration_month: { type: String, required: true },
  expiration_year: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String, required: true },
});

const CardModel = mongoose.model<ICard>('Card', CardSchema);

export default CardModel;
