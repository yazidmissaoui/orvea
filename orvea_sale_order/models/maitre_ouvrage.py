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

class OrveaMaitreOuvrage(models.Model):
    _name = 'maitre.ouvrage'

    name = fields.Char(string="Maître d'ouvrage")
    company_id = fields.Many2one('res.partner',domain="[('is_company', '=', True),('company_type', '=', 'company')]", string='Compte Client')
    transaction_id = fields.Many2one('crm.lead', string="Opportunité")
    street_ouvrage = fields.Char()
    street2_ouvrage = fields.Char()
    zip_ouvrage = fields.Char(size=5)
    city_ouvrage = fields.Char(string="VILLE")














