# -*- coding: utf-8 -*-

import time
from odoo import api, fields, models


class ReportOverdue(models.AbstractModel):
    _name = 'report.orvea_sale_order.report_avenant_document_template'


    @api.model
    def get_report_values(self, docids, data=None):
        company_currency = self.env.user.company_id.currency_id
        return {
            'doc_ids': docids,
            'doc_model': 'sale.order',
            'docs': self.env['sale.order'].browse(docids),
            'Date': fields.date.today(),
        }
