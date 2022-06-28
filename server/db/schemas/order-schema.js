import { Schema } from "mongoose";

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    products: [{
        type: new Schema(
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
            {
                _id: false,
            },
        )
    }],
    total: {
        type: Number,
        required: true,
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
        required: true,
    },
    orderRequest: {
        type: String,
        required: true,
    },
    orderTime: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        default: "상품 준비중",
    },
}, {
    timestamps: true,
    collection: "orders"
});

export { OrderSchema };
