# -*- coding: utf-8 -*-
##############################################################################
# For copyright and license notices, see __openerp__.py file in root directory
##############################################################################
from odoo import models, fields


class IrActionsReport(models.Model):
    _inherit = 'ir.actions.report'

    report_type = fields.Selection(
        selection_add=[('controller', 'Controller')])
    template_id = fields.Many2one("ir.attachment", "Template *.odt")
    output_file = fields.Selection(
        (("pdf", "pdf"),
         ("ods", "ods"),
         ("doc", "doc"),
         ("rtf", "rtf"),
         ("docx", "docx")),
        string="Format Output File.",
        help='Format Output File. (Format Default *.odt Output File)'
    )
