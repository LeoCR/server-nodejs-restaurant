module.exports = function(app,router,upload) {
    const dessert = require('../db/controller/dessert.controller.js'); 
    // Retrieve all 
    app.get('/api/desserts', dessert.findAll);
    app.delete('/api/dessert/delete/:id',isLoggedIn, dessert.delete);
    app.post('/api/dessert/add/',[isLoggedIn,upload.single('picture')] ,dessert.create);
    app.get('/api/dessert/show/:id',isLoggedIn, dessert.findById);
    // Update
    app.put('/api/dessert/update/:id',isLoggedIn, dessert.update);
    app.post('/api/dessert/update/', [isLoggedIn,upload.single('picture')], dessert.updateImg);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}