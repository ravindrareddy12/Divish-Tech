const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  products: [{
    key: {
      type: String,
      
    },
    value: {
      type: String,
      
    }
  }]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
