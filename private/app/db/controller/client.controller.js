const path = require('path'), 
db = require(path.resolve(__dirname+'/../config/config.js')),
Client = db.client,
sequelize=db.sequelize;
// FETCH all Customers
exports.findAll = (req, res) => {
	Client.findAll().then(client => {
	  // Send all customers to Client
	  res.send(client);
	});
};
// Delete a Customer by Id
exports.delete = (req, res) => {
	const idClient = req.params.idClient;
	Client.destroy({
			where: { idClient: idClient }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Client Id = '  } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
// Post a Customer
exports.create = (req, res) => {	
    Client.create({  
        idClient: req.body.idClient,
        fullName: req.body.fullName,
        email: req.body.email,
				country:req.body.country,
				postalCode:req.body.postalCode 
	}).then(client => {		
		  // Send created customer to client
		  res.status(200).send(client);
	}); 
	//res.status(200).redirect('/admin');
};
// Find a Customer by Id
exports.findById = (req, res) => {	
	Client.findById(req.params.idClient).then(client => {
		res.send(client);
	})
};
// Update a Customer
exports.update = (req, res) => {
	Client.update({  
      idClient: req.body.idClient,
		  fullName: req.body.fullName,
		  email: req.body.email,
		  country:req.body.country,
			postalCode:req.body.postalCode
	  }, 
	{ where: {idClient: req.body.idClient}}).then(client => {		
			// Send created customer to client
			res.status(200).send(client);
		}); 
	  //res.status(200).redirect('/admin');
};
exports.countClients= (req, res) => {	
	var sqlCountCients="SELECT COUNT(*) as totalClients FROM restaurant_ui.CLIENT_RESTAURANT;";
 sequelize.query(sqlCountCients, { type: sequelize.QueryTypes.SELECT})
 .then(totalClients => {
			res.send(totalClients);     
	})
}
 