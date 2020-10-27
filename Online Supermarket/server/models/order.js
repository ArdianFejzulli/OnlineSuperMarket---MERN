const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const item = require("./item");

const orderSchema = new Schema(
	{
		location: {
			type: {
				type: String,
				enum: ["Point"],
				required: true
			},
			coordinates: {
				type: [Number],
				required: true
			}
		},
		delivered: {
			type: Boolean,
			default: false
		},
		orderTotal: {
			type: Number,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		items: [item]
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);