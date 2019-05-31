const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
User = db.user,
sequelize=db.sequelize;

exports.findAll=(req,res)=>{
    User.findAll().then(user => {
        res.send(user);
    }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.findByEmail=(req,res)=>{
    User.findOne({ where: {email: req.params.email} }).then(user => {
        // project will be the first entry of the Projects table with the title 'aProject' || null
        if(user){
            res.send(user)
        }
        else{
            res.json({user:null});
        }
    }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
    /* 
    var sqlFindUser="SELECT * FROM restaurant_ui.USER WHERE email='"+req.params.email+"';";
    sequelize.query(sqlFindUser, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
                res.send(user);     
    })*/
}
exports.findById = (req, res) => {	
	User.findById(req.params.id).then(user => {
		res.send(user);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};