// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", (req, res) => {
  let myDate = req.params.date;
  console.log(myDate);
  if (/\d\d\d\d-\d\d-\d\d/.test(myDate)) {
    myDate = new Date(myDate);
    res.json({ unix: myDate.valueOf(), utc: myDate.toUTCString() })
  } else if (Number(myDate)) {
    myDate = Number(myDate);
    res.json({ unix: myDate, utc: new Date(myDate).toUTCString() })
  }
  else if (/^\d+\w/.test(myDate)) {
    myDate = new Date(myDate);
    res.json({ unix: myDate.valueOf(), utc: myDate.toUTCString() })
  }

  else {
    res.json({ error: "Invalid Date" })
  }
});
app.get("/api/", (req, res) => {
  res.send({ unix: new Date().valueOf(), utc: new Date().toUTCString() })
})



// listen for requests :)
let port = process.env.PORT || 4000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
  console.log(`\t\thttp://localhost:${port}/`)
});
