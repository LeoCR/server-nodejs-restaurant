module.exports = function(app,upload,path,isLoggedIn) {
    const dessert = require(path.resolve(__dirname+'/../db/controller/dessert.controller.js')); 
    // Retrieve all 
    app.get('/api/desserts', dessert.findAll);
    app.get('/api/dessert/show/:id', dessert.findById);
    app.delete('/api/dessert/delete/:id',isLoggedIn, dessert.delete);
    app.post('/api/dessert/add/',[isLoggedIn,upload.single('picture')] ,dessert.create);
    app.put('/api/dessert/update/:id',isLoggedIn, dessert.update);
    app.put('/api/dessert/update-img/:id', [isLoggedIn,upload.single('picture')], dessert.updateImg);
}