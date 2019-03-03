module.exports = (sequelize, Sequelize) => {
    const CLIENT_RESTAURANT = sequelize.define('CLIENT_RESTAURANT', {
        idClient: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        fullName:Sequelize.STRING,
        email:Sequelize.STRING,
        cellphone: Sequelize.STRING,
        },{
            timestamps: false
    });
	return CLIENT_RESTAURANT;
}