//=============================
//  errorhandler.js
//  project:    fsjsProject06
//  author:     Doug Hawkinson
//  date:       05/27/2017
//  purpose:    performs the error handling functions
//
//=============================

const fs           = require('fs');                 //  file system module

// Error Logging function
function errorHandler(comment) {
    let time = new Date();
    
    // Writes file to error log
    fs.writeFile('scraper-error.log', comment + ' ' + time, function(err) {
        if (err) throw err;
        console.log('Connection error logged to scraper-error.log');
    });
}


module.exports.errorHandler = errorHandler
;