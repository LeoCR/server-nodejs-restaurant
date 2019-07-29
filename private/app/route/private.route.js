module.exports = function(app,express,path,isLoggedIn) {
    app.use(express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/build')));
    app.get(['/checkout','/checkout/payment'],isLoggedIn,function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../react-redux-checkout-restaurant/build/index.html'));
    })
    app.get([
    '/admin/edit/user/:id','/admin/users',
    '/admin/strongs-dishes','/admin/add/strong-dish','/admin/strongs-dishes/:page',
    '/admin/desserts','/admin/add/dessert','/admin/desserts/:page',
    '/admin/entrees','/admin/add/entree','/admin/entrees/:page',
    '/admin/ingredients','/admin/add/ingredient','/admin/ingredients/:page',
    '/admin/drinks','/admin/add/drink','/admin/drinks/:page',
    '/admin/invoices','/admin/edit/invoice/:order_code'
    ],isLoggedIn,function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../react-admin-restaurant/build/index.html'));
    })
}