const express  = require("express");
const router  = express.Router();
var productsController = require('../controllers/products-controller.ts')

router.get('/get-all-products', productsController.getAllProducts);
router.get('/get-featured-products', productsController.getFeaturedProducts);
router.get('/add-product', productsController.addProduct);
router.get('/edit-product', productsController.editProduct);
router.get('/delete-product', productsController.deleteProduct);

export {};

module.exports = router;