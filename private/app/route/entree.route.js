var previewMode = require("../db/config/previewMode");
module.exports = function(app,upload,path,isLoggedIn) {
    const entree = require(path.resolve(__dirname+'/../db/controller/entree.controller.js')); 
    // Retrieve all 
    app.get('/api/entrees', entree.findAll);
    app.get('/api/entree/show/:id', entree.findById);
    if(previewMode){
        app.delete('/api/entree/delete/:id', entree.delete);
        app.post('/api/entree/add/',[ upload.single('picture')],entree.create);
        app.put('/api/entree/update/:id', entree.update);
        app.put('/api/entree/update-img/:id', [upload.single('picture')], entree.updateImg);
    }
    else{
        app.delete('/api/entree/delete/:id',isLoggedIn, entree.delete);
        app.post('/api/entree/add/',[isLoggedIn, upload.single('picture')],entree.create);
        app.put('/api/entree/update/:id',isLoggedIn, entree.update);
        app.put('/api/entree/update-img/:id', [isLoggedIn,upload.single('picture')], entree.updateImg);
    } 
}