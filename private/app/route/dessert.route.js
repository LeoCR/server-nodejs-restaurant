module.exports = function(app,router,upload,path,isLoggedIn) {
    const dessert = require(path.resolve(__dirname+'/../db/controller/dessert.controller.js')); 
    // Retrieve all 
    app.get('/api/desserts', dessert.findAll);
    app.get('/admin/desserts/:page',isLoggedIn,(req,res)=>{
        res.status(200).sendFile(path.resolve(__dirname+'/../../../../react-admin-restaurant/build/index.html'));
    })
    app.delete('/api/dessert/delete/:id',isLoggedIn, dessert.delete);
    app.post('/api/dessert/add/',[isLoggedIn,upload.single('picture')] ,dessert.create);
    app.get('/api/dessert/show/:id', dessert.findById);
    // Update
    app.put('/api/dessert/update/:id',isLoggedIn, dessert.update);
    app.put('/api/dessert/update-img/:id', [isLoggedIn,upload.single('picture')], dessert.updateImg);
}