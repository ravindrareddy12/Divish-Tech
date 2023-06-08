const express = require('express');
const router = express.Router();
const passport = require('passport');
const dashboardController = require('../controllers/dashboard_controller');
const product = require('../controllers/product')
const signinurl = require('../controllers/signinurl')
const upload = require('../controllers/images')
const inventoryController = require('../controllers/inventory_controller')

// Routes without authentication middleware
router.get('/dashboard', passport.checkAuthentication,dashboardController.userDashboard);
router.post('/storeinfo',passport.checkAuthentication,dashboardController.saveStoreInfo)
router.post('/addproduct',product.product)
router.get('/signinurl',passport.checkAuthentication,signinurl.signinurl)

router.post('/upload-image',upload.upload)



router.post('/addinventory',inventoryController.inventory)

// router.post('/addStoreInfo',passport.checkAuthentication, dashboardController.addStoreInfo);
// router.post('/addCategory', passport.checkAuthentication,dashboardController.addCategory);
// router.post('/addSubcategory', passport.checkAuthentication,dashboardController.addSubcategory);
// router.post('/addInventory', passport.checkAuthentication,dashboardController.addInventory);

module.exports = router;
