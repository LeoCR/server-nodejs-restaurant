module.exports = function(app,router,upload,path,isLoggedIn) {
    const user = require(path.resolve(__dirname+'/../db/controller/user.controller.js')); 
    
    app.get('/api/find/email/:email', user.findByEmail);
    
}