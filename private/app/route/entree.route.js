module.exports = function(app,router,upload,path,isLoggedIn) {
    const entree = require(path.resolve(__dirname+'/../db/controller/entree.controller.js')); 
    // Retrieve all 
    app.get('/api/entrees', entree.findAll);
    app.delete('/api/entree/delete/:id',isLoggedIn, entree.delete);
    app.post('/api/entree/add/',[isLoggedIn, upload.single('picture')],entree.create);
    app.get('/api/entree/show/:id', entree.findById);
    // Update
    app.put('/api/entree/update/:id',isLoggedIn, entree.update);
    app.post('/api/entree/update/', [isLoggedIn,upload.single('picture')], entree.updateImg);
}