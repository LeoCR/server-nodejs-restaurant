const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Entree = db.entree;
exports.findAll = (req, res) => {
	Entree.findAll().then(entree => {
	  res.send(entree);
	}).catch(err => {
		res.status(500).json({msg: "error", details: err});
	});
};
exports.delete = (req, res) => {
	const id = req.params.id;
	Entree.destroy({
			where: { id: id }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Entree Id = '  } );
		}).catch(err => {
			res.status(500).json({msg: "error", details: err});
	});
};
exports.findById = (req, res) => {	
	Entree.findByPk(req.params.id).then(dish => {
		res.send(dish);
	}).catch(err => {
		res.status(500).json({msg: "error", details: err});
	});
};
exports.create = (req, res) => {
	Entree.create({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		picture:'/img/uploads/'+req.file.filename,
		category:req.body.category,
		price:req.body.price 
	}).then(entree => {		
		  res.status(200).send(entree);
	}).catch(err => {
		res.status(500).json({msg: "error", details: err});
	}); 
}
exports.update = (req, res) => {
  	Entree.update({  
		id: req.body.id,
		name: req.body.name,
		description: req.body.description,
		category:req.body.category,
		price:req.body.price
	}, 
		{ 
			where: {
				id: req.params.id
		} }).then(entree => {		
			Entree.findByPk(req.params.id).then(dish => {
				return res.send(dish);
			}).catch(err => {
				res.status(500).json({msg: "error", details: err});
			});
	}).catch(err => {
		res.status(500).json({msg: "error", details: err});
	});
};
exports.updateImg = (req, res) => {
	Entree.update({  
	  id: req.body.id,
	  name: req.body.name,
	  description: req.body.description,
	  picture:'/img/uploads/'+req.file.filename,
	  category:req.body.category,
	  price:req.body.price
	}, 
	  { 
		where: {
			  id: req.params.id
	  }}).then(entree => {		
		Entree.findByPk(req.params.id).then(dish => {
			return res.send(dish);
		}).catch(err => {
			res.status(500).json({msg: "error", details: err});
		});
	}).catch(err => {
		res.status(500).json({msg: "error", details: err});
	});
};