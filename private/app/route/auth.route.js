module.exports = function(app, passport,path) {
    var authController = require(path.resolve(__dirname+'/../db/controller/auth.controller.js'));
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/admin',
            failureRedirect: '/signup'
        }
    ));
    app.get('/logout', authController.logout);
    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/admin',
            failureRedirect: '/signin'
        }
    ));
    app.get(['/admin/','/admin/drinks/','/admin/desserts','/admin/ingredients','/admin/add/ingredient','/admin/edit/ingredient/*',
        '/admin/strongs-dishes','/admin/private/','/admin/drink','/admin/strong-dish','/admin/dessert','/admin/add/strong-dish','/admin/add/drink',
        '/admin/entrees','/admin/strong-dish','/admin/add/entree','/admin/edit/strong-dish/*','/admin/edit/dessert/*','/admin/edit/drink/*',
        '/admin/edit/entree/*','/admin/edit/entree'
        ], isLoggedIn, function (req, res) {  
        res.sendFile(path.resolve(__dirname+'/../../../../react-admin-restaurant/build/index.html'));
    });
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/signin');
    }
}