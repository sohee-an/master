import { Schema } from 'mongoose';

const ReviwsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },

 
},
  {
    collection: 'reviews',
    timestamps: true,
  }
);

export { ReviwsSchema };
