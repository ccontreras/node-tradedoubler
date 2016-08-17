module.exports = (grunt) ->

    grunt.initConfig
        watch:
            files: ['src/**/*.coffee']
            tasks: ['coffee']
        coffee:
            default:
                options:
                    bare: true
                expand: true
                cwd: 'src'
                src: ['**/*.coffee']
                dest: 'lib'
                ext: '.js'

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-coffee'

    grunt.registerTask 'default', ['coffee']
