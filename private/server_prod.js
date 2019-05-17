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
session = require('express-session'),
FacebookStrategy= require('passport-facebook');
var fbOpts={
    clientID: '720204288362847',
    clientSecret: 'feef2e093911b66519d0169ebdeee6d5',
    callbackURL: "https://server-restaurant-leocr2015.c9users.io:8080/auth/facebook/callback",
    enableProof: true,
    profileFields: ['id', 'email', 'first_name', 'last_name']
};
var fbCallback=function(accessToken, refreshToken, profile, done) {
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);
        console.log('profile',profile);
        done(null, profile);
};
//Models
var models = require(path.resolve(__dirname+"/app/db/config/config.js"));
var storage = multer.diskStorage(
    {
        destination: path.resolve(__dirname+'/../react-admin-restaurant/img/uploads/'),
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);
var upload = multer({ storage: storage });/*
function verifyToken(req,res,next){
    //Get auth header value
    const bearerHeader = req.headers["authorization"];
	console.log(bearerHeader)
	if(typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} 
	else {
		res.sendStatus(403);
    }
}*/
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    else{
        res.redirect('/');
    }
}

app.use('/', router);
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// For Passport

passport.serializeUser(function(user, done) {
		done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});
passport.use(new FacebookStrategy(fbOpts,fbCallback));
app.use(compression());
app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.send('An error occurs: '+err);
});
app.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}));

/** 
*   Facebook will redirect the user to this URL after approval.  Finish the
* authentication process by attempting to obtain an access token.  If
* access was granted, the user will be logged in.  Otherwise,
* authentication has failed.
**/
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/checkout',
                                      failureRedirect: '/' }));
//For Handlebars
//app.set('views', '/Users/leo/Documents/server-restaurant-admin/private/app/views')
app.set('views', path.resolve(__dirname+'/app/views'))
app.engine('html', exphbs({
    extname: '.html'
}));
app.set('view engine', '.html');  
app.route('/logout').get(function(req,res){
    req.session.destroy();
    req.logout();
  res.redirect('/');
});
app.get('/validate/authentication',function(req,res){
  if (req.isAuthenticated()){
    res.json({isAuthenticated:true});
  }
  else{
    res.json({isAuthenticated:false});
  }
});
app.get(['/checkout','/checkout/payment'],isLoggedIn,function(req,res){
    res.status(200).sendFile(path.resolve(__dirname+'/../react-redux-checkout-restaurant/build/index.html'));
})


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
    //console.log('http://localhost:49652')
    console.log('https://server-restaurant-leocr2015.c9users.io:8080');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
const server = http.createServer(app, (req, res) => {
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
    console.log('https://server-restaurant-leocr2015.c9users.io:8080 !');
}).listen(8080);
var io = require('socket.io')(server);
//https://github.com/FaztTech/jwt-simple-example/blob/master/index.js
// mysql-ctl start