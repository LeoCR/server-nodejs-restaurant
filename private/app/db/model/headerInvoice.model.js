module.exports = (sequelize, Sequelize) => {
    const HEADER_INVOICE = sequelize.define('HEADER_INVOICE', {
        idHeader: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        dateOfBilling:Sequelize.DATE,
        total: Sequelize.DECIMAL,
        subTotal:  Sequelize.DECIMAL,
        salesTax:Sequelize.DECIMAL,
        productId:Sequelize.TEXT,
        productQuantity:Sequelize.INTEGER
        },{
            timestamps: false
    });
	return HEADER_INVOICE;
}