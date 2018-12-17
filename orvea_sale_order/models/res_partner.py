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

class OrveaResPartner(models.Model):
    _inherit = 'res.partner'

    city_partner = fields.Char()
    mobile_partner = fields.Char()
    speaker_partner = fields.Boolean()
    prospection_partner = fields.Char()
    active_partner = fields.Boolean()

