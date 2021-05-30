module.exports = function(app,express,path,isLoggedIn) {
    app.use("/static/",isLoggedIn,express.static(path.resolve(__dirname+'/../../../public/build/static')));
    app.get('/admin/',function(req,res){
            if (req.user) {
                res.status(200).sendFile(path.resolve(__dirname+'/../../../public/build/index.html'));
                
            } else {
                res.setHeader('Content-Type', 'text/html')
                res.write('<p>Not Authorized</p>')
                res.end()
            }
    });
    app.get([
    '/admin/ingredients/:page','/admin/users/:page','/admin/edit/user/:id','/admin/users','/admin/add/user',
    '/admin/main-courses/:page','/admin/main-courses','/admin/add/main-course','/admin/main-courses/:page','/admin/edit/main-course/:id',
    '/admin/appetizers','/admin/add/appetizer','/admin/appetizers/:page','/admin/edit/appetizer/:id',
    '/admin/ingredients','/admin/add/ingredient','/admin/ingredients/:page','/admin/edit/ingredient/:id',
    '/admin/drinks','/admin/add/drink','/admin/drinks/:page','/admin/edit/drink/:id',
    '/admin/invoices','/admin/edit/invoice/:order_code','/admin/invoices/:page',
    '/admin/desserts/:page','/admin/desserts','/admin/edit/dessert/:id','/admin/add/dessert'
    ],isLoggedIn,function(req,res){
        res.status(200).sendFile(path.resolve(__dirname+'/../../../public/build/index.html'));
    });
}