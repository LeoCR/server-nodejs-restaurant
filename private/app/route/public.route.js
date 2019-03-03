module.exports = function(app,express) {
    const publicRoute = require('../db/controller/public.controller.js'); 
    app.get(['/','/drinks/:id','/checkout'],function(req,res){
        res.status(200).sendFile('/Users/leo/Documents/react-tabs/build/index.html');
    });
    app.get('/api/getProducts',publicRoute.getAllProducts);
    app.get('/api/product/:id',publicRoute.findProduct);
    app.get('/api/product/ingredients/:id',publicRoute.findIngredients);
    //app.use('/',express.static('/Users/leo/Documents/restaurant-public-template/'));
    app.use('/fonts/',express.static('/Users/leo/Documents/react-tabs/public/fonts/'));
    app.use('/',express.static('/Users/leo/Documents/react-tabs/build/'));
    app.use('/css/',express.static('/Users/leo/Documents/server-restaurant-admin/public/css/'));
    app.use('/css/',express.static('/Users/leo/Documents/react-tabs/public/css/'));
    app.use('/img/',express.static('/Users/leo/Documents/server-restaurant-admin/public/img/'));
    app.use('/static/',express.static('/Users/leo/Documents/react-tabs/public/static/'));
    app.use('/images/',express.static('/Users/leo/Documents/react-tabs/public/images/'));
    app.use('/revolution/js/',express.static('/Users/leo/Documents/react-tabs/public/revolution/js/'));
    app.use('/revolution/css/',express.static('/Users/leo/Documents/react-tabs/public/revolution/css/'));
    app.use('/revolution/fonts/',express.static('/Users/leo/Documents/react-tabs/public/revolution/fonts/'));
    app.use('/revolution/assets/',express.static('/Users/leo/Documents/react-tabs/public/revolution/assets/'));
    app.use('/js/',express.static('/Users/leo/Documents/react-tabs/public/js/'));
}