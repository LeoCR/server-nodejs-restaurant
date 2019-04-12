module.exports = function(app,router,upload,path) {
    const drink = require(path.resolve(__dirname+'/../db/controller/drink.controller.js')); 
    // Retrieve all 
    app.get('/api/drinks', drink.findAll);
    app.delete('/api/drink/delete/:id',isLoggedIn, drink.delete);
    app.post('/api/drink/add/',upload.single('picture'),drink.create);
    app.get('/api/drink/show/:id',isLoggedIn, drink.findById);
    // Update with Id
    app.put('/api/drink/update/:id',isLoggedIn, drink.update);
    app.post('/api/drink/update/', [isLoggedIn,upload.single('picture')],drink.updateImg);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}