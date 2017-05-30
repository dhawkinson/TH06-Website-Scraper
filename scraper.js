//=============================
//  scraper.js
//  project:    fsjsProject06
//  author:     Doug Hawkinson
//  date:       05/27/2017
//  purpose:    the project centerpiece
//
//=============================

const globals = require('./globals.js')                      //  grab project globals

//=============================
//  1. create a scraper.js file - you are in it.

//  2. open folder "data" within the project site - if it doesn't exist, create and open, if it does, open

//  3. choose two packages and make them dependencies
//      Scraper package
//      CSV builder package

//  4. use http://shirts4mike.com/shirts.php as single entry point to scrape

//  5. Scraping and saving dats
//      get the price, title, url and image url from the product page
//      store in a CSV file that is named for the date it was created, e.g. 2016-11-21 .csv
//      rearrange column headers in the CSV. They should be in this order: Title, Price, ImageURL, URL, and Time

//  6. The CSV file should be saved inside the ‘data’ folder -- use a destructive save

//  7. Error handling

//================================
//  Extra Credit
//================================
//
//  1. Edit your package.json file so that your program runs when the npm start command is run

//  2. append to the bottom of the  scraper-error.log file with a time stamp and error
//      e.g. [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)]
//
//================================

const http     = require('http');           //  http module
console.log(requires);

const hostname = '127.0.0.1';               //  localhost
const port     = 3000;                      //  port 3000

//================================
//  Create HTTP server
//================================
const server = http.createServer((request, response) => {
    router.scrapeSite(request, response);
    console.log(request);
    console.log(response);
});

console.log(server);

//  listen at hostname on port
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


