'use strict';

import config from '../config';
import gulp   from 'gulp';
import del    from 'del';
import gutil from 'gulp-util';
import underscore    from 'underscore';
import underscoreStr    from 'underscore.string';
import concat    from 'gulp-concat';
import browserSync  from 'browser-sync';

var exclude = ['lib1', 'lib2'];

gulp.task('bowerize', function() {



  var bowerFile = require('../../bower.json');
  var bowerPackages = bowerFile.dependencies;
  var bowerDir = '../../'+config.bower.folderdir;
  var packagesOrder = [];
  var mainFiles = [];

  //console.log('dependencies: '+bowerFile);

  // Function for adding package name into packagesOrder array in the right order
  function addPackage(name){
    console.log('add package: '+name);
    // package info and dependencies
    var info = require(bowerDir + '/' + name + '/bower.json');
    var dependencies = info.dependencies;
    
    // add dependencies by repeat the step
    if(!!dependencies){
      underscore.each(dependencies, function(value, key){
        if(exclude.indexOf(key) === -1){
          addPackage(key);
        }
      });
    }


    
    // and then add this package into the packagesOrder array if they are not exist yet
    if(packagesOrder.indexOf(name) === -1){
      packagesOrder.push(name);
    }
  }

  // calculate the order of packages
  underscore.each(bowerPackages, function(value, key){
    if(exclude.indexOf(key) === -1){ // add to packagesOrder if it's not in exclude
      addPackage(key);
    }
  });

  // get the main files of packages base on the order
  underscore.each(packagesOrder, function(bowerPackage){
    var info = require(bowerDir + '/' + bowerPackage + '/bower.json');
    var main = info.main;
    var mainFile = main;

    // get only the .js file if mainFile is an array
    if(underscore.isArray(main)){
      underscore.each(main, function(file){
        if(underscoreStr.endsWith(file, '.js')){
          mainFile = file;
        }
      });
    }

    // make the full path
    mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;



    // only add the main file if it's a js file
    if(underscoreStr.endsWith(mainFile, '.js')){
      mainFiles.push(mainFile);
    }

    

  });

  


  // run the gulp stream
  return gulp.src(mainFiles)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('../../build'))
    .on('end', function(){ gutil.log('That"s ok...'); })
    .pipe(browserSync.stream({ once: true }));
});