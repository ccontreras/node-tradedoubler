BaseAPI = require './baseApi'
_ = require 'lodash'

class Products extends BaseAPI

    init: ->
        super()

        @methods =
            categories:
                method: 'get'
                path: '/productCategories'

module.exports = Products
