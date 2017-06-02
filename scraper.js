//=============================
//  scraper.js
//  project:    fsjsProject06
//  author:     Doug Hawkinson
//  date:       05/27/2017
//  purpose:    the project centerpiece
//
//=============================

//=============================
//  (X)  1. create a scraper.js file - you are in it.

//  (X)  2. open folder "data" within the project site - if it doesn't exist, create and open, if it does, open

//  (X)  3. choose two packages and make them dependencies
//            Scraper package
//            CSV builder package

//  (X)  4. use http://shirts4mike.com/shirts.php as single entry point to scrape

//  (X)  5. Scraping and saving data
//            get the price, title, url and image url from the product page
//            store in a CSV file that is named for the date it was created, e.g. 2016-11-21.csv
//            rearrange column headers in the CSV. They should be in this order: Title, Price, ImageURL, URL, and Time

//  (X)  6. The CSV file should be saved inside the ‘data’ folder -- use a destructive save

//  (X)  7. Error handling

//================================
//  Extra Credit
//================================
//
//  ( )  a. Edit your package.json file so that your program runs when the npm start command is run

//  (X)  b. append to the bottom of the  scraper-error.log file with a time stamp and error
//            e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)]
//
//================================

//      primary modules
const fs           = require('fs');                 //  file system module
const http         = require('http');               //  http module
const process      = require('process');            //  process module
const querystring  = require('querystring');        //  querystring parser

//      npm  modules (selected packages - req 3)        Stats as of (5/27/17) - last published / downloads
const osmosis      = require('osmosis');            //  scraper module - 2 months ago / 2,055 last month
const json2csv     = require('json2csv');           //  csv builder - 6 months ago / 154,004 last month

const dir       = process.cwd()+'/data';                            //  data directory (CSVs are loaded here)
const baseUrl   = 'http://www.shirts4mike.com/';                    //  base URL for the scrape
const fields    = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];    //  column heads
const shirts    = [];                                               //  initialize an array to carry the shirts

let today       = '', now = '';                                     //  initialize
let errMsg      = '';

//================================
// check if a directory exists else create it - Req 2
//================================

function checkDir() {
    let dirFound = fs.existsSync(dir);
    if ( !dirFound ) {
        fs.mkdirSync(dir);
        console.log('Directory "data" created')
    }
}


//===============================
//  date converter -- it makes the dates/times specific to the time zone in which the program is executed
//===============================

function dateConvert() {
    const d = new Date();
    let mm = d.getMonth()+1;
    if ( mm < 10 ) { mm = '0' + mm}
    let dd = d.getDate();
    if ( dd < 10 ) { dd = '0'+ dd}
    let hh = d.getHours();
    if ( hh < 10 ) { hh = '0' + mm}
    let mn = d.getMinutes();
    if ( mn < 10 ) { mn = '0'+ mn}
    let ss = d.getSeconds();
    if ( ss < 10 ) { ss = '0' + ss};
    let ms = d.getMilliseconds();
    now = d.getFullYear()+'-'+ mm +'-'+ dd + ' ' + hh + ':' + mn + ':' + ss + '.' + ms;
    return now;
}

//===============================
//Handle HTTP GET
//===============================
function scrapeSite() {
    const now = dateConvert();
    osmosis
        .get(baseUrl + 'shirts.php')                     // Connect to main site (req 4)
        // scrape the data (req 5)
        .set({'URL': '.shirts a@href'})                  // Set Shirt Url - must be here, not available after '.follow'
        .follow('.products a@href')                      // Iterate through the links
        .set({                                           // Set the variables
            'Title'     : '.shirt-picture @alt',             // Title
            'Price'     : '.price',                          // Price
            'ImageURL'  : 'img @src',                        // Shirt image Url
        })
        // Format object and push to shirts Array
        .data(function(properties) {
            properties.ImageURL = baseUrl + properties.ImageURL;
            properties.URL = baseUrl + properties.URL;
            properties.Time = now;
            
            shirts.push(properties);
        })
        .error("Connection Failed ");
//================================
// osmosis needs time to complete - delay file processing
//================================
    
    setTimeout(function(){buildCSV()},1000);
}

//=================================
// Function to build CSV file (req 6)
//=================================

function buildCSV() {
    // Generate CSV Object
    today = dateConvert().substring(0,10);
    let result = '';
    try {
        result = json2csv({ data: shirts, fields: fields });
    } catch (err) {
        // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        // Be sure to provide fields if it is possible that your data array will be empty.
        errorHandler(err);
    }
    
    // Checking if shirts Array has objects in it or calling an errorHandler
    if (shirts.length > 0) {
        checkDir();
        fs.writeFile('data/' + today + '.csv', result, (err) => {
            if (err) throw err;
            console.log('file saved');
        });
    } else {
        errMsg = 'Parsing error: Shirts not loaded:';
        errorHandler(errMsg);
    }
}

//================================
// Error Logging function (req 7)
//================================
function errorHandler(comment) {
    let time = new Date();
    
    // Writes file to error log     (extra credit item b)
    fs.appendFile('scraper-error.log', time + ' ' + comment + '\n', function(err) {
        if (err) throw err;
        console.log('Error logged to scraper-error.log');
    });
}

//================================
//  get 'er done
//================================

scrapeSite();


