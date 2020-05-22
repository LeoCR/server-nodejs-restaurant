var previewMode = require("../db/config/previewMode");
module.exports = function(app,upload,path,isLoggedIn) {
    const drink = require(path.resolve(__dirname+'/../db/controller/drink.controller.js')); 
    // Retrieve all 
    app.get('/api/drinks', drink.findAll);
    app.get('/api/drink/show/:id', drink.findById);
    if(previewMode){
        app.delete('/api/drink/delete/:id', drink.delete);
        app.post('/api/drink/add/',[upload.single('picture')],drink.create);
        app.put('/api/drink/update/:id', drink.update);
        app.put('/api/drink/update-img/:id', [upload.single('picture')],drink.updateImg);
    }
    else{
        app.delete('/api/drink/delete/:id',isLoggedIn, drink.delete);
        app.post('/api/drink/add/',[isLoggedIn,upload.single('picture')],drink.create);
        app.put('/api/drink/update/:id',isLoggedIn, drink.update);
        app.put('/api/drink/update-img/:id', [isLoggedIn,upload.single('picture')],drink.updateImg);
    }
}