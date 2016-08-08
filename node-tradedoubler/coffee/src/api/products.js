var BaseAPI, Products, _,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BaseAPI = require('./baseApi');

_ = require('lodash');

Products = (function(superClass) {
  extend(Products, superClass);

  function Products() {
    return Products.__super__.constructor.apply(this, arguments);
  }

  Products.prototype.init = function() {
    Products.__super__.init.call(this);
    return this.methods = {
      categories: {
        method: 'get',
        path: '/productCategories'
      }
    };
  };

  return Products;

})(BaseAPI);

module.exports = Products;
