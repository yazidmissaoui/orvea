#-*- coding:utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import time
from datetime import datetime, timedelta
from dateutil import relativedelta

from odoo import api, fields, models, tools, _
from odoo.exceptions import UserError, ValidationError
from odoo.tools.safe_eval import safe_eval

from odoo.addons import decimal_precision as dp
from odoo.exceptions import UserError, AccessError

from odoo import api, fields, models, _
from openerp.exceptions import UserError

import logging
logger = logging.getLogger(__name__)


class OrveaDocument(models.Model):
    _name = 'orvea.document'

    name = fields.Char(string="Dossier")

class OrveaDocumentList(models.Model):
    _name = 'orvea.document.list'

    folder_id = fields.Many2one('orvea.document', string='Dossier')
    lead_id = fields.Many2one('crm.lead', string="Opportunité")
    file_attached = fields.Binary(string="Attachment")    




