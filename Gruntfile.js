var path = require('path');
var fs = require('fs');
module.exports = function(grunt) {
	// Project configuration.
	var entpkgpath = path.join(__dirname, 'node-ent/package.json');
	var pkgjson = require(entpkgpath);
	if (!pkgjson.guid) {
		console.log('writing guid to node-ent/package.json...');
		pkgjson.guid = '361b0272-c428-d5b3-cd23-919fdbc2fe35';
	}
	fs.writeFileSync(entpkgpath, JSON.stringify(pkgjson));

	grunt.initConfig({
		titaniumifier: {
			"module": {
				files: {
					'./commonjs/dist': path.join(__dirname, 'node-ent')
				},
				options: {
					guid: '51d71d1d-9b0e-ad82-41f4-87fe0eb89df3',
					// You can create a CommonJS module **without** the dependencies bundled
					bare: false
				}
			}
		},
	});
	grunt.loadNpmTasks('grunt-titaniumifier');
	grunt.registerTask('titaniumify', ['titaniumifier']);
};