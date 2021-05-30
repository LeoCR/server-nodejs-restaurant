const express = require('express'),
path = require('path'), 
app = express(),
bodyParser = require('body-parser'),
compression = require('compression'),
multer = require('multer'), 
methodOverride = require('method-override'),
exphbs  = require('express-handlebars'),
passport = require('passport'),
cors = require('cors'),
session = require('express-session'),
fs = require('fs'),
https = require('https'),
rootCas = require('ssl-root-cas/latest').create(),
storage = multer.diskStorage(
  {
      destination: path.resolve(__dirname+'/../public/img/uploads/'),
      filename:  ( req, file, cb ) =>{
          //req.body is empty...
          //How could I get the new_file_name property sent from client here?
          cb( null, file.originalname);
      }
  }
), 
upload = multer({ storage: storage }),
models = require(path.resolve(__dirname+"/app/db/config/config.js"));
/**
 * @see https://github.com/axios/axios/issues/535
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const isLoggedIn=(req, res, next)=>{
  if (req.isAuthenticated()){
      return next();
  }
  else{
      res.redirect('/admin/signin');
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
passport.serializeUser((user, done)=> {
  done(null, user);
});
passport.deserializeUser((obj, done)=> {
  done(null, obj);
});

app.use(compression());
app.use(methodOverride());
app.use((err, req, res, next)=> {
  res.send('An error occurs: '+err);
});

app.set('views', path.resolve(__dirname+'/app/views'))
app.engine('html', exphbs({
    extname: '.html'
}));
app.set('view engine', '.html');
app.get('/validate/authentication',(req,res)=>{
  if (req.isAuthenticated()){
    res.json({isAuthenticated:true});
  }
  else{
    res.json({isAuthenticated:false});
  }
});

require(path.resolve(__dirname+'/app/route/public.route.js'))(app,express,path);
require(path.resolve(__dirname+'/app/route/private.route.js'))(app,express,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/strongDish.route.js'))(app,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/entree.route.js'))(app,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/ingredient.route.js'))(app,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/dessert.route.js'))(app,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/user.route.js'))(app,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/invoice.route.js'))(app,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/drink.route.js'))(app,upload,path,isLoggedIn);
require(path.resolve(__dirname+'/app/route/auth.route.js'))(app,passport,path); 
//load passport strategies
require(path.resolve(__dirname+'/app/db/config/passport/passport.js'))(passport, models.user);
require('https').globalAgent.options.ca = rootCas;
app.route('/logout').get((req,res)=>{
    req.session.destroy();
    req.logout();
    res.redirect('/admin/signin');
})
/**
 * https Options
 * @see https://ksearch.wordpress.com/2017/08/22/generate-and-import-a-self-signed-ssl-certificate-on-mac-osx-sierra/
 * @see https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec
 * @see https://stackoverflow.com/questions/21397809/create-a-trusted-self-signed-ssl-cert-for-localhost-for-use-with-express-node
 * 
 */
const httpsOptions = {
    key: fs.readFileSync('/Users/leo/Documents/server-restaurant-admin/private/security/cert.key'),
    cert: fs.readFileSync('/Users/leo/Documents/server-restaurant-admin/private/security/cert.pem')
}
//Sync Database
models.sequelize.sync().then(function() {
    console.log('https://localhost:49658 works')
}).catch((err)=> {
    console.log(err, "Something went wrong with the Database Update!")
});
https.createServer(httpsOptions,app, (req, res) => {
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
    console.log('https://localhost:49658 !');
}).listen(49658);