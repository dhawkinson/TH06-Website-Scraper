//=============================
//  router.js
//  project:    fsjsProject06
//  author:     Doug Hawkinson
//  date:       05/27/2017
//  purpose:    handles the routing functions
//
//=============================

const osmosis      = require('osmosis');            //  scraper module - 2 months ago / 1,862 last month

//Handle HTTP route GET
function scrapeSite() {
    osmosis
    // Connecting to main site
        .get('http://www.shirts4mike.com/shirts.php')
        // Setting URL variable in Object
        .set({'URL': '.products a@href'})
        // Iterating through the shirt links
        .follow('.products a@href')
        // Setting More variables
        .set({
            'Title':'.shirt-picture @alt',
            'Price': '.price',
            'ImageURL': 'img @src',
        })
        // Formatting object and pushing to shirts Array
        .data(function(listing) {
            listing.ImageURL = 'http://www.shirts4mike.com/' + listing.ImageURL;
            listing.URL = 'http://www.shirts4mike.com/' + listing.URL;
            listing.Time = new Date();
            shirts.push(listing);
        })
        .error("Interwebs Broken, Connection Failed :-( ");
}


module.exports.scrapeSite = scrapeSite;












