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

    state_order = fields.Selection([
        ('identification', 'Identification MO'),
        ('infos_offre', "Infos d'Offre"),
        ('info_affaire', 'Infos Affaire'),
        ('planning', 'Planning'),
        ('done', 'Valide'),
        ], string='Status', index=True,default='identification')


