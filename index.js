var request = require('request');
var express = require('express');
var cheerio = require('cheerio');


var app = express();
app.set('port', (process.env.PORT || 8000));

app.get('/', function(req, res) {
    if (!req.query.url) {
        var index = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Nighter</title>
        </head>
        <body>
        <form>
        <input name="url"></input>
        </form>
        </body>
        </html>
        `;
        res.send(index);
    } else {
        request(req.query.url, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body)
                var style = `
                  <style>
                  /* https://lnikki.la/articles/night-mode-css-filter/ */
                  html, img, video {
                      -webkit-filter: invert(1) hue-rotate(180deg);
                      filter: invert(1) hue-rotate(180deg);
                  }

                  body {
                      background: black;
                  }
                  </style>
                  `;

                $('head').append(style);
                res.send($.html());
            }
        })
    }
});


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
