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

from odoo import api, fields, models, _
from openerp.exceptions import UserError

import logging
logger = logging.getLogger(__name__)


class OrveaManage(models.Model):
    _name = 'orvea.manage'

    activate_state = fields.Boolean(string='Supprimer')
    state = fields.Many2one('configure.state', string="État")
    color = fields.Char(string='Color Index')

    @api.multi
    def write(self, vals):
        for lead in self:
            write_res = super(OrveaManage, lead).write(vals)
            lead_ids = self.env['crm.lead'].search([('state_transaction','=',lead.state.id)])
            logger.info('--------------------lead_ids---------------------')
            logger.info(lead_ids)
            if len(lead_ids) > 0 :
                for record in lead_ids :
                    record.color_state = lead.color
            return write_res


