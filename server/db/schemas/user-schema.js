import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      //required: true,
    },
    password: {
      type: String,
     // required: true,
    },
    phoneNumber: {
      type: String,
     // required: true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
     // required: true,
    },
   
    token:{
      type:String,
    },
   
    role: {
      type: String,
      required: false,
      default: 'basic-user',
    },
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

export { UserSchema };
