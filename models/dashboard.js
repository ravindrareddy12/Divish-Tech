const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
  name: { type: String },
});

const categorySchema = new mongoose.Schema({
  name: { type: String },
  subcategories: [subcategorySchema],
}); 

const dashboardSchema = new mongoose.Schema({
  address: { type: String },
  gst: { type: String },
  logo: [{ type: String }],
  storeTimings: { type: String },
  categories: [categorySchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
  userName: { type: String }, // Add the `userName` field
});

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

module.exports = Dashboard;
