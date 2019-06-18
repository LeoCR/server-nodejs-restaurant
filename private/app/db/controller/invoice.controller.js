const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize;

exports.getInvoices=(req,res)=>{
	var sqlFindUser="SELECT distinct(orderCode) AS orderCode ,USER.email , INVOICE_DETAIL.dateOfBilling, "+
	" USER.username FROM INVOICE_DETAIL "+
	" INNER JOIN USER ON USER.id=INVOICE_DETAIL.clientRestaurant;";
	sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
	.then(invoices => {
				res.send(invoices);     
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findByOrderCode=(req,res)=>{
	var sqlFindByOrderCode="SELECT USER.email,HEADER_INVOICE.idHeader , INVOICE_DETAIL.orderCode, USER.username,INVOICE_DETAIL.dateOfBilling "+
	" FROM restaurant_ui.HEADER_INVOICE "+
	" INNER JOIN INVOICE_DETAIL ON INVOICE_DETAIL.headerInvoice=HEADER_INVOICE.idHeader "+
	" INNER JOIN USER ON INVOICE_DETAIL.clientRestaurant=USER.id where INVOICE_DETAIL.orderCode='"+req.params.orderCode +"';";
	sequelize.query(sqlFindByOrderCode,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findProductsByOrderCode=(req,res)=>{
	var sqlFindByOrderCode="SELECT HEADER_INVOICE.idHeader,HEADER_INVOICE.total,HEADER_INVOICE.productName,HEADER_INVOICE.productId,HEADER_INVOICE.productQuantity , INVOICE_DETAIL.orderCode,INVOICE_DETAIL.dateOfBilling "+
	" FROM restaurant_ui.HEADER_INVOICE "+
	" INNER JOIN INVOICE_DETAIL ON INVOICE_DETAIL.headerInvoice=HEADER_INVOICE.idHeader "+
	" INNER JOIN USER ON INVOICE_DETAIL.clientRestaurant=USER.id where INVOICE_DETAIL.orderCode='"+req.params.orderCode +"';";
	sequelize.query(sqlFindByOrderCode,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
