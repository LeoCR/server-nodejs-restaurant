var express = require('express'),
path = require('path'), 
app = express(),
http = require('http'),
bodyParser = require('body-parser'),
compression = require('compression'),
cors = require('cors'),
multer = require('multer'),
router = express.Router(),
methodOverride = require('method-override');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compression());
app.use(cors());
var storage = multer.diskStorage(
    {
        destination: '/home/isplusde/public_html/react-admin-panel/img/uploads/',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, file.originalname);
        }
    }
);

var upload = multer({ storage: storage });
app.set('port', 49652); 
app.get(['/strongs-dishes','/','/private/','/strong-dish','/add/strong-dish','/entrees','/strong-dish','/add/entree','/edit/strong-dish/*','/edit/entree/*','/edit/entree'], function (req, res) {  
  res.sendFile(path.join('/home/isplusde/public_html/react-admin-panel/build/index.html'));
});
app.use(express.static('/home/isplusde/public_html/react-admin-panel/build'));
///img/uploads/entrees/
require('./app/route/strongDish.route.js')(app,router,upload);
require('./app/route/entree.route.js')(app,router,upload);

app.use(methodOverride());
app.use(function(err, req, res, next) {
  res.send('An error occurs: '+err);
});
app.use('/img/entrees/',express.static('/home/isplusde/public_html/react-admin-panel/img/entrees'))
app.use('/img/',express.static('/home/isplusde/public_html/react-admin-panel/img'));
app.use('/img/uploads/',express.static('/home/isplusde/public_html/react-admin-panel/img/uploads'));

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
    console.log('https://isplusdesign.co.cr:49652 !');
}).listen(49652);