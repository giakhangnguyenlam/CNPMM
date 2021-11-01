const express = require('express');
const router = express.Router();
const {uploadImage} = require('../services/GoogleDriveService')
const {login, signup, updateUser} = require('../services/UserService')
const {getCategoryAccessoriesByProductId, getCategoryAccessoriesByType} = require('../services/CategoryAccessoriesService')
const {getCategoryClothesByProductId, getCategoryClothesByType} = require('../services/CategoryClothesService');
const {getCategoryShoesByProductId, getCategoryShoesByStyle} = require('../services/CategoryShoesService')
const {getAllProducts, getAllProductsByCategory} = require('../services/ProductService')
const {sellerSignup} = require('../services/SellerService')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', uploadImage, (req, res) => {
    data = {
      'req.body': req.body.description,
      'res.query': req.query.description,
      'image': req.body.image
    }
    return res.json(data)
})

// sign up
router.post('/signup', signup);

router.post('/login', login);

router.get('/product/categoryaccessories/:id', getCategoryAccessoriesByProductId);

router.get('/product/categoryclothes/:id', getCategoryClothesByProductId);

router.get('/product/categoryshoes/:id', getCategoryShoesByProductId);

router.get('/product/category/accessories/:type', getCategoryAccessoriesByType)

router.get('/product', getAllProducts);

router.get('/product/category/:id', getAllProductsByCategory);

router.get('/product/category/clothes/:type', getCategoryClothesByType);

router.get('/product/category/shoes/:style', getCategoryShoesByStyle);

router.get('/product/category/accessories/:type', getCategoryAccessoriesByType);

router.post('/seller/signup', sellerSignup);



module.exports = router;
