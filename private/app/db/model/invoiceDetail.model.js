module.exports = (sequelize, Sequelize) => {
    const INVOICE_DETAIL = sequelize.define('INVOICE_DETAIL', {
        idInvoiceDetail: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        clientRestaurant:Sequelize.INTEGER,
        headerInvoice: Sequelize.INTEGER,
        orderCode:Sequelize.STRING,
        dateOfBilling:Sequelize.DATE
        },{
            timestamps: false
    });
	return INVOICE_DETAIL;
}