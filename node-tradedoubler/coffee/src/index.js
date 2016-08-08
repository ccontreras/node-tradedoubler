var TOKEN, Tradedoubler, error, error1, fs, td;

TOKEN = '44D41DD809F1C630E9A99E6A8F244E963012FDA2';

Tradedoubler = require('./tradedoubler');

td = new Tradedoubler(TOKEN);

fs = require('fs');

try {
  td.request('products.categories', null, function(err, res) {
    if (err != null) {
      console.log("Error: " + err.message);
      return;
    }
    return console.log(res.body);
  });
} catch (error1) {
  error = error1;
  console.log(error);
}
