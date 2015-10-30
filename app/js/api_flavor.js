function requestInterceptor(RestangularProvider) {
    RestangularProvider.addFullRequestInterceptor(
        function(element, operation, what, url, headers, params) {

            headers.AnonymousToken = '51b2f775-07ab-4a48-91e4-e3bf21009c20';


        if (operation == "getList") {

            
            // custom pagination params
            if (params._page) {
                params._start = (params._page - 1) * params._perPage;
                params._end = params._page * params._perPage;
            }
            delete params._page;
            delete params._perPage;
            // custom sort params
            if (params._sortField) {
  
                var sortJson = [ {
                    "fieldName": params._sortField,    
                    "order": params._sortDir  
                }];

                params.sort = sortJson;

                delete params._sortField;
                delete params._sortDir;
            }
            // custom filters
            if (params._filters) {
                for (var filter in params._filters) {
                    params[filter] = params._filters[filter];
                }
                delete params._filters;
            }
        }

        return { params: params };
    });
}

function responseInterceptor(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response) {
        if (operation == "getList") {

            /*var contentRange = response.headers('Content-Range');
            response.totalCount = contentRange.split('/')[1];*/
            return data.data;
        }
        return data;
    });
}

export default { requestInterceptor, responseInterceptor }
