TOKEN = '44D41DD809F1C630E9A99E6A8F244E963012FDA2'

Tradedoubler = require './tradedoubler'
td = new Tradedoubler TOKEN
fs = require 'fs'

try
    td.request 'products.categories', null, (err, res) ->
        if err?
            console.log "Error: #{err.message}"
            return

        console.log res.body
catch error
    console.log error
