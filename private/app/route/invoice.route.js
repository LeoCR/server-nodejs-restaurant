module.exports = function(app,path,isLoggedIn) {
    const invoice = require(path.resolve(__dirname+'/../db/controller/invoice.controller.js')); 
    app.get('/api/invoices',isLoggedIn,invoice.findAll);
    app.get('/api/invoice/:id',invoice.findById)
}