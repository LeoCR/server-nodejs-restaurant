module.exports = function(app,express,path) {
    app.use(express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/build')));
    app.use('/img/strong-dish',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img/strong-dish')));
    app.use('/img/entrees/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img/entrees')));
    app.use('/img/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img')));
    app.use('/img/uploads/',express.static(path.resolve(__dirname+'/../../../../react-admin-restaurant/img/uploads')));
}