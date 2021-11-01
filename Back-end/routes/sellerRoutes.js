const express = require('express');
const router = express.Router();
const {createStore, getStoreByUserId, deleteStore, updateStoreWithoutImage, updateStoreWithImage} = require('../services/StoreService');
const {createProduct, getProductByProductId, getProductByStoreId, updateProductWithoutImageByProductId, updateProductWithImageByProductId, deleteProductByProductId, } = require('../services/ProductService');
const {uploadImage} = require('../services/GoogleDriveService');
const {createCategoryClothes, updateCategoryClothes} = require('../services/CategoryClothesService')
const {createCategoryShoes, updateCategoryShoes} = require('../services/CategoryShoesService')
const {createCategoryAccessories, updateCategoryAccessories} = require('../services/CategoryAccessoriesService');

router.post('/store', uploadImage, createStore);

router.get('/store/userid/:id', getStoreByUserId);

router.delete('/store/:id', deleteStore);

router.put('/store/:id', updateStoreWithoutImage);

router.put('/store/image/:id', uploadImage, updateStoreWithImage);

router.post('/product', uploadImage, createProduct);

router.get('/product/:id', getProductByProductId);

router.get('/product/store/:id', getProductByStoreId);

router.put('/product/:id', updateProductWithoutImageByProductId);

router.put('/product/image/:id', uploadImage, updateProductWithImageByProductId);

router.delete('/product/:id/category/:category', deleteProductByProductId);

router.post('/product/categoryclothes', createCategoryClothes);

router.put('/product/categoryclothes/:id', updateCategoryClothes);

router.post('/product/categoryshoes', createCategoryShoes);

router.put('/product/categoryshoes/:id', updateCategoryShoes);

router.post('/product/categoryaccessories', createCategoryAccessories);

router.put('/product/categoryaccessories/:id', updateCategoryAccessories);


module.exports = router;