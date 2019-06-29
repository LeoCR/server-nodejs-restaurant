module.exports = (sequelize, Sequelize) => {
    const INGREDIENT_DISH = sequelize.define('INGREDIENT_DISH', {
        idIngredientDish: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        idIngredient:Sequelize.STRING,
        idDish: Sequelize.STRING
        },{
            timestamps: false
    });
	return INGREDIENT_DISH;
}