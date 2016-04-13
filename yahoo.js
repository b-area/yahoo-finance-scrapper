var express = require('express');
var cheerio = require('cheerio');
var fs      = require('fs');
var request = require('request');

var app = express();
var PORT_NUMBER = 7070;

var yahoo_finance_url = "http://finance.yahoo.com/q?s=aapl";

app.get('/stock', function(req, res){

  request(yahoo_finance_url, function(error, response, html)
	{
      var $ = cheerio.load(html);
      var stock = $('.rtq_div');
      var price  = stock.find('.time_rtq_ticker').text();
      console.log(price);
      //To take a look at the HTML code: use htlm() function
      var infos = {"price": price, "code": "AAPL"};
      res.send(infos);
  });

});

app.listen(PORT_NUMBER);
console.log('Navigate to http://localhost:'+ PORT_NUMBER + '/');
exports = module.exports = app;
