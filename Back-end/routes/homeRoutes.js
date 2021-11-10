const express = require('express');
const router = express.Router();
const {login, signup} = require('../services/UserService')
const {getCategoryAccessoriesByProductId, getCategoryAccessoriesByType} = require('../services/CategoryAccessoriesService')
const {getCategoryClothesByProductId, getCategoryClothesByType} = require('../services/CategoryClothesService');
const {getCategoryShoesByProductId, getCategoryShoesByStyle} = require('../services/CategoryShoesService')
const {getAllProducts, getAllProductsByCategory, getProductByProductId} = require('../services/ProductService')
const {sellerSignup, sellerLogin} = require('../services/SellerService')
const {getCommentByProductId} = require('../services/CommentService')

const {adminLogin} = require('../services/AdminService');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Group 9 CNPMM' });
});

// sign up
router.post('/signup', signup);

router.post('/login', login);

router.get('/product/categoryaccessories/:id', getCategoryAccessoriesByProductId);

router.get('/product/categoryclothes/:id', getCategoryClothesByProductId);

router.get('/product/categoryshoes/:id', getCategoryShoesByProductId);

router.get('/product/category/accessories/:type', getCategoryAccessoriesByType)

router.get('/product', getAllProducts);

router.get('/product/:id', getProductByProductId);

router.get('/product/category/:id', getAllProductsByCategory);

router.get('/product/category/clothes/:type', getCategoryClothesByType);

router.get('/product/category/shoes/:style', getCategoryShoesByStyle);

router.get('/product/category/accessories/:type', getCategoryAccessoriesByType);

router.get('/product/comment/:id', getCommentByProductId);

router.post('/seller/signup', sellerSignup);

router.post('/seller/login', sellerLogin);

router.post('/admin/login', adminLogin);


module.exports = router;
