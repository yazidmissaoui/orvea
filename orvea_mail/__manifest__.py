{
    'name': 'Orvea Mail',
    'version': '1.0.0',
    'sequence': 5,
    'author': 'Abdelwahed Rihene',
    'description': """
    Orvea Mail
==========================

This module allows the administrator to manage new mails,  ...

    """,
    'data' : [
    		'views/mail_mail_view.xml',
    ],
    'depends': ['base',
		'mail',
		'contacts',
               ],
    'qweb' : [
    ],
    'installable': True,
    'application': False,
}

