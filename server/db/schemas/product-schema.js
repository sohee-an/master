import { Schema } from 'mongoose';

const ProductSchema = new Schema({
    title: {
        type: String,
        //required: true
    },
    price: {
        type: Number,
        //required: true
    },
    priceConsulation:{
        type:String,
        defaulte:"가격 협의 가능"
    },
    category: {
        type: String,
        //required: true
    },
    userId: {
        type: String,
        ref: 'users',
        //required: true
    },
    nickName: {
        type: String,
       
        //required: true
    },
    image: {
        type: String,
        //required: true
    },
    like: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        
    },
    chatTotal: {
        type: String,
        default: 0
    }
}, {
    collection: 'products',
    timestamps: true,
});

export { ProductSchema };
