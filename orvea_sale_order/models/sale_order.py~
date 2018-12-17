#-*- coding:utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import time

from datetime import datetime, timedelta, date

from dateutil.relativedelta import relativedelta
import babel

import calendar

from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.safe_eval import safe_eval

from odoo.addons import decimal_precision as dp
from odoo.exceptions import UserError, AccessError

import logging
_logger = logging.getLogger(__name__)

class SaleOrder(models.Model):
    _inherit = 'sale.order'

    @api.model
    def _get_default_partner(self):
        _logger.info('------------------  _get_default_partner -----------------')
        current_partner = self.env.user.partner_id.id
        return current_partner

    @api.model
    def _get_avenant_gros_oeuvre(self):
        vals= []
        avenant_ids = self.env['avenant.ccp'].search([('type_avenant','=','Gros-oeuvre')])
        if len(avenant_ids) > 0:
            for avenant in avenant_ids:
                vals.append((0, 0, {'avenant_id': avenant.id,'type_avenant':avenant.type_avenant.id}))
        return vals

    @api.model
    def _get_avenant_electricite(self):
        vals= []
        avenant_ids = self.env['avenant.ccp'].search([('type_avenant','=','Electricité')])
        if len(avenant_ids) > 0:
            for avenant in avenant_ids:
                vals.append((0, 0, {'avenant_id': avenant.id,'type_avenant':avenant.type_avenant.id}))
        return vals

    @api.model
    def _get_avenant_ascenseur(self):
        vals= []
        avenant_ids = self.env['avenant.ccp'].search([('type_avenant','=','Ascenseur')])
        if len(avenant_ids) > 0:
            for avenant in avenant_ids:
                vals.append((0, 0, {'avenant_id': avenant.id,'type_avenant':avenant.type_avenant.id}))
        return vals

    @api.model
    def _get_avenant_menuiserie(self):
        vals= []
        avenant_ids = self.env['avenant.ccp'].search([('type_avenant','=','Menuiserie')])
        if len(avenant_ids) > 0:
            for avenant in avenant_ids:
                vals.append((0, 0, {'avenant_id': avenant.id,'type_avenant':avenant.type_avenant.id}))
        return vals

    @api.model
    def _get_avenant_logisticien(self):
        vals= []
        avenant_ids = self.env['avenant.ccp'].search([('type_avenant','=','Logisticiens')])
        if len(avenant_ids) > 0:
            for avenant in avenant_ids:
                vals.append((0, 0, {'avenant_id': avenant.id,'type_avenant':avenant.type_avenant.id}))
        return vals

    @api.model
    def _get_avenant_entreprise(self):
        vals= []
        avenant_ids = self.env['avenant.ccp'].search([('type_avenant','=','Entreprises')])
        if len(avenant_ids) > 0:
            for avenant in avenant_ids:
                vals.append((0, 0, {'avenant_id': avenant.id,'type_avenant':avenant.type_avenant.id}))
        return vals



    @api.model
    def _get_prestation_data(self):
        vals= []
        _logger.info('get_prestation_line_data')
        active_flag = False
        prestation_ids = self.env['prestation.list'].search([('type_prestation','=','basic'),('type_offre','=','logistic')])
        if len(prestation_ids) > 0:
            for prestation in prestation_ids:
                if prestation.name in ['Agent AQHS','Consommable','Benne'] :
                    active_flag = True
                else :
                    active_flag = False
                vals.append((0, 0, {'prestation_id': prestation.id,'activate':active_flag,'list_price':prestation.list_price}))
        return vals

    @api.model
    def _get_optional_prestation_line(self):
        vals= []
        prestation_ids = self.env['prestation.list'].search([('type_prestation','=','optional'),('type_offre','=','logistic')])
        if len(prestation_ids) > 0:
            for prestation in prestation_ids:
                vals.append((0, 0, {'prestation_id': prestation.id,'activate':False,'list_price':prestation.list_price}))
        _logger.info(vals)
        return vals

    @api.model
    def _get_basic_punctual_prestation(self):
        vals= []
        active_flag = False
        prestation_ids = self.env['prestation.list'].search([('type_prestation','=','basic'),('type_offre','=','punctual')])
        if len(prestation_ids) > 0:
            for prestation in prestation_ids:
                if prestation.name in ['Agent AQHS','Consommable','Benne'] :
                    active_flag = True
                else :
                    active_flag = False
                vals.append((0, 0, {'prestation_id': prestation.id,'activate':active_flag,'list_price':prestation.list_price}))
        _logger.info(vals)
        return vals


    @api.model
    def _get_placed_agent_prestation(self):
        vals= []
        active_flag = False
        prestation_ids = self.env['prestation.list'].search([('type_offre','=','agent_place')])
        if len(prestation_ids) > 0:
            _logger.info('_get_placed_agent_prestation')
            _logger.info(len(prestation_ids))
            for prestation in prestation_ids:
                #if prestation.name in ['Agent AQHS','Consommable','Benne'] :
                    #active_flag = True
                #else :
                   # active_flag = False
                vals.append((0, 0, {'prestation_id': prestation.id,'activate':active_flag,'list_price':prestation.list_price}))
        _logger.info(vals)
        return vals


    @api.model
    def _get_optional_punctual_prestation(self):
        vals= []
        prestation_ids = self.env['prestation.list'].search([('type_prestation','=','optional'),('type_offre','=','punctual')])
        if len(prestation_ids) > 0:
            for prestation in prestation_ids:
                vals.append((0, 0, {'prestation_id': prestation.id,'activate':False,'list_price':prestation.list_price}))
        _logger.info(vals)
        return vals

    @api.model
    def _get_article_line_data(self):
        _logger.info('-------------------_get_article_line_data------------------')
        vals= []
        article_ids = self.env['structural.article'].search([])
        if self.article_line != False:
            for article in article_ids:
                vals.append((0, 0, {'article_id': article.id}))
        return vals

    @api.model
    def _get_contract_line_data(self):
        vals = []
        _logger.info('-------------------_get_contract_line_data------------------')
        contract_ids = self.env['contract.article'].search([])
        details = self.env['sale.order']
        if self.contract_line != False:
            for contract in contract_ids :
                vals.append((0, 0, {'contract_article_id': contract.id}))
        return vals

    @api.onchange('delay','start_ces')
    def _onchange_data_tce(self):
        _logger.info('--------------_onchange_data_tce----------------')
        for order in self :
            if order.placed_agent == False :
            	if order.start_ces != False:
            	    start_ces = order.start_ces
            	    _logger.info('--------------_onchange_data_tce---22-------------')
            	    delay = order.delay
            	    day = start_ces[8:10]
            	    month = start_ces[5:7]
            	    year = start_ces[0:4]
            	    order.month_start_ces = int(month)
            	    order.year_start_ces = int(year)
            	    start_with_time = datetime(
	    	            	year=int(year), 
	    	            	month=int(month),
	    	            	day=int(day),
            	    )
            	    value = start_with_time+ relativedelta(months=delay)
            	    end_date = value.date()
            	    end_day = end_date.day
            	    end_month = end_date.month
            	    end_year = end_date.year	
            	    end_value = datetime(end_year, end_month-1, calendar.monthrange(end_year, end_month-1)[1])
            	    order.end_ces = end_value.date()
            	    _logger.info('Test me')
            	    _logger.info(int(end_month))
            	    order.month_end_ces = int(end_month)
            	    order.year_end_ces = int(end_year)
            else :
            	start_ces = order.start_ces
            	month = start_ces[5:7]
            	day = start_ces[8:10]
            	year = start_ces[0:4]
            	order.month_start_ces = int(month)
            	order.year_start_ces = int(year)
            	end_ces = order.end_ces
            	_logger.info('----------------end_ces-----------------')
            	_logger.info(end_ces)
            	if end_ces  :            
                    _logger.info('----------------------------------')
                    _logger.info(end_ces)
                    day_end = end_ces[8:10]
                    month_end = end_ces[5:7]
                    year_end = end_ces[0:4]
                    order.month_end_ces = int(month_end)
                    order.year_end_ces = int(year_end)
                    fromdate = date(int(year),int(month),int(day))
                    _logger.info(fromdate)
                    todate = date(int(year_end),int(month_end-1),int(day_end))
                    _logger.info(todate)
                    daygenerator = (fromdate + timedelta(x + 1) for x in xrange((todate - fromdate).days))
                    result = sum(1 for day in daygenerator if day.weekday() < 5)
                    order.open_days = result




    @api.onchange('delay')
    def _onchange_delay_data(self):
        _logger.info('-------------------_onchange_delay_data----------------------')
        for order in self :
            if order.delay != 0 :
                logistic_basic_ids = self.env['prestation.list.line'].search([('order_id','=',self._origin.id)])
                if len(logistic_basic_ids) > 0:
                    for prestation in logistic_basic_ids:
                        if prestation.prestation_id.name in ['Agent AQHS','Consommable','Benne'] :
                            prestation.delay_product = order.delay
                logistic_optionnal_ids = self.env['prestation.list.line'].search([('order_optional_id','=',self._origin.id)])
                if len(logistic_optionnal_ids) > 0:
                    for prestation in logistic_optionnal_ids:
                        if prestation.prestation_id.name in ['Agent AQHS','Consommable','Benne'] :
                            prestation.delay_product = order.delay
                punctual_basic_ids = self.env['prestation.list.line'].search([('prestation_basic_punctual_id','=',self._origin.id)])
                if len(punctual_basic_ids) > 0:
                    for prestation in punctual_basic_ids:
                        if prestation.prestation_id.name in ['Agent AQHS','Consommable','Benne'] :
                            prestation.delay_product = order.delay
                punctual_optionnal_ids = self.env['prestation.list.line'].search([('prestation_optionnal_punctual_id','=',self._origin.id)])
                if len(punctual_optionnal_ids) > 0:
                    for prestation in punctual_optionnal_ids:
                        if prestation.prestation_id.name in ['Agent AQHS','Consommable','Benne'] :
                            prestation.delay_product = order.delay
                placed_agent_ids = self.env['prestation.list.line'].search([('prestation_placed_agent_id','=',self._origin.id)])
                if len(placed_agent_ids) > 0:
                    for prestation in placed_agent_ids:
                        if prestation.prestation_id.name in ['Agent AQHS','Consommable','Benne'] :
                            prestation.delay_product = order.delay

    state = fields.Selection([
        ('offre', "Définition de l'offre"),
        ('identification_client', 'Identification du client'),
        ('information_affaire', "Information de l'affaire"),
        ('planning', "Planning"),
        ('chiffrage', "Chiffrage"),
        ('avenant_ccp', "Avenant CCP"),
        ('apercu_global', "Aperçu Global"),
        ('draft', 'Quotation'),
        ('sent', 'Quotation Sent'),
        ('sale', 'Sales Order'),
        ('done', 'Locked'),
        ('cancel', 'Cancelled'),
        ], string='Status', readonly=True, copy=False, index=True, track_visibility='onchange', default='offre')

    open_days = fields.Integer(string="Jours Ouvrés", help="Jours Ouvrés")
    type_vente = fields.Char(string='Type de vente', help='Type de vente', store=True)
    type_prestation = fields.Char(string='Type de prestation', help='Type de prestation', store=True)

    without_contract = fields.Boolean(string='Without Contract', help='Without Contract')
    with_contract = fields.Boolean(string='Contrat', help='Contract')
    additional_type = fields.Boolean(string='Additionnel', help='Additionnel')
    ponctual_type = fields.Boolean(string='Ponctuel', help='Additionnel')

    construction_site = fields.Boolean(string='Logistique de chantier', help='Logistique de chantier')
    placed_agent = fields.Boolean(string="Agent placé", help='Agent place')
    ponctual_service = fields.Boolean(string="Service ponctuel", help='Service ponctuel')


    logistic_prestation = fields.Boolean(string='Logistic', help='Logistic')
    additional_prestation = fields.Boolean(string='Additional', help='Additional')
    spot_cleaning = fields.Boolean(string='Spot Cleaning', help='Spot Cleaning')
    various_benefits = fields.Boolean(string='Various Benefits', help='Various Benefits')


    partner_id = fields.Many2one('res.partner', string='Customer',required=False, index=True, track_visibility='always')
    partner_invoice_id = fields.Many2one('res.partner', string='Invoice Address', states={'offre': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', False)]}, help="Invoice address for current sales order.", default=lambda self: self.env.user.partner_id)
    partner_shipping_id = fields.Many2one('res.partner', string='Delivery Address', states={'offre': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', False)], 'sent': [('readonly', True)]}, help="Delivery address for current sales order.", default=lambda self: self.env.user.partner_id)
    pricelist_id = fields.Many2one('product.pricelist', string='Pricelist', states={'offre': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', True)]}, help="Pricelist for current sales order.")
    currency_id = fields.Many2one("res.currency", related='pricelist_id.currency_id', string="Currency", states={'offre': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', True)]}, default=lambda self: self.env.user.partner_id.company_id.currency_id)
    street_construction = fields.Char()
    street2_construction = fields.Char()
    zip_construction = fields.Char(size=5)
    city_construction = fields.Char(string="VILLE")
    service_sold = fields.Char()

    tce_delay = fields.Integer(string="Délai TCE")
    housings_count = fields.Integer(string='LOTS', default=0)
    case_type = fields.Selection([
        ('Cas N°1', "Cas N°1 - 0 < x < 50 - (8 Mois)"),
        ('Cas N°2', "Cas N°2 - 50 < x < 100 - (10 Mois)"),
        ('Cas N°3', "Cas N°3 - > 100 - (12 Mois)"),
        ('Autre cas', "Autre cas"),
        ], string='Type de cas')
    delay = fields.Integer(string="Délai", default=0)
    start_ces = fields.Date(string="Début CES", default=fields.Datetime.now)
    month_start_ces = fields.Integer(string="Mois Début CES")  
    year_start_ces = fields.Integer(string="An Début CES")            
    end_ces = fields.Date(string="Fin CES")
    month_end_ces = fields.Integer(string="Mois Fin CES")  
    year_end_ces = fields.Integer(string="An Fin CES")     
    date_end = fields.Date(string="Date de démontage de grue", default=fields.Datetime.now)
    date_order_report = fields.Char(string="Date order")

    nbre_quotation = fields.Char()
    city_building = fields.Char()
    market_amount = fields.Integer(string='Market Amount', default=0)
    schedule_month = fields.Integer(string='Schedule Month', default=0)
        
    #TODO: Ajouter contrainte type de prestation dans les champ comme le state
    commercial_id = fields.Many2one('res.partner', string='Commercial')
    control_office = fields.Many2one('res.company', string='Control Office')
    project_manager = fields.Many2one('res.partner', string='Project Manager')
    sps_coordinator = fields.Many2one('res.company', string='SPS Coordinator')
    contract_line = fields.One2many('contract.article.line', 'contract_id', string='Contract Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_contract_line_data)
    article_line = fields.One2many('structural.article.line', 'structural_id', string='Article Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_article_line_data)


    prestation_line = fields.One2many('prestation.list.line', 'order_id', string='Prestation Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True,default=_get_prestation_data)
    prestation_optionnal_line = fields.One2many('prestation.list.line', 'order_optional_id', string='Prestation Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True,default=_get_optional_prestation_line)

    prestation_basic_punctual = fields.One2many('prestation.list.line', 'prestation_basic_punctual_id', string='Prestation Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True,default=_get_basic_punctual_prestation)
    prestation_optionnal_punctual = fields.One2many('prestation.list.line', 'prestation_optionnal_punctual_id', string='Prestation Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True,default=_get_optional_punctual_prestation)


    prestation_placed_agent = fields.One2many('prestation.list.line', 'prestation_placed_agent_id', string='Prestation Lines', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True,default=_get_placed_agent_prestation)


    avenant_gros_oeuvre = fields.One2many('avenant.ccp.line', 'avenant_gros_oeuvre_id', string='Avenant Gros Oeuvres', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_avenant_gros_oeuvre)

    avenant_electricite = fields.One2many('avenant.ccp.line', 'avenant_electricite_id', string='Avenant Gros Oeuvres', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_avenant_electricite)

    avenant_ascenseur = fields.One2many('avenant.ccp.line', 'avenant_ascenseur_id', string='Avenant Gros Oeuvres', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_avenant_ascenseur)

    avenant_menuiserie = fields.One2many('avenant.ccp.line', 'avenant_menuiserie_id', string='Avenant Gros Oeuvres', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_avenant_menuiserie)

    avenant_logisticien = fields.One2many('avenant.ccp.line', 'avenant_logisticien_id', string='Avenant Gros Oeuvres', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_avenant_logisticien)

    avenant_entreprise = fields.One2many('avenant.ccp.line', 'avenant_entreprise_id', string='Avenant Gros Oeuvres', states={'cancel': [('readonly', True)], 'done': [('readonly', True)]}, copy=True, auto_join=True, default=_get_avenant_entreprise)


    checked_agent = fields.Boolean(string='Agent', default=False)
    checked_consommable = fields.Boolean(string='Consommable', default=False)
    checked_bennes = fields.Boolean(string='Bennes', default=False)

    nbre_logement = fields.Integer(string="Nombre de logement")
    cout_logement = fields.Integer(string="Cout de construction par logement")
    total_cout = fields.Integer(string="Cout de construction", store=True)
    stimulation_cout = fields.Char(string="MONTANT OFFRE", store=True)
    intervention_delay = fields.Integer(string="Délai d'intervention")

    client_reference = fields.Char(string="Référence Client")
    commercial_name = fields.Char(string="Nom commercial")
    commercial_street = fields.Char(string="Rue")
    commercial_city = fields.Char()
    commercial_zip = fields.Char(string="Zip",size=5)

    maitre_ouvrage = fields.Many2one('maitre.ouvrage', string="Maître d'ouvrage")
    #TODO:
    currency_id = fields.Many2one("res.currency", related='pricelist_id.currency_id', string="Currency", readonly=True)

    street_ouvrage = fields.Char(related='maitre_ouvrage.street_ouvrage')
    street2_ouvrage = fields.Char(related='maitre_ouvrage.street2_ouvrage')
    zip_ouvrage = fields.Char(size=5,related='maitre_ouvrage.zip_ouvrage')
    city_ouvrage = fields.Char(string="VILLE",related='maitre_ouvrage.city_ouvrage')
    total_basic_construction = fields.Float(string="TOTAL")
    total_optional_construction = fields.Float(string="TOTAL")
    total_basic_ponctuel = fields.Float(string="TOTAL")
    total_optional_ponctuel = fields.Float(string="TOTAL")
    total_agent_place = fields.Float(string="TOTAL")

    description_avenant = fields.Text()


    @api.onchange('construction_site','prestation_basic_punctual','prestation_optionnal_punctual','prestation_placed_agent')
    def _onchange_construction_site(self):
        _logger.info('-------------------- onchange_construction_site ------------------')
        vals = []
        type_prestation = ''
        type_vente = ''
        total_basic_construction = 0
        total_optional_construction = 0
        total_basic_ponctuel = 0
        total_optional_ponctuel = 0
        total_agent_place = 0
        now = time.strftime("%d/%m/%Y")
        for order in self :
            if order.with_contract == True :
                order.type_vente = 'Contrat'
            if order.additional_type == True :
                order.type_vente = 'Additionnel'
            if order.ponctual_type == True :
                order.type_vente = 'Ponctuel'
            if order.construction_site == True:
                order.type_prestation = 'Logistique de chantier'
                product_ids = self.env['product.template'].search([('name','=','Logistique de chantier')])
                if len(product_ids) > 0 :
                    for product in product_ids:
                        vals.append((0, 0, {'product_id': product.id, 'description':product.description,'product_uom' : product.uom_id.id,'price_unit': product.list_price, 'order_id':self._origin.id,'product_uom_qty':1}))
                order.update({'order_line': vals})
            if order.construction_site == False :
                if order.ponctual_service == True :
                    order.type_prestation = 'Service ponctuel'
                    for prestation_basic in order.prestation_basic_punctual :
                        if prestation_basic.activate == True:
                            product_ids = self.env['product.template'].search([('name','=',prestation_basic.prestation_id.name)])
                            if len(product_ids) > 0:
                                for product in product_ids:
                                    vals.append((0, 0, {'product_id': product.id, 'description':product.description,'product_uom' : product.uom_id.id,'price_unit': product.list_price, 'order_id':self._origin.id,'product_uom_qty':1}))
                    for prestation_optionnal in order.prestation_optionnal_punctual :
                        if prestation_optionnal.activate == True:
                            product_ids = self.env['product.template'].search([('name','=',prestation_optionnal.prestation_id.name)])
                            if len(product_ids) > 0:
                                for product in product_ids:
                                    vals.append((0, 0, {'product_id': product.id, 'description':product.description,'product_uom' : product.uom_id.id,'price_unit': product.list_price, 'order_id':self._origin.id,'product_uom_qty':1}))
                if order.placed_agent == True :
                    order.type_prestation = "Agent placé"
                    for prestation_agent in order.prestation_placed_agent :
                        if prestation_agent.activate == True:
                            product_ids = self.env['product.template'].search([('name','=',prestation_agent.prestation_id.name)])
                            if len(product_ids) > 0:
                                for product in product_ids:
                                    vals.append((0, 0, {'product_id': product.id, 'description':product.description,'product_uom' : product.uom_id.id,'price_unit': product.list_price, 'order_id':self._origin.id,'product_uom_qty':1}))
                    order.update({})
                _logger.info('-------------------type_vente----------------------')
                _logger.info(type_vente)
                order.update({'order_line': vals,'date_order_report': str(now)})

    @api.onchange('commercial_zip')
    def _onchange_commercial_zip(self):
        for order in self :
            if order.commercial_zip != False :
                if len(order.commercial_zip) != 5 :
                    raise ValidationError(_('Erreur! Votre Code Postal est non valide.'))

    def _get_colum(self) :
        year = 0
        month = 0
        year = self.year_start_ces
        month = self.month_start_ces
        if month == 12 :
            month = 1
            year = year + 1
            return str(0) + str(month) + '-' + str(year)
        else :
            return str(0) + str(month) + '-' + str(year)	

    def _get_amount(self) :
        if self.delay == 1 :
            amount = self.amount_untaxed 
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_first_amount(self) :
        if self.delay == 1 :
            return '-'
        if self.delay == 2 :
            amount = round(self.amount_untaxed - self.amount_untaxed / self.delay,3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_second_amount(self) :
        if self.delay < 3 :
            return '-'
        if self.delay == 3 :
            amount = round(self.amount_untaxed - self.amount_untaxed / self.delay,3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_third_amount(self) :
        if self.delay < 4 :
            return '-'
        if self.delay == 4 :
            amount = round(self.amount_untaxed - (2 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

	
    def _get_four_amount(self) :
        if self.delay < 5 :
            return '-'
        if self.delay == 5 :
            amount = round(self.amount_untaxed - (3 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'


    def _get_fourth_amount(self) :
        if self.delay < 5 :
            return '-'
        if self.delay == 5 :
            amount = round(self.amount_untaxed - (4 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_fifth_amount(self) :
        if self.delay < 6 :
            return '-'
        if self.delay == 6 :
            amount = round(self.amount_untaxed - (5 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_sixth_amount(self) :
        if self.delay < 7 :
            return '-'
        if self.delay == 7 :
            amount = round(self.amount_untaxed - (6 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_seventh_amount(self) :
        if self.delay < 8 :
            return '-'
        if self.delay == 8 :
            amount = round(self.amount_untaxed - (7 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_eighth_amount(self) :
        if self.delay < 9 :
            return '-'
        if self.delay == 9 :
            amount = round(self.amount_untaxed - (8 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_nineth_amount(self) :
        if self.delay < 10 :
            return '-'
        if self.delay == 10 :
            amount = round(self.amount_untaxed - (9 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_tenth_amount(self) :
        _logger.info('---------------------_get_tenth_amount--------------------------')
        _logger.info(self.delay)
        if self.delay < 11 :
            return '-'
        if self.delay == 11 :
            amount = round(self.amount_untaxed - (10 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_eleventh_amount(self) :
        _logger.info('---------------------_get_eleventh_amount--------------------------')
        _logger.info(self.delay)
        if self.delay < 12 :
            return '-'
        if self.delay == 12 :
            amount = round(self.amount_untaxed - (11 * (self.amount_untaxed / self.delay)),3)
        else :
            amount = round(self.amount_untaxed / self.delay,3)
        return str(amount) + '€'

    def _get_first_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 1
        else :
            month = self.month_start_ces + 1
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)

    def _get_second_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 1
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 2
        else :
            month = self.month_start_ces + 2
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)

    def _get_third_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 1
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 2
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 3
        else :
            month = self.month_start_ces + 3
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)

    def _get_four_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 1
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 2
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 3
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 4
        else :
            month = self.month_start_ces + 4
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)


    def _get_fifth_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 1
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 2
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 3
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 4
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 5
        else :
            month = self.month_start_ces + 5
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)

    def _get_sixth_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 8 :
            year = self.year_start_ces + 1
            month = 1
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 2
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 3
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 4
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 5
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 6
        else :
            month = self.month_start_ces + 6
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)

    def _get_seventh_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 7 :
            year = self.year_start_ces + 1
            month = 1
        if self.month_start_ces == 8 :
            year = self.year_start_ces + 1
            month = 2
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 3
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 4
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 5
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 6
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 7
        else :
            month = self.month_start_ces + 7
            year = self.year_start_ces
        if month < 10 :
                    return str(0) + str(month) + '-' + str(year)
        else :
                    return str(month) + '-' + str(year)

    def _get_eighth_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 4 :
            year = self.year_start_ces 
            month = 12
            return str(month) + '-' + str(year)
        if self.month_start_ces == 5 :
            year = self.year_start_ces + 1
            month = 1
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 6 :
            year = self.year_start_ces + 1
            month = 1
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 7 :
            year = self.year_start_ces + 1
            month = 2
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 8 :
            year = self.year_start_ces + 1
            month = 3
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 4
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 5
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 6
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 7
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 8
            return '0' + str(month) + '-' + str(year)

    def _get_nineth_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 3 :
            year = self.year_start_ces 
            month = 12
            return str(month) + '-' + str(year)
        if self.month_start_ces == 4 :
            year = self.year_start_ces 
            month = 1
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 5 :
            year = self.year_start_ces + 1
            month = 2
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 6 :
            year = self.year_start_ces + 1
            month = 3
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 7 :
            year = self.year_start_ces + 1
            month = 4
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 8 :
            year = self.year_start_ces + 1
            month = 5
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 6
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 7
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 8
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 9
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 10
            return str(month) + '-' + str(year)


    def _get_tenth_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 2 :
            year = self.year_start_ces 
            month = 12
            return str(month) + '-' + str(year)
        if self.month_start_ces == 3 :
            year = self.year_start_ces 
            month = 1
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 4 :
            year = self.year_start_ces 
            month = 2
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 5 :
            year = self.year_start_ces + 1
            month = 3
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 6 :
            year = self.year_start_ces + 1
            month = 4
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 7 :
            year = self.year_start_ces + 1
            month = 5
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 8 :
            year = self.year_start_ces + 1
            month = 6
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 7
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 8
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 9
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 10
            return str(month) + '-' + str(year)
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 11
            return str(month) + '-' + str(year)

    def _get_eleventh_column(self) :
        value = ''
        year = 0
        month = 0
        if self.month_start_ces == 1 :
            year = self.year_start_ces 
            month = 12
            return str(month) + '-' + str(year)
        if self.month_start_ces == 2 :
            year = self.year_start_ces 
            month = 1
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 3 :
            year = self.year_start_ces 
            month = 2
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 4 :
            year = self.year_start_ces 
            month = 3
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 5 :
            year = self.year_start_ces + 1
            month = 4
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 6 :
            year = self.year_start_ces + 1
            month = 5
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 7 :
            year = self.year_start_ces + 1
            month = 6
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 8 :
            year = self.year_start_ces + 1
            month = 7
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 9 :
            year = self.year_start_ces + 1
            month = 8
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 9
            return '0' + str(month) + '-' + str(year)
        if self.month_start_ces == 10 :
            year = self.year_start_ces + 1
            month = 10
            return str(month) + '-' + str(year)
        if self.month_start_ces == 11 :
            year = self.year_start_ces + 1
            month = 11
            return str(month) + '-' + str(year)
        if self.month_start_ces == 12 :
            year = self.year_start_ces + 1
            month = 12
            return str(month) + '-' + str(year)

    @api.onchange('zip_construction')
    def _onchange_zip_construction(self):
        for order in self :
            if order.zip_construction != False :
                if len(order.zip_construction) != 5 :
                    raise ValidationError(_('Erreur! Votre Code Postal est non valide.'))

    @api.onchange('housings_count','cout_logement')
    def _onchange_total_price(self):
        for order in self :
        	order.total_cout = order.housings_count * order.cout_logement

    @api.onchange('with_contract','additional_type','ponctual_type')
    def _onchange_sale_type(self):
        for order in self :
            if order.with_contract == True :
                if (order.additional_type == True) or  (order.ponctual_type == True) :
                    raise ValidationError(_('Erreur! Votre Type de vente est deja selectionne.'))
            if order.additional_type == True :
                if (order.with_contract == True) or  (order.ponctual_type == True) :
                    raise ValidationError(_('Erreur! Votre Type de vente est deja selectionne.'))
            if order.ponctual_type == True :
                if (order.additional_type == True) or  (order.with_contract == True) :
                    raise ValidationError(_('Erreur! Votre Type de vente est deja selectionne.'))


    @api.onchange('prestation_line','prestation_optionnal_line')
    def _onchange_total_construction(self):
        _logger.info('-----------------total_construction------------')
        amount_prestation = 0
        total_prestation = 0
        total_basic_construction = 0
        total_optional_construction = 0
        for order in self :
            cout_construction = order.housings_count * order.cout_logement
            if order.construction_site == True :
                prestation_ids = self.env['prestation.list.line'].search([('order_id','=',self._origin.id)])
                if len(prestation_ids) > 0 :
                    for prestation in prestation_ids :
                        amount_prestation = (amount_prestation + prestation.total_price) * 1.08
                prestation_optional_ids = self.env['prestation.list.line'].search([('order_optional_id','=',self._origin.id)])
                if len(prestation_optional_ids) > 0 :
                    for prestation in prestation_optional_ids :
                        amount_prestation = (amount_prestation + prestation.total_price) * 1.08
                if amount_prestation > 0 :
                    if cout_construction != 0 :
                        total_prestation = (amount_prestation / cout_construction) * 100
                        total_prestation = round(total_prestation, 3)
                        #order.stimulation_cout = str(total_prestation) + '%'
                _logger.info('-----------------22121-----------------')
                for prestation in order.prestation_line :
                    if prestation.activate == True and prestation.total_price != 0 :
                        _logger.info('-----------prestation.total_price---------------')
                        _logger.info(prestation.total_price)
                        total_basic_construction+= prestation.total_price
                        _logger.info(total_basic_construction)
                order.update({'total_basic_construction': 1.08 * total_basic_construction})
                for prestation in order.prestation_optionnal_line :
                    if prestation.activate == True and prestation.total_price != 0:
                        total_optional_construction+= prestation.total_price
                order.update({'total_optional_construction': 1.08 * total_optional_construction})

    @api.onchange('prestation_placed_agent')
    def _onchange_total_agent(self):
        _logger.info('-----------------total_agent-------------')
        total_agent_place = 0
        for order in self :
            if order.placed_agent == True :
                for prestation in order.prestation_placed_agent :
                    if prestation.activate == True :
                        total_agent_place = (total_agent_place + prestation.total_price) * 1.08
            order.update({'total_agent_place':total_agent_place})

    @api.onchange('prestation_basic_punctual','prestation_optionnal_punctual')
    def _onchange_total_ponctual(self):
        _logger.info('-----------------total_ponctual-------------')
        total_basic_ponctuel = 0
        total_optional_ponctuel = 0
        for order in self :
            if order.ponctual_service == True :
                for prestation in order.prestation_basic_punctual :
                    if prestation.activate == True :
                        _logger.info(prestation.total_price)
                        total_basic_ponctuel = total_basic_ponctuel + prestation.total_price
                        _logger.info(total_basic_ponctuel)
                order.update({'total_basic_ponctuel': 1.08 * total_basic_ponctuel})
                for prestation in order.prestation_optionnal_punctual :
                    if prestation.activate == True :
                        total_optional_ponctuel = total_optional_ponctuel + prestation.total_price
                order.update({'total_optional_ponctuel': 1.08 * total_optional_ponctuel})

    @api.onchange('total_basic_construction','total_optional_construction')
    def _onchange_stimulation_cout(self):
        _logger.info('-------------------- onchange_stimulation_cout ------------------')
        amount_prestation = 0
        total_prestation = 0
        for order in self :
            order.total_cout = order.housings_count * order.cout_logement
            cout_construction = order.housings_count * order.cout_logement
            _logger.info(order.total_basic_construction)
            _logger.info(order.total_optional_construction)
            if order.construction_site == True :
                if order.total_basic_construction > 0 and order.total_optional_construction > 0:
                    amount_prestation = order.total_basic_construction + order.total_optional_construction
                    if cout_construction != 0 :
                        total_prestation = (amount_prestation / cout_construction) * 100
                        total_prestation = round(total_prestation, 3)
                        order.stimulation_cout = str(total_prestation) + '%'

    @api.onchange('checked_agent')
    def _onchange_checked_agent(self):
        _logger.info('-------------------- onchange_checked_agent ------------------')
        vals= []
        for order in self :
            _logger.info(order.checked_agent)
            checked_agent = order.checked_agent
            if checked_agent == True :
                _logger.info('--------------- True -----------')
                product_ids = self.env['product.template'].search([('name','=','Agent AQHS')])
                if len(product_ids) > 0:
                    for product in product_ids :
                        _logger.info('--------------------product ---------------')
                        _logger.info(product)
                        vals.append((0, 0, {'product_id': product.id, 'product_uom' : product.uom_id.id, 'price_unit': product.list_price, 'name':product.description,'order_id':self._origin.id}))
                order.update({'order_line': vals})
            else :
                _logger.info('--------------- False -----------')
                for line in order.order_line :
                    if line.product_id.name == 'Agent AQHS':
                        line.unlink()
 
    @api.onchange('checked_consommable')
    def _onchange_checked_consommable(self):
        _logger.info('-------------------- onchange_checked_consommable ------------------')
        vals= []
        for order in self :
            _logger.info(order.checked_consommable)
            checked_consommable = order.checked_consommable
            if checked_consommable == True :
                _logger.info('--------------- True -----------')
                product_ids = self.env['product.template'].search([('name','=','Consommable')])
                if len(product_ids) > 0:
                    for product in product_ids:
                        vals.append((0, 0, {'product_id': product.id, 'product_uom' : product.uom_id.id,'price_unit': product.list_price, 'name':product.description,'order_id':self._origin.id}))
                order.update({'order_line': vals})
            else :
                _logger.info('--------------- False -----------')
                for line in order.order_line :
                    if line.product_id.name == 'Consommable':
                        line.unlink()


    @api.onchange('checked_bennes')
    def _onchange_checked_bennes(self):
        _logger.info('-------------------- onchange_checked_bennes ------------------')
        vals= []
        for order in self :
            _logger.info(order.checked_bennes)
            checked_bennes = order.checked_bennes
            #search_var = self.browse(self.id)

            if checked_bennes == True :
                _logger.info('--------------- True -----------')
                product_ids = self.env['product.template'].search([('name','=','Benne')])
                if len(product_ids) > 0:
                    for product in product_ids:
                        vals.append((0, 0, {'product_id': product.id, 'product_uom' : product.uom_id.id,'price_unit': product.list_price, 'name':product.description,'order_id':self._origin.id}))
                order.update({'order_line': vals})
            else :
                _logger.info('--------------- False -----------')
                for line in order.order_line :
                    if line.product_id.name == 'Benne':
                        line.unlink()

    @api.multi
    @api.onchange('schedule_month')
    def onchange_schedule_month(self):
        if (self.schedule_month  != False) :
            if (self.schedule_month  < 1) or (self.schedule_month > 12) :
                raise UserError(_('Please define a Schedule Month between 1 and 12.'))


    @api.onchange('with_contract','without_contract')
    def _compute_data_config(self):
        _logger.info('_compute_data_config')
        for order in self :
            _logger.info(order.with_contract)
            _logger.info(order.without_contract)
            if order.with_contract == True and order.without_contract == True :
                raise UserError(_('You can not have a quotation contractual and without contract in the same time.'))

            if order.with_contract == True and order.without_contract == False :
                if order.logistic_prestation == True and order.additional_prestation == True :
                    raise UserError(_('Contractual quotation must be either Logostic or Additional.'))

            if order.with_contract == False and order.without_contract == True :
                if order.placed_agent == True and order.spot_cleaning == True :
                    raise UserError(_('Contractual quotation must be either Placed Agent or Spot Cleaning.'))
                if order.placed_agent == True and order.various_benefits == True :
                    raise UserError(_('Contractual quotation must be either Placed Agent or Various Benefits.'))
                if order.spot_cleaning == True and order.various_benefits == True :
                    raise UserError(_('Contractual quotation must be either Spot Cleaning or Various Benefits.'))

    @api.multi
    def action_identification_client(self):
        _logger.info('-----------------------')
        self.write({'state': 'identification_client'})


    @api.multi
    def action_information_affaire(self):
        self.write({'state': 'information_affaire'})

    @api.multi
    def action_planning_state(self):
        self.write({'state': 'planning'})

    @api.multi
    def action_chiffrage_state(self):
        self.write({'state': 'chiffrage'})

    @api.multi
    def action_avenant_state(self):
        self.write({'state': 'avenant_ccp'})
    @api.multi
    def action_agent_place(self):
        self.write({'state': 'apercu_global'})

    @api.multi
    def action_apercu_general(self):
        self.write({'state': 'apercu_global'})


class StructuralArticle(models.Model):
    _name = 'structural.article'
    _description = 'Structural Article'

    name = fields.Char()

class StructuralArticleLine(models.Model):
    _name = 'structural.article.line'
    _description = 'Structural Article Line'

    article_id = fields.Many2one('structural.article', string="Article")
    date_start = fields.Datetime(string='Date Start', default=fields.Datetime.now)
    date_end = fields.Datetime(string='Date End', default=fields.Datetime.now)
    date_dismantling = fields.Datetime(string='Date Dismantling', default=fields.Datetime.now)
    structural_id = fields.Many2one('sale.order', string="Quotation")

class ContractArticle(models.Model):
    _name = 'contract.article'
    _description = 'Contract Article'

    name = fields.Text()

class ContractArticleLine(models.Model):
    _name = 'contract.article.line'
    _description = 'Contract Article Line'

    contract_article_id = fields.Many2one('contract.article', string="Article")
    date_limit = fields.Datetime(string='Date Limit', default=fields.Datetime.now)
    date_start = fields.Datetime(string='Date Start', default=fields.Datetime.now)
    date_end = fields.Datetime(string='Date End', default=fields.Datetime.now)
    checked_flag = fields.Boolean(string='Checked', default=False)
    contract_id = fields.Many2one('sale.order', string="Quotation")


class QuotationOrderLine(models.Model):
    _inherit = 'sale.order.line'

    description = fields.Char(string="Description")


    @api.multi
    @api.onchange('product_id')
    def product_id_change(self):
        if not self.product_id:
            return {'domain': {'product_uom': []}}

        vals = {}
        domain = {'product_uom': [('category_id', '=', self.product_id.uom_id.category_id.id)]}
        if not self.product_uom or (self.product_id.uom_id.id != self.product_uom.id):
            vals['product_uom'] = self.product_id.uom_id
            vals['product_uom_qty'] = 1.0
            vals['description'] = self.product_id.description
        product = self.product_id.with_context(
            lang=self.order_id.partner_id.lang,
            partner=self.order_id.partner_id.id,
            quantity=vals.get('product_uom_qty') or self.product_uom_qty,
            date=self.order_id.date_order,
            pricelist=self.order_id.pricelist_id.id,
            uom=self.product_uom.id
        )

        result = {'domain': domain}

        title = False
        message = False
        warning = {}
        if product.sale_line_warn != 'no-message':
            title = _("Warning for %s") % product.name
            message = product.sale_line_warn_msg
            warning['title'] = title
            warning['message'] = message
            result = {'warning': warning}
            if product.sale_line_warn == 'block':
                self.product_id = False
                return result

        name = product.name_get()[0][1]
        if product.description_sale:
            name += '\n' + product.description_sale
        vals['name'] = name

        self._compute_tax_id()

        if self.order_id.pricelist_id and self.order_id.partner_id:
            vals['price_unit'] = self.env['account.tax']._fix_tax_included_price_company(self._get_display_price(product), product.taxes_id, self.tax_id, self.company_id)
        self.update(vals)

        return result

