const express  = require("express");
const router  = express.Router();
var productsController = require('../controllers/products-controller.ts')

router.get('/get-all-products', productsController.getAllProducts);
router.get('/get-featured-products', productsController.getFeaturedProducts);
router.post('/add-product', productsController.addProduct);
router.post('/edit-product', productsController.editProduct);
router.post('/delete-product', productsController.deleteProduct);

export {};

module.exports = router;