module.exports = (sequelize, Sequelize) => {
    const INVOICEDETAIL = sequelize.define('INVOICEDETAIL', {
        idInvoiceDetail: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        clientRestaurant:Sequelize.INTEGER,
        headerInvoice: Sequelize.INTEGER,
        },{
            timestamps: false
    });
	return INVOICEDETAIL;
}