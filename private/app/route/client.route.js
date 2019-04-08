module.exports = function(app,path) {
    const client = require('../db/controller/client.controller.js'); 
    // Retrieve all 
    app.get('/api/client', isLoggedIn,client.findAll); 
    app.delete('/api/client/delete/:idClient', isLoggedIn,client.delete);
    app.post('/api/client/add/',isLoggedIn,client.create);
    app.get('/api/client/show/:idClient',isLoggedIn, client.findById);
    app.get('/api/count/clients',isLoggedIn,client.countClients);
    // Update 
    app.put('/api/client/update/:idClient', isLoggedIn,client.update);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}