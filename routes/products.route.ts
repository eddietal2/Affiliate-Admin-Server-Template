const express  = require("express");
const router  = express.Router();
var productsController = require('../controllers/products-controller.ts')

// Get Products
router.get('/get-all-products', productsController.getAllProducts);

// Featured Products
router.get('/get-featured-products', productsController.getFeaturedProducts);
router.post('/feature-product', productsController.featureProduct);
router.post('/unfeature-product', productsController.unfeatureProduct);

// Add & Modify A Product
router.post('/add-product', productsController.addProduct);
router.post('/edit-product', productsController.editProduct);
router.post('/delete-product', productsController.deleteProduct);

export {};

module.exports = router;