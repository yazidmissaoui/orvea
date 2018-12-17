{
    'name': 'Orvea Configuration Colors',
    'version': '1.0.0',
    'sequence': 5,
    'author': 'Abdelwahed Rihene',
    'description': """
    Orvea Configuration Colors
==========================

This module allows the administrator to manage colors of kanban view,  ...

    """,
    'data' : [
    		'views/orvea_manage_view.xml',
    		'data/orvea_manage.xml',
    ],
    'depends': ['base',
               ],
    'qweb' : [
    ],
    'installable': True,
    'application': False,
}

