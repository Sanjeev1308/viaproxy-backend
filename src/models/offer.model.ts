import { model, Schema } from 'mongoose';

const OfferSchema = new Schema(
  {
    offerTitle: { type: String, required: true },
    proposedItem: {
      type: String,
      required: true,
      enum: ['service', 'product', 'buy'],
    },
    concernedProductService: { type: String }, // This is only applicable for services
    description: { type: String, required: true },
    offerImage: { type: String, required: true }, // URL to the offer image
    offerStartDate: { type: Date, required: true },
    offerEndDate: { type: Date, required: true },
    exchangeType: {
      type: String,
      required: true,
      enum: ['exchange', 'sale', 'donate'],
    },
    paymentType: {
      type: String,
      required: true,
      enum: ['lump sum', 'per day', 'per hour'],
    },
    estimatedPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: [
        'delivered',
        'hand to hand',
        'paid on collection',
        'delivered after payment',
      ],
    },
    geographicArea: { type: String, required: true },
    city: { type: String, required: true },
    campus: { type: String },
    specialConditionsFile: { type: String }, // File URL for special conditions
    deliveryTermsDescription: { type: String, required: true },
    termsAndConditions: { type: String }, // This is for products only
  },
  { timestamps: true }
);

export default model('Offer', OfferSchema);
