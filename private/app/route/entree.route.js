module.exports = function(app,router,upload,path) {
    const entree = require('../db/controller/entree.controller.js'); 
    // Retrieve all 
    app.get('/api/entrees', entree.findAll);
    app.delete('/api/entree/delete/:id', entree.delete);
    app.post('/api/entree/add/', upload.single('picture'),entree.create);
    app.get('/api/entree/show/:id', entree.findById);
    // Update
    app.put('/api/entree/update/:id', entree.update);
    app.post('/api/entree/update/', upload.single('picture'), entree.updateImg);
}