var previewMode = require("../db/config/previewMode");
module.exports = function(app,path,isLoggedIn) {
    const invoice = require(path.resolve(__dirname+'/../db/controller/invoice.controller.js')); 
    if(previewMode){
        app.get('/api/invoices/',invoice.getInvoices);
        app.get('/api/invoice/show/:order_code',invoice.findByOrderCode);
        app.get('/api/invoice/show/products/:order_code',invoice.findProductsByOrderCode);
    }
    else{
        app.get('/api/invoices/',isLoggedIn,invoice.getInvoices);
        app.get('/api/invoice/show/:order_code',isLoggedIn,invoice.findByOrderCode);
        app.get('/api/invoice/show/products/:order_code',isLoggedIn,invoice.findProductsByOrderCode);
    }
}