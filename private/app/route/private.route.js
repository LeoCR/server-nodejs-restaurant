module.exports = function(app,express,path,isLoggedIn) {
    app.use(express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/build')));
    app.use('/img/strong-dish',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img/strong-dish')));
    app.use('/img/entrees/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img/entrees')));
    app.use('/img/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img')));
    app.use('/img/uploads/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img/uploads')));
    app.get(['/checkout','/checkout/payment'],isLoggedIn,function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../react-redux-checkout-restaurant/build/index.html'));
    })
}