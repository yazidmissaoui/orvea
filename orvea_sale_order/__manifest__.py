{
	'name': 'Orvea Devis Ponctuelle Et Logistique',
	'description': 'This module will add some Changes under Sale Order.',
	'author' : 'Abdelwahed Rihene',
    	'depends': ['base','sale', 'crm','product'],
 	'installable': True,
 	'auto_install': False,
 	"data": [
		'views/sale_order_view.xml',
		'data/contract_article.xml',
		'data/structural_article.xml',
		'data/product_template.xml',
		'views/orvea_city_view.xml',
		'views/orvea_city_view.xml',
		'views/product_template_view.xml',
		'data/prestation_list.xml',
		'views/prestation_list_view.xml',
		'views/avenant_ccp_view.xml',
		'data/avenant_ccp.xml',
		'report/clauses_report.xml',
		'views/report_clause.xml',
		'data/report_paperformat.xml',
		'report/contrat_report.xml',
		'views/report_contract.xml',
		'report/avenant_report.xml',
		'views/report_avenant.xml',
		'report/order_report.xml',
		'views/order_report.xml',
		'views/maitre_ouvrage_view.xml',
		'views/sale_order_template.xml',
		'views/reporting_order_view.xml',
		'views/lot_type_view.xml',
		'data/lot_type.xml',
		'views/general_report.xml',
		'report/general_report.xml',
	],
    	"qweb": [
        	"static/src/xml/order_template.xml",
    	],
	'bootstrap': True,
}


 



    	




