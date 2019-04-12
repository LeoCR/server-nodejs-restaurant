const express = require('express'),
path = require('path'), 
app = express(),
http = require('http'),
bodyParser = require('body-parser'),
compression = require('compression'),
multer = require('multer'),
router = express.Router(),
methodOverride = require('method-override'),
exphbs  = require('express-handlebars'),
passport = require('passport'),
cors = require('cors'),
session = require('express-session');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// For Passport
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.set('port', 49652); 
app.use(compression());

app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.send('An error occurs: '+err);
});
var storage = multer.diskStorage(
    {
        destination: path.resolve(__dirname+'/../../react-admin-restaurant/img/uploads/'),
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);
var upload = multer({ storage: storage });

//For Handlebars
//app.set('views', '/Users/leo/Documents/server-restaurant-admin/private/app/views')
app.set('views', path.resolve(__dirname+'/app/views'))
app.engine('html', exphbs({
    extname: '.html'
}));
app.set('view engine', '.html');  
//Models
var models = require(path.resolve(__dirname+"/app/db/config/config.js"));

require(path.resolve(__dirname+'/app/route/public.route.js'))(app,express,path);
require(path.resolve(__dirname+'/app/route/private.route.js'))(app,express,path);
require(path.resolve(__dirname+'/app/route/strongDish.route.js'))(app,router,upload,path);
require(path.resolve(__dirname+'/app/route/entree.route.js'))(app,router,upload,path);
require(path.resolve(__dirname+'/app/route/ingredient.route.js'))(app,router,upload,path);
require(path.resolve(__dirname+'/app/route/dessert.route.js'))(app,router,upload,path);
require(path.resolve(__dirname+'/app/route/drink.route.js'))(app,router,upload,path);
require(path.resolve(__dirname+'/app/route/client.route.js'))(app,router,upload,path);
require(path.resolve(__dirname+'/app/route/auth.route.js'))(app,passport,path); 
//load passport strategies
require(path.resolve(__dirname+'/app/db/config/passport/passport.js'))(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
    console.log('http://localhost:49652/ works')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

http.createServer(app, (req, res) => {
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Content-Type-Options':'nosniff',
      'Vary':'Origin, Accept-Encoding',
      'Pragma':'no-cache',
      'Expires':-1
    })
    res.writeHead(200);
    res.end('hello world\n');
    console.log('http://localhost:49652 !');
}).listen(49652);