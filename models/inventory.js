const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  inventors: [{
    key: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }]
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
