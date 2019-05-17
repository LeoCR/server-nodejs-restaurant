module.exports = function(app,router,upload,path,isLoggedIn) {
    const ingredient = require(path.resolve(__dirname+'/../db/controller/ingredient.controller.js')); 
    // Retrieve all 
    app.get('/api/ingredients', ingredient.findAll);
    app.delete('/api/ingredient/delete/:id', isLoggedIn,ingredient.delete);
    app.post('/api/ingredient/add/', [isLoggedIn,upload.single('img')],ingredient.create);
    app.get('/api/ingredient/show/:id', ingredient.findById);
    // Update
    app.put('/api/ingredient/update/:id',isLoggedIn, ingredient.update);
    app.post('/api/ingredient/update/',[isLoggedIn, upload.single('img')], ingredient.updateImg);
    
}