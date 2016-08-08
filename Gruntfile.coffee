module.exports = (grunt) ->

    grunt.initConfig
        watch:
            files: ['src/**/*.coffee']
            tasks: ['coffee']
        copy:
            default:
                files: [
                    {
                        expand: true
                        src: ['compile/src/*']
                        dest: 'dist/'
                    }
                ]
        coffee:
            default:
                options:
                    bare: true
                expand: true
                src: ['coffee/src/**/*.coffee']
                dest: './src'
                ext: '.js'

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-coffee'

    grunt.registerTask 'default', ['coffee', 'copy']
