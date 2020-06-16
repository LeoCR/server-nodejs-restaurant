module.exports = function(app, passport,path) {
    var authController = require(path.resolve(__dirname+'/../db/controller/auth.controller.js'));
    
    app.get('/admin/signin', authController.signin);
    app.get('/admin/signup',function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../views/signup.html'));        
    });
    app.post('/admin/signup', passport.authenticate('local-signup', {
            successRedirect: '/admin',
            failureRedirect: '/signup'
        }
    ));
    app.get('/admin/logout', authController.logout);
    app.post('/admin/signin', passport.authenticate('local-signin', {
            successRedirect: '/admin/',
            failureRedirect: '/admin/signin'
        }
    )); 
}