module.exports = function(app,router,upload,path,isLoggedIn) {
    const dessert = require(path.resolve(__dirname+'/../db/controller/dessert.controller.js')); 
    // Retrieve all 
    app.get('/api/desserts', dessert.findAll);
    app.delete('/api/dessert/delete/:id',isLoggedIn, dessert.delete);
    app.post('/api/dessert/add/',[isLoggedIn,upload.single('picture')] ,dessert.create);
    app.get('/api/dessert/show/:id', dessert.findById);
    // Update
    app.put('/api/dessert/update/:id',isLoggedIn, dessert.update);
    app.post('/api/dessert/update/', [isLoggedIn,upload.single('picture')], dessert.updateImg);
}