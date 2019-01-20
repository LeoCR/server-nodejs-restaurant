module.exports = function(app,express) {
    app.use(express.static('/Users/leo/Documents/react-admin-restaurant/build'));
    app.use('/img/strong-dish',express.static('/Users/leo/Documents/react-admin-restaurant/img/strong-dish'))
    app.use('/img/entrees/',express.static('/Users/leo/Documents/react-admin-restaurant/img/entrees'))
    app.use('/img/',express.static('/Users/leo/Documents/react-admin-restaurant/img'));
    app.use('/img/uploads/',express.static('/Users/leo/Documents/react-admin-restaurant/img/uploads'));
}