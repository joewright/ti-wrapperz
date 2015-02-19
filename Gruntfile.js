var path = require('path');
var fs = require('fs');
module.exports = function(grunt) {
	// Project configuration.
	[{
		uuid: '51d71d1d-9b0e-ad82-41f4-87fe0eb89df3',
		pth: 'node-ent'
	}, {
		uuid: 'f8ccf85f-67fb-4d40-b798-acb466f8a850',
		pth: 'node-sql'
	}].forEach(function(project) {
		var entpkgpath = path.join(__dirname, project.pth, 'package.json');
		var pkgjson = require(entpkgpath);
		if (!pkgjson.guid) {
			console.log('writing guid to', entpkgpath);
			pkgjson.guid = '361b0272-c428-d5b3-cd23-919fdbc2fe35';
		}
		fs.writeFileSync(entpkgpath, JSON.stringify(pkgjson));
		if (!fs.existsSync(path.join(__dirname, project.pth, 'node_modules'))) {
			// npm install
		}
	});

	grunt.initConfig({
		titaniumifier: {
			"node-ent": {
				files: {
					'./commonjs/dist': path.join(__dirname, 'node-ent')
				},
				options: {
					guid: '51d71d1d-9b0e-ad82-41f4-87fe0eb89df3',
					// You can create a CommonJS module **without** the dependencies bundled
					bare: false
				}
			},
			"node-sql": {
				files: {
					'./commonjs/dist': path.join(__dirname, 'node-sql')
				},
				options: {
					guid: 'f8ccf85f-67fb-4d40-b798-acb466f8a850',
					bare: false
				}
			}
		},
	});
	grunt.loadNpmTasks('grunt-titaniumifier');
	grunt.registerTask('titaniumify', ['titaniumifier']);
};