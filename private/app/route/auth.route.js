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
    app.get([
        '/admin/','/admin/drinks/','/admin/desserts','/admin/ingredients',
        '/admin/add/ingredient','/admin/edit/ingredient/*',
        '/admin/main-courses','/admin/private/','/admin/drink','/admin/strong-dish','/admin/dessert','/admin/add/main-course','/admin/add/drink',
        '/admin/appetizers','/admin/main-course','/admin/add/appetizer','/admin/edit/main-course/*','/admin/edit/dessert/*','/admin/edit/drink/*',
        '/admin/edit/**/*','/admin/edit/appetizer',
        '/admin/add/*','/admin/invoices'
        ], isLoggedIn, function (req, res) {  
        res.sendFile(path.resolve(__dirname+'/../../../../react-admin-restaurant/build/index.html'));
    });
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
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/admin/signin');
    }
}