module.exports = function(app,express,path,isLoggedIn) {
    app.use(express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/build')));
    app.get(['/checkout','/checkout/payment'],isLoggedIn,function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../react-redux-checkout-restaurant/build/index.html'));
    })
}