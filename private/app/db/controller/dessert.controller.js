const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Dessert = db.dessert,
fs = require('fs');
exports.findAll = (req, res) => {
	Dessert.findAll().then(dessert => {
	  res.send(dessert);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Dessert.findByPk(id).then(dessert=>{
		const path='/Users/leo/Documents/react-admin-restaurant/img/uploads';
		const picToDelete=dessert.dataValues.picture;
		const tempPicToDelete=picToDelete.replace('/img/uploads', path);
 
		fs.unlink(tempPicToDelete, ()=>{
			console.log('File deleted! '+tempPicToDelete); 
		})
		return Dessert.destroy({
			where: { 
				id: id 
			}
		}).then((u) => {
			console.log(u); 
			res.status(200).json( { msg: 'Deleted Successfully -> Dessert Id = '+id  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
		});
	})
	
};
exports.create = (req, res) => {	
    Dessert.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		price:parseFloat(req.body.price)
	}).then(newDessert => {		
		  res.status(200).send(newDessert);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.findById = (req, res) => {	
	Dessert.findByPk(req.params.id).then(dish => {
		res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.update = async (req, res) => {
	await Dessert.update({  
		  id: req.body.id,
		  name: req.body.name,
		  description: req.body.description,
		  price:req.body.price 
	  }, 
	{ where: {id: req.params.id},returning: true,
	plain: true}).then(() => {	 
		return Dessert.findByPk(req.params.id).then(dish => {
			 res.send(dish);
		}).catch(err => {
			console.log('An errors occurs in dessert.controller update() findByPk()'); 
			console.log(err); 
		  	res.status(200).json({msg: "An error occurred.", details: err});
  		});
	}).catch(err => {
		  	console.log('An errors occurs in dessert.controller update()'); 
		  	console.log(err); 
			res.status(200).json({msg: "An error occurred.", details: err});
	});
};
exports.updateImg = async (req, res) => { 
    await Dessert.update({  
			id: req.body.id,
			name: req.body.name,
			description: req.body.description,
			picture:'/img/uploads/'+req.file.filename,
			price:req.body.price 
		}, 
		{ where: {id: req.params.id}}).then(() => {	
			return Dessert.findByPk(req.params.id).then(dish => {
				 res.send(dish);
			}).catch(err => {
				console.log('An errors occurs in dessert.controller updateImg() findByPk()'); 
				console.log(err); 
				  res.status(200).json({msg: "An error occurred.", details: err});
			});
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};