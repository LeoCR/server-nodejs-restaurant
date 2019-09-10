module.exports = function(app,express,path) {
    const publicController = require(path.resolve(__dirname+'/../db/controller/public.controller.js')); 
    app.use('/img/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img')));
    
    app.get('/api/getProducts',publicController.getAllProducts);
    app.get('/api/product/:id',publicController.findProduct);
    app.get('/api/product/ingredients/:id',publicController.findIngredients);
    
    app.use('/css/',express.static(path.resolve(__dirname+'/../../../public/css/')));
    app.use('/img/',express.static(path.resolve(__dirname+'/../../../public/img/')));
    
    app.get('/user/info',function(req,res){
        if(req.user){
          res.json({user:req.user})
        }
        else{
          res.json({user:null})
        }
    }) 
}