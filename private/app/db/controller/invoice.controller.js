const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Invoice = db.invoiceDetail,
HeaderInvoice=db.headerInvoice;
exports.findAll = (req, res) => {
	var jsonData={};
	Invoice.findAll().then(invoice => {
		// Send all invoices
		jsonData={ invoicesDetails: invoice }; 
		HeaderInvoice.findAll().then(headerInvoice=>{
			jsonData=Object.assign({headerInvoices:headerInvoice},jsonData);
			res.send(jsonData);
		})
	}).catch(err => {
		console.log(err);
		res.status(500).json({msg: "error", details: err});
	});
};

exports.findById = (req, res) => {	
	Invoice.findById(req.params.id).then(invoice => {
		res.send(invoice);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};