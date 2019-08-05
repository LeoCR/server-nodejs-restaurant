module.exports = function(app, passport,path) {
    var authController = require(path.resolve(__dirname+'/../db/controller/auth.controller.js'));
    app.get('/admin/signup', authController.signup);
    app.get('/admin/signin', authController.signin);
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
    app.post('/api/signup', passport.authenticate('local-signup', {
        successRedirect: '/checkout',
        failureRedirect: '/'
        }
    ));
    app.get('/api/logout', authController.logout);
    app.post('/api/login', passport.authenticate('local-signin', {
            successRedirect: '/checkout/',
            failureRedirect: '/'
        }
    ));
}