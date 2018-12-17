{
	'name': 'Orvea Configuration',
	'description': 'This module will configure Different Profiles For Users .',
    	'description': """
Add Profiles on the user form to manage its duties on models.
=============================================================

    * Orvea Manager
    * Orvea Agenda,
    * Orvea 

You can assign several contracts per employee.
    """,

	'author' : 'Abdelwahed Rihene',
    	'depends': ['base'],
	'js': [],
    	'qweb': [],
 	'installable': True,
 	'auto_install': False,
 	"data": [
		'security/orvea_security.xml',
	],
	'bootstrap': True,
}


 



    	




