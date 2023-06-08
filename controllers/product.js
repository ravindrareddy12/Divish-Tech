const Product = require('../models/product')
const passport = require('passport')


module.exports.product =  (req, res) => {
    const { key, value } = req.body;
    const products = [];
  
    for (let i = 0; i < key.length; i++) {
      const product = { key: key[i], value: value[i] };
      products.push(product);
    }
  
    const productData = { products };
    const product = new Product(productData);
  
    product.save((err) => {
      if (err) {
        console.error(err);
        res.redirect('/');
      } else {
        res.redirect('back');
      }
    });
  };
  