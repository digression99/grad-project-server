const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const chalk = require('chalk');
const compression = require('compression');
const errorHandler = require('errorhandler');

// aws library
const {
    createBlacklistCollection,
    rekognitionListCollections
} = require('./lib/index');

// environment load
dotenv.load({path : '.env.development'});

// custom include

// database setting
require('./config/mongoose');

// amazon web service setting
require('./config/aws');

// include api
const api = require('./api/index');

// app setting
const app = express();
// middleware.
app.use(bodyParser.json({
    limit : '50mb'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(compression());
if (app.get('env') === 'development') app.use(errorHandler());
app.use(api);
//
// (new Promise(async (resolve, reject) => {
//     try {
//         // create blacklist collection
//         const result = await rekognitionListCollections();
//         // search blacklist collection
//         const isBlacklistMade = result.includes("blacklist-collection");
//
//         if (!isBlacklistMade) {
//             await createBlacklistCollection();
//         }
//         resolve();
//     } catch (e) {
//         reject(e);
//         // throw new Error(e);
//     }
// }))()
//     .then(() => {
//         // universal router
//         app.get('*', (req, res) => {
//             res.send('index.html');
//         });
//
//         app.listen(app.get('port'), () => {
//             console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
//             console.log('  Press CTRL-C to stop\n');
//         });
//     })
//     .catch(e => console.log(e));

module.exports = app;


