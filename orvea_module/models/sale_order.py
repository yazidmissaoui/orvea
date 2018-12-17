#-*- coding:utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import time
import datetime
from datetime import datetime, timedelta
from dateutil import relativedelta

import babel

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


    state = fields.Selection([
        ('config', 'Configuration'),
        ('draft', 'Quotation'),
        ('sent', 'Quotation Sent'),
        ('sale', 'Sales Order'),
        ('done', 'Locked'),
        ('cancel', 'Cancelled'),
        ], string='Status', readonly=True, copy=False, index=True, track_visibility='onchange', default='config')

    with_contract = fields.Boolean(string='With Contract', help='With Contract')
    without_contract = fields.Boolean(string='Without Contract', help='Without Contract')

    logistic_prestation = fields.Boolean(string='Logistic', help='Logistic')
    additional_prestation = fields.Boolean(string='Additional', help='Additional')
    placed_agent = fields.Boolean(string='Placed Agent', help='Placed Agent')
    spot_cleaning = fields.Boolean(string='Spot Cleaning', help='Spot Cleaning')
    various_benefits = fields.Boolean(string='Various Benefits', help='Various Benefits')
    partner_id = fields.Many2one('res.partner', string='Customer', states={'config': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', False)]}, index=True, track_visibility='always', default=_get_default_partner)
    partner_invoice_id = fields.Many2one('res.partner', string='Invoice Address', states={'config': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', False)]}, help="Invoice address for current sales order.", default=lambda self: self.env.user.partner_id)
    partner_shipping_id = fields.Many2one('res.partner', string='Delivery Address', states={'config': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', False)], 'sent': [('readonly', True)]}, help="Delivery address for current sales order.", default=lambda self: self.env.user.partner_id)
    pricelist_id = fields.Many2one('product.pricelist', string='Pricelist', states={'config': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', True)]}, help="Pricelist for current sales order.")
    currency_id = fields.Many2one("res.currency", related='pricelist_id.currency_id', string="Currency", states={'config': [('readonly', False),('required', False)],'draft': [('readonly', False),('required', True)], 'sent': [('readonly', True)]}, default=lambda self: self.env.user.partner_id.company_id.currency_id)
    street_construction = fields.Char()
    zip_construction = fields.Char()
    city_construction = fields.Char()
    service_sold = fields.Char()

    date_limit = fields.Datetime(string='Limit Date', default=fields.Datetime.now)
    date_dismantling = fields.Datetime(string='Dismantling Date', default=fields.Datetime.now)
    housings_count = fields.Integer(string='Number of housings', default=0)
    case_type = fields.Integer(string='Type of Case', default=0)
    expected_date = fields.Datetime(string='Expected Date', default=fields.Datetime.now)
    date_end = fields.Datetime(string='End Date', default=fields.Datetime.now)
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
    def action_draft_quotation(self):
        _logger.info('----------------------  action_draft_quotation  -------------------')
        current_partner = self.env.user.partner_id.id
        self.write({'state': 'draft','partner_id' : current_partner})


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

    name = fields.Char()

class ContractArticleLine(models.Model):
    _name = 'contract.article.line'
    _description = 'Contract Article Line'

    contract_article_id = fields.Many2one('contract.article', string="Article")
    date_limit = fields.Datetime(string='Date Limit', default=fields.Datetime.now)
    date_start = fields.Datetime(string='Date Start', default=fields.Datetime.now)
    date_end = fields.Datetime(string='Date End', default=fields.Datetime.now)
    checked_flag = fields.Boolean(string='Checked', default=False)
    contract_id = fields.Many2one('sale.order', string="Quotation")

