# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Contact',
    'version': '1.1',
    'category': 'Human Resources',
    "author": "Abdelwahed Rihene",
    'sequence': 75,
    'summary': 'Contact Details',
    'description': "",
    'depends': [
        'base_setup',
        'mail',
        'resource',
        'web',
    ],
    'data': [
        'views/res_partner_view.xml',
        'views/res_partner_activity_view.xml',
        'views/res_partner_activity_service_view.xml',
        'views/res_partner_activity_btp_view.xml',
        'views/res_partner_type_view.xml',
        'data/res_partner_activities.xml',
        'data/res_partner_activity_btp.xml',
        'data/res_partner_activity_service.xml',
    ],
    'demo': [
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'qweb': [],
}
