const Dashboard = require('../models/dashboard');
const User = require('../models/user')
const Product = require('../models/product')


module.exports.userDashboard = async (req, res) => {
  try {
    const productName = req.query.productName;

    // Find the products with the provided name in the database
    const products = await Product.find({ 'products.key': productName });

    // Prepare the matched product data for rendering
    const matchedProducts = products.reduce((acc, product) => {
      const userProducts = product.products.filter(item => item.key === productName);
      return acc.concat(userProducts);
    }, []);

    return res.render('dashboard', {
      title: 'User Dashboard',
     products: matchedProducts || []
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// module.exports.userDashboard = async (req, res) => {
  

//   return res.render('dashboard', {
//     title: 'User Dashboard',
//   });
// } 

module.exports.saveStoreInfo = async (req, res) => {
  try {
    const { address, gst, logo, storeTimings } = req.body;
    const userId = req.user._id; // Assuming you have the authenticated user object available in req.user

    // Create a new dashboard document
    const dashboardData = new Dashboard({
      address,
      gst,
      logo,
      storeTimings,
      userId,
      
    });

    // Save the dashboard data
    await dashboardData.save();

    return res.redirect('back'); // Redirect to the dashboard page
  } catch (error) {
    console.error('Error saving store info:', error);
    return res.redirect('/'); // Redirect to an error page or homepage
  }
};



