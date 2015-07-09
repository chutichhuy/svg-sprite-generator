module.exports = function(grunt) {
    
    grunt.initConfig({
        exec: { 
            babel: {
                command: 'babel src -d lib',
                stdout: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.registerTask('default', ['exec']);
}
