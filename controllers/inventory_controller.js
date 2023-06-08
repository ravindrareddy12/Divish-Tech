const Inventory = require('../models/inventory');

module.exports.inventory = (req, res) => {
  const { productName, mrp, sp, qty } = req.body;
  const inventoryData = {
    inventories: [
      { key: "Product Name", value: productName },
      { key: "MRP", value: mrp },
      { key: "SP", value: sp },
      { key: "QTY", value: qty }
    ]
  };

  const inventory = new Inventory(inventoryData);

  inventory.save((err) => {
    if (err) {
      console.error(err);
      res.redirect('/');
    } else {
      res.redirect('back');
    }
  });
};