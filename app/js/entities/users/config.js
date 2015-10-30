'use strict';

export default function (nga, admin) {

    var users = admin.getEntity('users');

    users.listView().fields([
        nga.field('email').isDetailLink(true),
        nga.field('firstName'),
        nga.field('lastName')
    ]);

    users.creationView().fields([
        nga.field('firstName')
            .validation({ required: true, minlength: 3, maxlength: 100 }),
        nga.field('lastName')
            .validation({ required: true, minlength: 3, maxlength: 100 }),
        nga.field('email', 'email')
            .validation({ required: true })
    ]);

    users.editionView().fields([
        nga.field('email').isDetailLink(true),
        nga.field('firstName'),
        nga.field('lastName'),
        nga.field('items', 'referenced_list')
        .targetEntity(admin.getEntity('items'))
        .targetReferenceField('user')
        .targetFields([
            nga.field('name'),
            nga.field('description')
        ])
        .sortField('name')
        .sortDir('DESC')
    ]);

    //users.editionView().fields(users.creationView().fields());



    /*
    .listActions(['show'])
    .batchActions([])
    .filters([
        nga.field('q')
        .label('Texto')
        .pinned(true)
        ,
        nga.field('classe', 'reference')
            .targetEntity(admin.getEntity('classes'))
            .targetField(nga.field('nome'))
            .label('Classe')
    ]);

    users.creationView().fields([
        nga.field('name'),
        nga.field('qrcode')
    ]);

    users.editionView().fields(users.creationView().fields());*/

    return users;
}
