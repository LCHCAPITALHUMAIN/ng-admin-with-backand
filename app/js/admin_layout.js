'use strict';

export default function (nga, admin) {

	var layout = '<div id="wrapper">'+
    '<nav id="header-nav" class="navbar navbar-inverse navbar-static-top" role="navigation">'+
        '<span compile="::appController.header">'+
        '<div class="navbar-header">'+
            '<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
                '<span class="icon-bar"></span>'+
            '</button>'+
            '<a href="#" ng-click="appController.displayHome()" class="navbar-brand">{{ ::appController.applicationName }}</a>'+
        '</div>'+
        '</span>'+
    '</nav>'+
    '<div id="page-wrapper">'+
        '<div class="row">'+
            '<div class="col-sm-2">'+
            '<ma-menu-bar menu="::appController.menu"></ma-menu-bar>'+
            '</div>'+
            '<div class="col-sm-10">'+
            '<div ui-view></div>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div id="loader"></div>'+
	'</div>';

	//admin.layout(layout);

    var listTemplate = '<div class="row list-view" ng-class="::\'ng-admin-entity-\' + listController.entity.name()">'+
        '<div class="col-lg-12">'+
            '<ma-datagrid name="{{ ::listController.view.name() }}"'+
                      'entries="listController.dataStore.getEntries(listController.entity.uniqueId)"'+
                      'selection="selection"'+
                      'fields="::listController.fields"'+
                      'list-actions="::listController.listActions"'+
                      'entity="::listController.entity"'+
                      'datastore="listController.dataStore">'+
            '</ma-datagrid>'+
        '</div>'+
    '</div>'+

    '<div class="row" ng-if="::!listController.infinitePagination">'+
        '<div class="col-lg-12">'+
            '<ma-datagrid-pagination'+
                'page="{{ listController.page }}"'+
                'per-page="{{ ::listController.view.perPage() }}"'+
                'total-items="{{ listController.totalItems }}"'+
                'set-page="::listController.setPageCallback">'+
            '</ma-datagrid-pagination>'+
        '</div>'+
    '</div>'+

    '<ma-datagrid-infinite-pagination ng-if="::listController.infinitePagination"'+
                'per-page="{{ ::listController.view.perPage() }}"'+
                'total-items="{{ ::listController.totalItems }}"'+
                'next-page="::listController.nextPageCallback">'+
    '</ma-datagrid-infinite-pagination>'+

    admin.customTemplate(function(viewName) {
        if (viewName === 'ListView') {
            console.log(viewName);
            //return listTemplate;
        }
    });

    return admin;
}
