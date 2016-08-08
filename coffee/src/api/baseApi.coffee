request     = require 'superagent'
querystring = require 'querystring'
_           = require 'lodash'

###
Base API class.

@author Cesar Contreras <ccdl15c@gmail.com>
###
class BaseAPI

    methods: {}

    constructor: (@endpoint, @token) ->
        @init()

    init: ->

    ###
    Calls an API method.

    @param    {string}     method    The api method name.
    @param    {array}      params    An array with paramaters to be sent.
    @param    {callback}   cb        A callback to be executed after api call.
    @throws   {Error}
    ###
    call: (method, params, cb) ->
        method = _.toLower method

        if @isMethodAvailable method
            settings = @methods[method]
            url = "#{@endpoint}#{settings.path}"

            @performRequest url, settings.method, params, cb
        else
            throw new Error "Method '#{method}' is not available."

    ###
    Checks if the API has the requested method.

    @param   {string}    method   The method name.
    @return  {boolean}
    ###
    isMethodAvailable: (method) ->
        _.has @methods, method

    ###
    Performs a request against the API.

    @param   {string}     url      The endpoint.
    @param   {string}     method   The HTTP request method.
    @param   {array}      params   An array of paramaters to be sent.
    @param   {callback}   cb       A function that will be call after request is performed.
    @throws  {Error}
    ###
    performRequest: (url, method, params, cb) ->
        method = _.toLower method
        req = null

        url += @asQuery params if method is 'get' or method is 'delete'
        url += "?token=#{@token}"

        switch method
            when 'get'    then req = request.get url
            when 'delete' then req = request.del url
            when 'post', 'put'
                req = request method, url
                req.send params
            else
                throw new Error "Method '#{method}' not supported"

        req.end cb

    ###
    Retrieves an array of params as query string.
    NOTE: This use matrix syntax {@link http://www.w3.org/DesignIssues/MatrixURIs.html}.

    @param    {array}    params - The array of params.
    @return   {string}            the query string.
    ###
    asQuery: (params) ->
        if params? and _.size(params) > 0 then ';' + querystring.stringify params, ';' else ''

module.exports = BaseAPI
