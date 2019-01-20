module.exports = function(app,router,upload) {
    const strongDish = require('../db/controller/strongDish.controller.js'); 
    // Retrieve all 
    app.get('/api/strongs-dishes', strongDish.findAll);
    app.delete('/api/strongs-dish/delete/:id', strongDish.delete);
    app.post('/strong-dish/add/',upload.single('picture'),strongDish.create);
    app.get('/api/strong-dish/show/:idStrongDish', strongDish.findById);
    // Update with Id
    app.put('/api/strong-dish/update/:idStrongDish', strongDish.update);
    app.post('/strong-dish/update/', upload.single('picture'),strongDish.updateImg);
}