var previewMode = require("../db/config/previewMode");
module.exports = function(app,upload,path,isLoggedIn) {
    const ingredient = require(path.resolve(__dirname+'/../db/controller/ingredient.controller.js')); 
    // Retrieve all
    app.get('/api/ingredients', ingredient.findAll);
    app.get('/api/ingredient/show/:id', ingredient.findById);
    if(previewMode){
        app.delete('/api/ingredient/delete/:id',ingredient.delete);
        app.post('/api/ingredient/add/', [upload.single('img')],ingredient.create);
        app.put('/api/ingredient/update/:id', ingredient.update);
        app.put('/api/ingredient/update-img/:id',[ upload.single('img')], ingredient.updateImg);
        app.get('/api/ingredients/:idDish',ingredient.getIngredientsByDish);
        app.post('/api/ingredient-to-dish/add/',ingredient.addIngredientToDish);
        app.delete('/api/ingredient-to-dish/delete/:id_ingredient_dish',ingredient.deleteIngredientFromDish);
        app.get('/api/ingredient-to-dish/count/',ingredient.getLastIngredientToDishId);
    }
    else{
        app.delete('/api/ingredient/delete/:id', isLoggedIn,ingredient.delete);
        app.post('/api/ingredient/add/', [isLoggedIn,upload.single('img')],ingredient.create);
        app.put('/api/ingredient/update/:id',isLoggedIn, ingredient.update);
        app.put('/api/ingredient/update-img/:id',[isLoggedIn, upload.single('img')], ingredient.updateImg);
        app.get('/api/ingredients/:idDish', isLoggedIn,ingredient.getIngredientsByDish);
        app.post('/api/ingredient-to-dish/add/', isLoggedIn,ingredient.addIngredientToDish);
        app.delete('/api/ingredient-to-dish/delete/:id_ingredient_dish', isLoggedIn,ingredient.deleteIngredientFromDish);
        app.get('/api/ingredient-to-dish/count/', isLoggedIn,ingredient.getLastIngredientToDishId);
    } 
}