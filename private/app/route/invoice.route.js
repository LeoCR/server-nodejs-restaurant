module.exports = function(app,path,isLoggedIn) {
    const invoice = require(path.resolve(__dirname+'/../db/controller/invoice.controller.js')); 
    app.get('/api/invoices/',invoice.getInvoices);
    app.get('/api/invoice/show/:order_code',invoice.findByOrderCode)
    app.get('/api/invoice/show/products/:order_code',invoice.findProductsByOrderCode)
}