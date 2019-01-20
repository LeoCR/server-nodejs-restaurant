module.exports = function(app,router,upload) {
    const dessert = require('../db/controller/dessert.controller.js'); 
    // Retrieve all 
    app.get('/api/desserts', dessert.findAll);
    app.delete('/api/dessert/delete/:id',isLoggedIn, dessert.delete);
    app.post('/dessert/add/', upload.single('picture'),dessert.create);
    app.get('/api/dessert/show/:idDessert',isLoggedIn, dessert.findById);
    // Update
    app.put('/api/dessert/update/:idDessert',isLoggedIn, dessert.update);
    app.post('/dessert/update/', upload.single('picture'), dessert.updateImg);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}