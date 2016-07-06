'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const logger = require('./utils/logger');
const hbsKit = require('./kits/hbs_kit');

const app = express();

//# app views setting
//
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

//# hbs setting
//
hbs.registerPartials(__dirname + '/views');
hbs.localsAsTemplateData(app);
hbsKit.registerHelper(hbs);
app.set('view options', {
    layout: 'layouts/default'
});

//# static setting
//
app.use(express.static(__dirname + '/public'));

//# body parser setting
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//# router setting
//
app.use(require('./routers'));

app.listen('4000', function() {
    logger.info('app start 4000');
});
