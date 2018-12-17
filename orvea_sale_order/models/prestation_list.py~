#-*- coding:utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import time
import datetime
from datetime import datetime, timedelta
from dateutil import relativedelta

from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.safe_eval import safe_eval

from odoo.addons import decimal_precision as dp
from odoo.exceptions import UserError, AccessError

import logging
_logger = logging.getLogger(__name__)

class OrveaListPrestation(models.Model):
    _name = 'prestation.list'

    name = fields.Char(string="Prestation")
    description = fields.Text(string="Description")
    type_prestation = fields.Selection([
        ('basic', 'De Base'),
        ('optional', 'Optionnel'),
        ],string='Type Prestation')
    type_offre = fields.Selection([
        ('logistic', 'Logistique'),
        ('punctual', 'Ponctuelle'),
        ('agent_place', 'Agent place'),
        ],string='Type Offre')
    product_checked = fields.Boolean(string='Choix', default=False)
    list_price = fields.Float(string="Prix Unitaire")

class OrveaPrestationListLine(models.Model):
    _name = 'prestation.list.line'


    prestation_id = fields.Many2one('prestation.list', string="Prestation")
    activate = fields.Boolean(string='Choix', default=False)
    delay_product = fields.Integer(string="Délai")
    unit_product = fields.Float(string="Unité")
    list_price = fields.Float(string='List Price')
    total_price = fields.Float(string='Total',store=True)
    prestation_type = fields.Selection([
        ('basic', 'De Base'),
        ('optional', 'Optionnel'),
        ], string='Type Prestation')

    order_id = fields.Many2one('sale.order', string='Devis')
    order_optional_id = fields.Many2one('sale.order', string='Devis')
    prestation_basic_punctual_id = fields.Many2one('sale.order', string='Devis')
    prestation_optionnal_punctual_id = fields.Many2one('sale.order', string='Devis')
    prestation_placed_agent_id = fields.Many2one('sale.order', string='Devis')

    @api.onchange('unit_product','list_price')
    def _onchange_total_price(self):
        _logger.info('-------------------- onchange_total_price ------------------')
        for order in self :
            order.total_price = order.unit_product * order.list_price


