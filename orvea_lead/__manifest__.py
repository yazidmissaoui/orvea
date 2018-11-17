{
	'name': 'Orvea Opportunities',
	'description': 'This module will add some Changes under Crm Lead.',
	'author' : 'Abdelwahed Rihene',
    	'depends': ['base','sale', 'crm'],
 	'installable': True,
 	'auto_install': False,
 	"data": [
		'views/orvea_lead.xml',
		'views/orvea_lead_view.xml',
		'views/hubspot_scheduler.xml',
	],
    	"qweb": [
        	"static/src/xml/orvea_lead_template.xml",
        	"static/src/xml/orvea_quotation_template.xml",
        	"static/src/xml/orvea_details_template.xml",
        	"static/src/xml/orvea_contact_template.xml",
    	],
	'bootstrap': True,
}


 



    	




