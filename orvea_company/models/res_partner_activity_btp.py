# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.
import base64
import logging

from odoo import api, fields, models
from odoo import tools, _
from odoo.exceptions import ValidationError, AccessError
from odoo.modules.module import get_module_resource

_logger = logging.getLogger(__name__)


class ResPartnerCompanyActivityBTP(models.Model):

    _name = "res.partner.company.activity.btp"


    name = fields.Char(string="Name")
