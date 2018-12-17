#-*- coding:utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import time
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

class OrveaCrmLead(models.Model):
    _inherit = 'crm.lead'


    flag_crm = fields.Boolean(string='Flag', help='Flag' , default=False)
    state_crm = fields.Selection([
	('refused', 'Refuse'),
	('accepted', 'Accepte'),
	('quotation_sent', 'Devis envoye'),
	('meeting', 'Rendez-vous prevu'),
        ('contacted', 'Contacte'),
        ('new', 'Nouveau'),
	],string="State", default='new')
    activity = fields.Char()
    source = fields.Selection([
        ('inconnu', 'Inconnu'),
        ('evenement', 'Evenement'),
        ('facebook', 'Facebook'),
        ('mailing', 'Mailing'),
        ('reference', 'Reference'),
        ('site_web', 'Site Web'),
        ('autres', 'Autres'),
        ], string='Source')

    responsable_id = fields.Many2one('res.partner', string='Responsable',
        help="Linked responsable (optional). Usually created when converting the lead.")


    @api.model
    def create(self, vals):
        vals['flag_crm'] = True
        return super(OrveaCrmLead, self).create(vals)





