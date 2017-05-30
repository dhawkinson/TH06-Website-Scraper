//=============================
//  globals.js
//  project:    fsjsProject06
//  author:     Doug Hawkinson
//  date:       05/27/2017
//  purpose:    centralizes project globals to minimize maintenance
//
//=============================
//  project globals
//=============================

//      primary modules
const fs           = require('fs');                 //  file system module
const http         = require('http');               //  http module
const path         = require('path');               //  path module
const querystring  = require('querystring');        //  querystring parser

//      specific  modules                               Stats as of (5/27/17) - last published / downloads
const osmosis      = require('osmosis');            //  scraper module - 2 months ago / 1,862 last month
const json2csv     = require('json2csv');           //  csv builder - 6 months ago / 147,201 last month
//      project modules
const router       = require('./router.js');        //  routing module
const filer        = require('./filer.js');         //  filer module
const errorhandler = require('./errorhandler.js');  //  error handler


module.exports.fs           = fs;
module.exports.http         = http;
module.exports.path         = path;
module.exports.querystring  = querystring;
module.exports.osmosis      = osmosis;
module.exports.json2csv     = json2csv;
module.exports.router       = router;
module.exports.filer        = filer;
module.exports.errorhandler = errorhandler;