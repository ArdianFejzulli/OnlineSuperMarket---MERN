const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	name: {
		type: String
	},
	productPrice: {
		type: Number
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, "The quantity can't be lower than 0."]
	},
	price: {
		type: String,
		required: true
	}
});

module.exports = itemSchema;