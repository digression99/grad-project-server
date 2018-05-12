const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const chalk = require('chalk');
const compression = require('compression');
const errorHandler = require('errorhandler');
// environment load
dotenv.load({path : '.env.development'});
// app setting
const app = express();

// aws library
const {
    createBlacklistCollection,
    rekognitionListCollections
} = require('./lib');

// database setting
require('./config/mongoose');

// amazon web service setting
require('./config/aws');

// need to include firebase.

// include api
const api = require('./api/index');
// middleware.
app.use(bodyParser.json({
    limit : '50mb'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(compression());
if (app.get('env') === 'development') app.use(errorHandler());
app.use(api);

// universal router
app.get('*', (req, res) => {
    res.send('index.html');
});

(() => new Promise(async (resolve, reject) => {
    try {
        // console.log(process.env.AWS_REGION);

        // create blacklist collection
        const result = await rekognitionListCollections();
        console.log('list collections : ');
        console.log(result);
        // search blacklist collection
        const isBlacklistMade = result.includes("blacklist-collection");

        if (!isBlacklistMade) {
            await createBlacklistCollection();
        }
        console.log('blacklist collection created.');
        resolve();
    } catch (e) {
        reject(e);
        // throw new Error(e);
    }
}))()
    .then(() => {
        console.log('app starting.');
        // app.listen(app.get('port'), () => {
        //     console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
        //     console.log('  Press CTRL-C to stop\n');
        // });
    })
    .catch(e => console.log(e));

process.on('uncaughtException', (e) => {
    console.log('error occured.');
    console.log(e);
    process.exit(0);
});

module.exports = app;


