module.exports = (sequelize, Sequelize) => {
    const HEADER_INVOICE = sequelize.define('HEADER_INVOICE', {
        idHeader: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        total: Sequelize.DECIMAL,
        subTotal:  Sequelize.DECIMAL,
        salesTax:Sequelize.DECIMAL,
        productId:Sequelize.TEXT,
        productName:Sequelize.TEXT,
        productQuantity:Sequelize.INTEGER
        },{
            timestamps: false
    });
	return HEADER_INVOICE;
}