module.exports = function(app,router,upload,path,isLoggedIn) {
    const drink = require(path.resolve(__dirname+'/../db/controller/drink.controller.js')); 
    // Retrieve all 
    app.get('/api/drinks', drink.findAll);
    app.delete('/api/drink/delete/:id',isLoggedIn, drink.delete);
    app.post('/api/drink/add/',[isLoggedIn,upload.single('picture')],drink.create);
    app.get('/api/drink/show/:id', drink.findById);
    // Update with Id
    app.put('/api/drink/update/:id',isLoggedIn, drink.update);
    app.put('/api/drink/update-img/:id', [isLoggedIn,upload.single('picture')],drink.updateImg);
}