const Store = require('../schemas/StoreSchema');

var createStore = (req, res, next) => {
    Store.findOne({nameStore: req.body.nameStore}, (err, store) => {
        if(err) return res.json(err);
        if(store == null){
            const store = new Store(req.body);
            store.save((err, result) => {
            if(err) return res.json(err);
            return res.json(result).status(201);
            })
        }
        else{
            return res.json({mess: 'Store is already existed'});
        }
    })
    
}

var getStoreByUserId = (req, res, next) => {
    Store.find({userId: req.params.id}, (err, stores) => {
        if(err) return res.json(err);
        return res.json(stores).status(200);
    })
}

var deleteStore = (req, res, next) => {
    Store.deleteOne({id: req.params.id}, (err) => {
        if(err) return res.json(err)
        return res.json({mess:"Delete successfully"}).status(200);
    })
}

var updateStoreWithoutImage = (req, res, next) => {
    Store.findOne({id: req.params.id}, (err, store) => {
        if(err) return res.json(err);
        store.userId = req.body.userId;
        store.nameStore = req.body.nameStore;
        store.storeDescription = req.body.storeDescription;

        store.save((err, result) => {
            if(err) return res.json(err);
            return res.json(result).status(200);
        })
    })
}

var updateStoreWithImage = (req, res, next) => {
    Store.findOne({id: req.params.id}, (err, store) => {
        if(err) return res.json(err);
        store.image = req.body.image;

        store.save((err, result) => {
            if(err) return res.json(err);
            return res.json(result).status(200);
        })
    })
}

var getAllStore = (req, res, next) => {
    Store.find({}, (err, stores) => {
        if(err) return res.json({mess: err}).status(404);
        return res.json(stores).status(200);
    })
}

module.exports  = {
    createStore,
    getStoreByUserId,
    deleteStore,
    updateStoreWithoutImage,
    updateStoreWithImage,
    getAllStore
}