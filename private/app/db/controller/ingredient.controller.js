const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Ingredient = db.ingredient;
exports.findAll = (req, res) => {
	Ingredient.findAll({
		order: [
      ['name', 'ASC'],
    ]
	}).then(ingredient => {
	  res.send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Ingredient.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Ingredient Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "An error occurred.", details: err});
		});
};
exports.findById = (req, res) => {	
	Ingredient.findById(req.params.id).then(ingredient => {
		res.send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.create = (req, res) => {
	Ingredient.create({  
		id: req.body.id,
		name: req.body.name,
		img: '/img/uploads/'+req.file.filename
	}).then(ingredient => {		 
		  res.status(200).send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
}
exports.update = (req, res) => {
  	Ingredient.update({  
			id: req.body.id,
			name: req.body.name
		}, 
			{ 
				where: {
					id: req.body.id
		}}).then(ingredient => {		
			res.status(200).send(ingredient);
	}).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};
exports.updateImg = (req, res) => {
	Ingredient.update({  
	  id: req.body.id,
	  name: req.body.name,
	  img:'/img/uploads/'+req.file.filename,
  }, 
	  { 
		  where: {
			  id: req.body.id
	  }}).then(ingredient => {		
	  res.status(200).send(ingredient);
  }).catch(err => {
		res.status(500).json({msg: "An error occurred.", details: err});
	});
};