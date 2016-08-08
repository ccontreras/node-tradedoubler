var API, Products, Tradedoubler, _;

Products = require('./api/products');

API = require('./api/baseApi');

_ = require('lodash');

Tradedoubler = (function() {
  Tradedoubler.prototype.endpoint = 'https://api.tradedoubler.com/1.0';

  Tradedoubler.prototype.apis = [];

  function Tradedoubler(token) {
    this.token = token;
    this.setDefaultAPIs();
  }

  Tradedoubler.prototype.setDefaultAPIs = function() {
    return this.apis.push({
      products: new Products(this.endpoint, this.token)
    });
  };

  Tradedoubler.prototype.request = function(path, params, cb) {
    var api, parts;
    path = _.toLower(path);
    parts = path.split('.');
    if (parts.length >= 2) {
      api = _.find(this.apis, function(o) {
        return _.has(o, parts[0]);
      });
      if (!_.isUndefined(api)) {
        return api[parts[0]].call(parts[1], params, cb);
      } else {
        throw new Error("API " + api + " not found");
      }
    } else {
      throw new Error('The path must have at least 2 parts.');
    }
  };

  Tradedoubler.prototype.registerAPI = function(key, api) {
    if (!api instanceof API) {
      throw new Error('The new API must extend from API');
    }
    return this.apis.push({
      key: api
    });
  };

  return Tradedoubler;

})();

module.exports = Tradedoubler;
