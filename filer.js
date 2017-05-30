//=============================
//  filer.js
//  project:    fsjsProject06
//  author:     Doug Hawkinson
//  date:       05/27/2017
//  purpose:    performs file handling functions
//
//=============================

const process   = require('path');                                  //  process module
const json2csv  = require('json2csv');                              //  csv builder - 6 months ago / 147,201 last month

const dir       = process.cwd() + '/data';                          //  data directory (CSVs are loaded here)
const colHeads  = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];    //  column heads
const shirts    = [];                                               //  initialize an array to carry the shirts


// check if a directory exists else create it
function checkDir(dir) {
    try {
        fs.existsSync(dir);
        console.log(dir + ' exists')
    } catch(e) {
        fs.mkdirSync(dir);
        console.log(e + ' directory created')
    }
}

// Function to build CSV file
function buildCSV() {
    // Get and format date for file
    let today = new Date();
    // Year - Month is zero indexed so I added +1 - Day
    today = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    
    // Generate CSV Object
    //let csv = csv({ data: shirtsArray, fields: fields });
    let csv = json2csv({ data: shirts, fields: colHeads });
    
    // Osmosis does not have correct error handling yet
    // Checking in shirtsArray has objects in it or calling a connectionError
    if (shirts.length > 0) {
        checkDir("./data");
        fs.writeFile('data/' + today + '.csv', csv, function (err) {
            if (err) throw err;
            console.log('file saved');
        });
    } else errorHandler('Parsing Failed')

}
// Delaying CSV function by 1s to allow osmosis to finish it's background work
/* Callbacks do not work correctly so I'm using this until the issue has been fixed
 by the devs */
setTimeout(function(){buildCSV()},1000);


module.exports.buildCSV = buildCSV;