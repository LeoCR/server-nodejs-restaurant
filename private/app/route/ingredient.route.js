module.exports = function(app,router,upload) {
    const ingredient = require('../db/controller/ingredient.controller.js'); 
    // Retrieve all 
    app.get('/api/ingredients', ingredient.findAll);
    app.delete('/api/ingredient/delete/:id', ingredient.delete);
    app.post('/ingredient/add/', upload.single('img'),ingredient.create);
    app.get('/api/ingredient/show/:idIngredient', ingredient.findById);
    // Update
    app.put('/api/ingredient/update/:idIngredient', ingredient.update);
    app.post('/ingredient/update/', upload.single('img'), ingredient.updateImg);
}