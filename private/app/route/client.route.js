module.exports = function(app) {
    const client = require('../db/controller/client.controller.js'); 
    // Retrieve all 
    app.get('/api/client', client.findAll); 
    app.delete('/api/client/delete/:idClient',isLoggedIn, client.delete);
    app.post('/api/client/add/',client.create);
    app.get('/api/client/show/:idClient', client.findById);
    app.get('/api/count/clients',client.countClients);
    // Update 
    app.put('/api/client/update/:idClient', client.update);
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}