'use strict';

export default function (nga, admin) {

    var items = admin.getEntity('items');

    items.listView().fields([
        // use the name as the link to the detail view - the edition view
        nga.field('name').isDetailLink(true),
        nga.field('description'),
        nga.field('user', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('firstName'))
        .label('User')
    ]);
    items.creationView().fields([
        nga.field('name'),
        nga.field('description'),
     nga.field('user', 'reference')
        .targetEntity(admin.getEntity('users'))
        .targetField(nga.field('firstName'))
        .label('User')
    ]);
    // use the same fields for the editionView as for the creationView
    items.editionView().fields(items.creationView().fields());


    


    return items;
}
