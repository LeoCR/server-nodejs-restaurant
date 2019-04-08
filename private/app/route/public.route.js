module.exports = function(app,express,path) {
    const publicRoute = require('../db/controller/public.controller.js'); 
    app.get(['/','/drinks/:id','/checkout'],function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/build/index.html'));
    });
    app.get('/api/getProducts',publicRoute.getAllProducts);
    app.get('/api/product/:id',publicRoute.findProduct);
    app.get('/api/product/ingredients/:id',publicRoute.findIngredients);
    //app.use('/',express.static('/Users/leo/Documents/restaurant-public-template/'));
    app.use('/fonts/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/fonts/')));
    app.use('/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/build/')));
    app.use('/css/',express.static(path.resolve(__dirname+'/../../../public/css/')));
    app.use('/img/',express.static(path.resolve(__dirname+'/../../../public/img/')));
    app.use('/css/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/css/')));
    app.use('/static/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/static/')));
    app.use('/images/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/images/')));
    app.use('/revolution/js/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/revolution/js/')));
    app.use('/revolution/css/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/revolution/css/')));
    app.use('/revolution/fonts/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/revolution/fonts/')));
    app.use('/revolution/assets/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/revolution/assets/')));
    app.use('/js/',express.static(path.resolve(__dirname+'/../../../../react-redux-shopping-cart-restaurant/public/js/')));
}