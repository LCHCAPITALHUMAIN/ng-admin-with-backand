'use strict';

import 'ng-admin';

var myApp = angular.module('myApp', ['ng-admin']);

var apiFlavor = require('./api_flavor');
myApp.config(['RestangularProvider', apiFlavor.requestInterceptor]);
myApp.config(['RestangularProvider', apiFlavor.responseInterceptor]);


// custom directives
myApp.directive('approveReview', require('./reviews/approveReview'));
myApp.directive('batchApprove', require('./reviews/batchApprove'));
myApp.directive('starRating', require('./reviews/starRating'));

// custom controllers
myApp.controller('username', ['$scope', '$window', function($scope, $window) { // used in header.html
    $scope.username =  $window.localStorage.getItem('posters_galore_login');
}])


myApp.constant('AppSettings', require('./constants'));
myApp.config(require('./on_config'));
myApp.run(require('./on_run'));


myApp.config(['NgAdminConfigurationProvider', function (nga) {
    // create an admin application
    var admin = nga.application('Backand with NG-ADMIN')
      .baseApiUrl('https://api.backand.com/1/objects/'); // main API endpoint
    
    // // add entities
    admin.addEntity(nga.entity('users'));   
    admin.addEntity(nga.entity('items'));

    require('./entities/users/config')(nga, admin);
    require('./entities/items/config')(nga, admin);   
        
    admin.menu(nga.menu()
        .addChild(nga.menu(nga.entity('users')).icon('<span class="glyphicon glyphicon-user"></span>'))
        .addChild(nga.menu(nga.entity('items')).icon('<span class="glyphicon glyphicon-pencil"></span>'))
    );

    
    
    //nga.entity('users').batchActions(['delete', '<my-custom-directive entries="selection"></my-custom-directive>']);


    require('./admin_layout')(nga, admin);
    
    nga.configure(admin);
}]);
