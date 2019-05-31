module.exports = function(app,path,isLoggedIn) {
    const user = require(path.resolve(__dirname+'/../db/controller/user.controller.js')); 
    
    app.get('/api/find/email/:email', user.findByEmail);
    app.get('/api/users',isLoggedIn, user.findAll);
    
}