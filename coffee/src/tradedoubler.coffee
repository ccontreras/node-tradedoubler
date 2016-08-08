Products = require './api/products'
API      = require './api/baseApi'
_        = require 'lodash'

class Tradedoubler

    endpoint: 'https://api.tradedoubler.com/1.0'
    apis: []

    constructor: (@token) ->
        @setDefaultAPIs()

    setDefaultAPIs: ->
        @apis.push
            products: new Products @endpoint, @token

    request: (path, params, cb) ->
        path = _.toLower path
        parts = path.split '.'

        if parts.length >= 2
            api = _.find @apis, (o) -> _.has o, parts[0]

            if not _.isUndefined api
                api[parts[0]].call parts[1], params, cb
            else
                throw new Error "API #{api} not found"
        else
            throw new Error 'The path must have at least 2 parts.'

    registerAPI: (key, api) ->
        if not api instanceof API
            throw new Error 'The new API must extend from API'

        @apis.push key: api


module.exports = Tradedoubler
