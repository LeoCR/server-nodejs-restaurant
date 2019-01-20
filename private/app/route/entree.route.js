module.exports = function(app,router,upload) {
    const entree = require('../db/controller/entree.controller.js'); 
    // Retrieve all 
    app.get('/api/entrees', entree.findAll);
    app.delete('/api/entree/delete/:id', entree.delete);
    app.post('/entree/add/', upload.single('picture'),entree.create);
    app.get('/api/entree/show/:idEntree', entree.findById);
    // Update
    app.put('/api/entree/update/:idEntree', entree.update);
    app.post('/entree/update/', upload.single('picture'), entree.updateImg);
}