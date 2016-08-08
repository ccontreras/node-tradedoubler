var BaseAPI, _, querystring, request;

request = require('superagent');

querystring = require('querystring');

_ = require('lodash');


/*
Base API class.

@author Cesar Contreras <ccdl15c@gmail.com>
 */

BaseAPI = (function() {
  BaseAPI.prototype.methods = {};

  function BaseAPI(endpoint, token) {
    this.endpoint = endpoint;
    this.token = token;
    this.init();
  }

  BaseAPI.prototype.init = function() {};


  /*
  Calls an API method.
  
  @param    {string}     method    The api method name.
  @param    {array}      params    An array with paramaters to be sent.
  @param    {callback}   cb        A callback to be executed after api call.
  @throws   {Error}
   */

  BaseAPI.prototype.call = function(method, params, cb) {
    var settings, url;
    method = _.toLower(method);
    if (this.isMethodAvailable(method)) {
      settings = this.methods[method];
      url = "" + this.endpoint + settings.path;
      return this.performRequest(url, settings.method, params, cb);
    } else {
      throw new Error("Method '" + method + "' is not available.");
    }
  };


  /*
  Checks if the API has the requested method.
  
  @param   {string}    method   The method name.
  @return  {boolean}
   */

  BaseAPI.prototype.isMethodAvailable = function(method) {
    return _.has(this.methods, method);
  };


  /*
  Performs a request against the API.
  
  @param   {string}     url      The endpoint.
  @param   {string}     method   The HTTP request method.
  @param   {array}      params   An array of paramaters to be sent.
  @param   {callback}   cb       A function that will be call after request is performed.
  @throws  {Error}
   */

  BaseAPI.prototype.performRequest = function(url, method, params, cb) {
    var req;
    method = _.toLower(method);
    req = null;
    if (method === 'get' || method === 'delete') {
      url += this.asQuery(params);
    }
    url += "?token=" + this.token;
    switch (method) {
      case 'get':
        req = request.get(url);
        break;
      case 'delete':
        req = request.del(url);
        break;
      case 'post':
      case 'put':
        req = request(method, url);
        req.send(params);
        break;
      default:
        throw new Error("Method '" + method + "' not supported");
    }
    return req.end(cb);
  };


  /*
  Retrieves an array of params as query string.
  NOTE: This use matrix syntax {@link http://www.w3.org/DesignIssues/MatrixURIs.html}.
  
  @param    {array}    params - The array of params.
  @return   {string}            the query string.
   */

  BaseAPI.prototype.asQuery = function(params) {
    if ((params != null) && _.size(params) > 0) {
      return ';' + querystring.stringify(params, ';');
    } else {
      return '';
    }
  };

  return BaseAPI;

})();

module.exports = BaseAPI;
