module.exports = function(app,upload,path,isLoggedIn) {
    const entree = require(path.resolve(__dirname+'/../db/controller/entree.controller.js')); 
    // Retrieve all 
    app.get('/api/entrees', entree.findAll);
    app.get('/api/entree/show/:id', entree.findById);
    app.delete('/api/entree/delete/:id',isLoggedIn, entree.delete);
    app.post('/api/entree/add/',[isLoggedIn, upload.single('picture')],entree.create);
    app.put('/api/entree/update/:id',isLoggedIn, entree.update);
    app.put('/api/entree/update-img/:id', [isLoggedIn,upload.single('picture')], entree.updateImg);
}