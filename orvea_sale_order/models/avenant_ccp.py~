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


class OrveaAvenantCcp(models.Model):
    _name = 'avenant.ccp'

    name = fields.Char(string='Avenant')
    type_avenant = fields.Many2one('lot.type',string='Type Offre')

class OrveaAvenantCcpLine(models.Model):
    _name = 'avenant.ccp.line'

    avenant_id = fields.Many2one('avenant.ccp', string="Avenant")
    type_avenant = fields.Many2one('lot.type',string='Type Offre')

    avenant_gros_oeuvre_id = fields.Many2one('sale.order', string='Devis')
    avenant_electricite_id = fields.Many2one('sale.order', string='Devis')

    avenant_ascenseur_id = fields.Many2one('sale.order', string='Devis')
    avenant_menuiserie_id = fields.Many2one('sale.order', string='Devis')
    avenant_logisticien_id = fields.Many2one('sale.order', string='Devis')
    avenant_entreprise_id = fields.Many2one('sale.order', string='Devis')
    sequence = fields.Integer(string='Sequence', default=10)










