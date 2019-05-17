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
FacebookStrategy= require('passport-facebook'),
fs = require('fs'),
https = require('https'),
db = require(path.resolve(__dirname+'/app/db/config/config.js')),
User = db.user;
var fbOpts={
  clientID: '1000175700179103',
  clientSecret: 'a9a5309580a601253cd18a4d23bfdf26',
  callbackURL: "https://localhost:49652/auth/facebook/callback",
  enableProof: true,
  profileFields: ['id', 'displayName', 'photos', 'emails']
};
var fbCallback=function(accessToken, refreshToken, profile, done) {
  console.log('accessToken', accessToken);
  console.log('refreshToken', refreshToken);
  console.log('profile',profile);
  var email=profile.emails[0].value;
  console.log('profile.emails[0].value '+email);
  User.findOne({ where: {email} }).then(user => {
    // project will be the first entry of the Projects table with the title 'aProject' || null
    if(user){
      console.log(user)
    }
    else{
        console.log({user:null});
    }
}) 
  done(null, profile);
};
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
//Models
var models = require(path.resolve(__dirname+"/app/db/config/config.js"));
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/');
  }
}
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// For Passport
app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy(fbOpts,fbCallback)); 
app.use(compression());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.send('An error occurs: '+err);
});
//For Handlebars
app.get('/auth/facebook', passport.authenticate('facebook',{scope:['email']}));
/* 
    Facebook will redirect the user to this URL after approval.  Finish the
 authentication process by attempting to obtain an access token.  If
 access was granted, the user will be logged in.  Otherwise,
 authentication has failed.
*/
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login',scope: ["email"] }));
app.set('views', path.resolve(__dirname+'/app/views'))
app.engine('html', exphbs({
    extname: '.html'
}));
app.set('view engine', '.html'); 
app.get('/validate/authentication',function(req,res){
  if (req.isAuthenticated()){
    res.json({isAuthenticated:true});
  }
  else{
    res.json({isAuthenticated:false});
  }
});

require(path.resolve(__dirname+'/app/route/public.route.js'))(app,express,path);
require(path.resolve(__dirname+'/app/route/private.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/strongDish.route.js'))(app,router,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/entree.route.js'))(app,router,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/ingredient.route.js'))(app,router,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/dessert.route.js'))(app,router,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/user.route.js'))(app,router,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/drink.route.js'))(app,router,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/auth.route.js'))(app,passport,path); 
//load passport strategies
require(path.resolve(__dirname+'/app/db/config/passport/passport.js'))(passport, models.user);
app.route('/logout').get(function(req,res){
    req.session.destroy();
    req.logout();
    res.redirect('/');
})
/**
 * https Options
 * @see https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
 */
const httpsOptions = {
    key: fs.readFileSync('/Users/leo/Documents/server-restaurant-admin/private/security/server.key'),
    cert: fs.readFileSync('/Users/leo/Documents/server-restaurant-admin/private/security/server.crt')
}
//Sync Database
models.sequelize.sync().then(function() {
    console.log('https://localhost:49652 works')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});

const server=https.createServer(httpsOptions,app, (req, res) => {
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
    console.log('https://localhost:49652 !');
}).listen(49652);
var io = require('socket.io')(server);
