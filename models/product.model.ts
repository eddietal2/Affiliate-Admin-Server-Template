const mongoose = require('mongoose');
export {};

const ProductSchema = new mongoose.Schema(
  {
    apiID: {
      type: String,
      maxlength: 15,
      default: 'None'
    },
    title: {
      type: String,
      maxlength: 140,
      default: 'None'
    },
    featured: {
      type: Boolean,
      default: false
    },
    datePosted: {
        type: Number
    },
    description: {
      type: String,
      maxlength: 300,
      default: 'None'
    },
    category: {
      type: String,
      maxlength: 100
    },
    rating: {
      type: Number,
      maxlength: 1,
      default: 0
    },
    duration: {
      type: Number,
      maxlength: 500,
      default: 0
    },
    price: {
      type: String,
      maxlength: 10
    },
    sample: {
      type: String,
      maxlength: 700,
      default: 'None'
    },
    reviews: {
      type: Array,
      default: []
    },


})


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
