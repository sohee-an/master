import { Schema } from 'mongoose';

const CategorySchema = new Schema({
    largeCategory: {
        type: String,
        required: true
    },
    mediumCategory: {
        type: String,
        required: true
    },
}, {
    collection: 'categories',
    timestamps: true,
});

export { CategorySchema };
