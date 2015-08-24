module.exports = function(grunt) {

    var Base64 = require('./js/vendor/base64.js').Base64;

    var appjs = grunt.file.read('./js/splendidmoons.js');
    appjs = appjs.split('/* === js template split === */');

    var css_data = Base64.encode(grunt.file.read('./css/splendidmoons.css'));
    var templates_data = Base64.encode(grunt.file.read('./templates.html'));
    var days_data = Base64.encode(grunt.file.read('./data/days.json'));

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
			      dist: {
				        options: {
					          stripbanners: true,
                    separator: ';\n',
                    footer: appjs[0] + css_data + appjs[1] + templates_data + appjs[2] + days_data + appjs[3]
				        },
				        src: ['./js/vendor/underscore-1.8.3.min.js', './js/vendor/backbone-1.2.1.min.js', './js/vendor/base64.js'],
				        dest: './build/splendidmoons.min.js'
			      }
        },

        uglify: {
            minimize: {
                options: {
                    preserveComments: false,
                    mangle: true
                },
                src: './build/splendidmoons.min.js',
                dest: './splendidmoons.min.js'
            }
        },

        jshint: {
            files: ['Gruntfile.js', './js/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },

        clean: {
            build: "./build"
        },

        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    style: 'compressed',
                    compass: true
                },
                files: {
                    'css/splendidmoons.css': '_sass/splendidmoons.sass'
                }
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: [
              //'jshint',
              //'sass:dist',
              'concat:dist',
              'uglify',
              'clean'
            ],
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');// Not grunt-sass (libsass). Need Compass support for font-inlining.

    grunt.registerTask('default', [
        //'jshint',
        //'sass:dist',
        'concat:dist',
        'uglify',
        'clean'
    ]);

};
