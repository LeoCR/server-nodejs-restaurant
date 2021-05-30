const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
sequelize=db.sequelize;

exports.getInvoices=(req,res)=>{
	const sqlFindUser="SELECT distinct(order_code) AS order_code ,USER.email , INVOICE_DETAIL.date_of_billing, "+
	" USER.username FROM INVOICE_DETAIL "+
	" INNER JOIN USER ON USER.id=INVOICE_DETAIL.client_restaurant;";
	sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
	.then(invoices => {
				res.send(invoices);     
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findByOrderCode=(req,res)=>{
	const sqlFindByorder_code="SELECT USER.email,HEADER_INVOICE.id_header , INVOICE_DETAIL.order_code, USER.username,INVOICE_DETAIL.date_of_billing "+
	" FROM restaurant_ui.HEADER_INVOICE "+
	" INNER JOIN INVOICE_DETAIL ON INVOICE_DETAIL.header_invoice=HEADER_INVOICE.id_header "+
	" INNER JOIN USER ON INVOICE_DETAIL.client_restaurant=USER.id where INVOICE_DETAIL.order_code='"+req.params.order_code +"';";
	sequelize.query(sqlFindByorder_code,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findProductsByOrderCode=(req,res)=>{
	const sqlFindByorder_code="SELECT HEADER_INVOICE.id_header,HEADER_INVOICE.total,HEADER_INVOICE.product_name,HEADER_INVOICE.product_id,HEADER_INVOICE.product_quantity , INVOICE_DETAIL.order_code,INVOICE_DETAIL.date_of_billing "+
	" FROM restaurant_ui.HEADER_INVOICE "+
	" INNER JOIN INVOICE_DETAIL ON INVOICE_DETAIL.header_invoice=HEADER_INVOICE.id_header "+
	" INNER JOIN USER ON INVOICE_DETAIL.client_restaurant=USER.id where INVOICE_DETAIL.order_code='"+req.params.order_code +"';";
	sequelize.query(sqlFindByorder_code,{type:sequelize.QueryTypes.SELECT})
	.then(invoice=>{
		res.send(invoice)
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
