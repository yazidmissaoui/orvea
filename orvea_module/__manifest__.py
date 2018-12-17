{
	'name': 'Orvea Devis',
	'description': 'This module will add some Changes under Quotation.',
	'author' : 'Abdelwahed Rihene',
    	'depends': ['base','sale', 'sale_crm'],
	'js': [],
    	#'qweb': ['static/src/xml/quotation_template.xml'],
 	'installable': True,
 	'auto_install': False,
 	"data": [
		'views/sale_order_view.xml',
		'data/contract_article.xml',
		'data/structural_article.xml',
		'views/crm_lead_view.xml',
		'security/orvea_security.xml',
		#'views/report_templates.xml',
		'views/orvea_city_view.xml',
	],
	'bootstrap': True,
}


 



    	




